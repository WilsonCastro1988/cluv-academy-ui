import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {MenuItem, MessageService} from 'primeng/api';
import {formatDate} from '@angular/common';
import jsPDF from 'jspdf';
import * as FileSaver from 'file-saver';
import 'jspdf-autotable';
import {JwtHelperService} from '@auth0/angular-jwt';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {TokenService} from './token.service';
import {StepProductoService} from "../main/pages/producto/services/step-producto.service";


const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
    providedIn: 'root'
})
export class AppService {

    url = `${environment.HOST}/api/auth`;

    userLogged: boolean;
    isLogged: boolean;

    interval: any;

    items: MenuItem[];

    constructor(private router: Router,
                private http: HttpClient,
                private messageService: MessageService,
                private routerService: Router,
                private stepService: StepProductoService,
                private tokenService: TokenService,
                private jwtHelper: JwtHelperService,) {
    }

    irAProductList() {
        this.routerService.navigate(['pages/product-list']).then(() => {
            this.stepService.data = ({
                producto: null,
                clase: null,
                materia: null
            })

            this.stepService.orden=({
                carrito:null,
                factura:null,
                pago:null
            })
        })
    }

    isAuthenticated(): boolean {
        try {
            if (this.tokenService.getToken() != null) {
                let payload = this.obtenerInfoToken(this.tokenService.getToken());
                if (payload != null && payload.sub && payload.sub.length > 0) {
                    this.userLogged = true;
                    this.isLogged = true;
                    return true;
                }
                return false;
            } else return false;
        } catch (exception) {
            this.router.navigate(['cluv/landing']);
            return false;
        }
    }

