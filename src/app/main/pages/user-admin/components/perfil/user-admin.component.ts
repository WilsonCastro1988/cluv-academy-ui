import { Component, OnInit } from '@angular/core';
import {UsuarioDto} from "../../../../../_model/gestion/UsuarioDto";
import {TokenService} from "../../../../../_service/token.service";
import {ApiService} from "../../../../../_service/api.service";
import {AppService} from "../../../../../_service/app.service";
import {accessType, severities} from "../../../../../_enums/constDomain";
import {senseiEndpoints} from "../../../sensei/services/endpoints-sensei";
import {TokenDto} from "../../../../../_dto/token-dto";

@Component({
  selector: 'app-user-admin',
  templateUrl: './user-admin.component.html',
  styleUrls: ['./user-admin.component.scss']
})
export class UserAdminComponent implements OnInit {

    imgURL: string;
    baseimgURL: string;
    currentUser: string;
    usuario: UsuarioDto = new UsuarioDto();

    constructor(
        private tokenService: TokenService,
        private apiService: ApiService,
        private appService: AppService,
    ) {
    }

    ngOnInit(): void {
        this.cargarDatos()
    }


    cargarAvatar(usuario) {
        if (usuario.avatar !== '') {
            this.imgURL = 'data:image/png;base64,' + usuario.avatar
        } else {
            this.imgURL = "https://2.bp.blogspot.com/-ZecRzu-6rLI/TsIHy8oGBsI/AAAAAAAABJA/3kymvuNE5WQ/s1600/2-Avatares-para-Facebook.jpg"
        }
        //this.currentUser = this.tokenService.getCurrentUser();
        this.baseimgURL = this.imgURL
    }

    cargarUsuario(usuario) {
        this.apiService.endpoint = accessType.typePrivate + senseiEndpoints.buscarPorNombreUsuario
        this.apiService.getById(usuario).subscribe({
            next: data => {
                this.usuario = data.objeto
                this.currentUser = data.objeto.nombreUsuario
                this.cargarAvatar(this.usuario)
            }
        })
    }

    cargarDatos() {
        this.cargarUsuario(this.tokenService.getCurrentUser())
        this.appService.obtenerDatos().subscribe({
            next: data => {
                this.cargarUsuario(data.nombreUsuario)
            }, complete: () => {
            }, error: error => {
                console.log('ERROR GET: ', error)
            }
        });
    }

    onFileSelected(event: any): void {
        const file = event.target.files[0];
        if (file) {
            this.convertFileToBase64(file);
        } else this.imgURL = this.baseimgURL
    }

    cancelChangeAvatar() {
        this.imgURL = this.baseimgURL
    }

    convertFileToBase64(file: File): void {
        const reader = new FileReader();
        reader.onload = () => {
            this.imgURL = reader.result as string;
        };

        reader.readAsDataURL(file);
    }

    actualizarAvatar() {
        if (this.imgURL !== this.baseimgURL) {
            this.usuario.avatar = this.imgURL.split(',')[1]
            this.apiService.endpoint = accessType.typePrivate + senseiEndpoints.actualizarUsuario

            this.apiService.saveObject(this.usuario).subscribe({
                next: data => {
                    if (data.codigoRespuestaValue == 200) {
                        this.appService.msgUpdate()
                    }
                    this.usuario = data.objeto
                    let token: TokenDto = JSON.parse(this.tokenService.getResponseAuth());
                    token.avatar = this.usuario.avatar
                    this.tokenService.setResponseAuth(JSON.stringify(token))

                    //this.loadUserAndAvatar()
                    window.location.reload();

                },
                complete: () => {
                },
                error: error => {
                    if (error.error.codigoRespuestaValue !== 200) {
                        this.appService.msgInfoDetail(severities.WARNING, 'ERROR', error.error.codigoRespuestaValue);
                    } else {
                        this.appService.msgInfoDetail(severities.ERROR, 'ERROR', 'Ha ocurrido un error');
                    }
                },
            })

        }
    }

}