    scrollToElementByIdOrTop(id: string): void {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({behavior: 'smooth', block: 'start'});
        } else {
            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
        }
    }

    obtenerInfoToken(accessToken: string) {
        if (accessToken != null) {
            return JSON.parse(atob(accessToken.split(".")[1]))
        }
        return null;
    }

    loginByAuth(loginRequest)
        :
        Observable<any> {
        return this.http.post(this.url + '/signin', loginRequest);
    }

    refreshToken(token: string) {
        return this.http.post(this.url + '/refreshtoken', {
            refreshToken: token
        }, httpOptions);
    }

    refreshTokenAny(token: string): any {
        return this.http.post(this.url + '/refreshtoken', {
            refreshToken: token
        }, httpOptions);
    }

    logoutBackEnd() {
        try {
            return this.http.post(this.url + '/logout', {
                userName: this.tokenService.getCurrentUser(),
                idUsuario: 0
            }, httpOptions);
        } catch (e) {
            console.log('Error en logoutBakend, ' + e);
            return of(null);
        }

    }

    msgCreate() {
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Registro creado con éxito'});
    }

    msgUpdate() {
        this.messageService.add({severity: 'warn', summary: 'Success', detail: 'Registro actualizado con éxito'});
    }

    msgUpdateInfo() {
        this.messageService.add({severity: 'info', summary: 'Success', detail: 'Registro actualizado con éxito'});
    }


    msgDelete() {
        this.messageService.add({severity: 'error', summary: 'Delete', detail: 'Registro eliminado con éxito'});
    }

    msgActivate() {
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Registro activado con éxito'});
    }

    msgInfoDetail(severity: string, header: string, content: string) {
        this.messageService.add({severity, summary: header, detail: content});
    }

    /*******
     * FUNCIONES PARA EXPORTAR EXCEL Y PDF
     * ********/
    exportPdf(columnas, list, nombre, orientacion) {
        const currentDate = new Date();
        const date = formatDate(currentDate, 'yyyy-MM-dd HH:mm:ss', 'en-US');
        // const doc = new jsPDF();
        const doc = new jsPDF(orientacion, 'pt');
        doc['autoTable'](columnas, list);
        // doc.autoTable(this.exportColumns, this.products);
        // doc.save(tipoPlanEstudioDTO.name+".pdf");
        doc.save(nombre + '-' + date + '.pdf');
    }

    exportExcel(list, nombre) {
        import('xlsx').then(xlsx => {
            const currentDate = new Date();
            const date = formatDate(currentDate, 'yyyy-MM-dd HH:mm:ss', 'en-US');
            const worksheet = xlsx.utils.json_to_sheet(list);
            const workbook = {Sheets: {data: worksheet}, SheetNames: ['data']};
            const excelBuffer: any = xlsx.write(workbook, {bookType: 'xlsx', type: 'array'});
            this.saveAsExcelFile(excelBuffer, nombre + '-' + date);
        });
    }

    saveAsExcelFile(buffer: any, fileName: string):
        void {
        const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const EXCEL_EXTENSION = '.xlsx';
        const data
            :
            Blob = new Blob([buffer], {
            type: EXCEL_TYPE
        });
        FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
    }

    /******
     * FIN FUNCIONES EXPORTAR EXCEL PDF
     * *************/

    getProfile() {
        try {
            this.userLogged = JSON.parse(this.tokenService.getCurrentUser());
            if (this.userLogged === null && this.tokenService.getToken() === null) {
                this.logout();
            }

        } catch (error) {
            this.logout();
            throw error;
        }
    }

    /*expirationCounter(token) {
        try {
            let timeout = this.jwtHelper.getTokenExpirationDate(token).valueOf() - new Date().valueOf();
            timeout = timeout * 0.001;
            this.interval = setInterval(() => {
                timeout = timeout - 1;
                if (timeout <= 0) {
                    clearInterval(this.interval);
                    const tokenRef = this.tokenService.getRefreshToken();
                    this.refreshTokenAny(tokenRef).subscribe(
                        data => {
                            this.tokenService.setToken(data.accessToken);
                            this.tokenService.saveRefreshToken(data.refreshToken);
                            this.expirationCounter(data.accessToken);
                        }, error => {
                            this.logout();
                            this.alertaSesionExpirada();
                        }
                    );
                }
            }, 1000);
        } catch (e) {
            this.logout();
        }
    }*/

    alertaSesionExpirada() {
        Swal.fire({
            showClass: {
                popup: 'animated fadeInDown slow',
            },
            hideClass: {
                popup: 'animated fadeOutUp slow',
            },
            title: '',
            text: 'Su sesión ha expirado, por favor vuelva a ingresar',
            imageUrl: '../../../assets/img/sessionTimeout.gif',
            imageAlt: 'Sesión Expirada',
            confirmButtonText: 'Volver a Ingresar',
            showConfirmButton: true,
            allowOutsideClick: false,
        }).then((result) => {
            if (result.isConfirmed) {
                this.logout();
            }
        });
    }

    cierreSesionExitoso() {
        Swal.fire({
            showClass: {
                popup: 'animated fadeInDown slow',
            },
            hideClass: {
                popup: 'animated fadeOutUp slow',
            },
            title: 'Cierre de Sesión Exitoso',
            //text: '<h5 style=\'color:red\'>Gracias por usar nuestros servicios</h5>',
            //html: '<h5 style=\'color:red\'>Gracias por usar nuestros servicios</h5>',
            imageUrl: '../../../assets/img/sessionTimeout.gif',
            imageAlt: 'Cierre de Sesión Exitoso',
            confirmButtonText: 'Volver a Ingresar',
            showConfirmButton: false,
            allowOutsideClick: false,
            timer: 4500,
        }).then((result) => {
            if (result.isConfirmed) {
                this.logout();
            }
        });
    }

    logout() {
        try {
            if (this.tokenService.getToken() != null) {
                this.logoutBackEnd().subscribe({
                    next: data => {
                        console.log('DATA LogoutBackend: ' + JSON.stringify(data));
                        //clearInterval(this.interval);
                        this.tokenService.setToken(null);
                        this.tokenService.saveRefreshToken(null);
                        this.tokenService.setCurrentUser(null);
                        this.tokenService.setRoles(null);
                        this.isAuthenticated()

                        this.userLogged = false;
                        this.isLogged = false;
                        this.tokenService.logOut();
                        //this.cierreSesionExitoso();
                        console.log('LOG Out /LOGOUT')
                        this.router.navigate(['cluv/landing'])
                        this.cierreSesionExitoso();
                    },
                    error: error => {
                        console.log('ERROR LogoutBackend: ' + JSON.stringify(error));
                    },
                    complete: () => {
                        console.log('Complete');
                        //window.location.reload()

                    }
                });
            }
        } catch (e) {
            this.router.navigate(['cluv/landing']).then(() => {
                window.location.reload();
            })
        }
    }
}
