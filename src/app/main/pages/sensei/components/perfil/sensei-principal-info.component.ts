import {Component, Input, OnInit} from '@angular/core';
import {TokenDto} from "../../../../../_dto/token-dto";
import {TokenService} from "../../../../../_service/token.service";
import {accessType, severities} from "../../../../../_enums/constDomain";
import {ApiService} from "../../../../../_service/api.service";
import {TutorDto} from "../../../../../_model/academy/TutorDto";
import {UsuarioDto} from "../../../../../_model/gestion/UsuarioDto";
import {senseiEndpoints} from "../../services/endpoints-sensei";
import {AppService} from "../../../../../_service/app.service";

@Component({
    selector: 'app-sensei-principal-info',
    templateUrl: './sensei-principal-info.component.html',
    styleUrls: ['./sensei-principal-info.component.scss']
})
export class SenseiPrincipalInfoComponent implements OnInit {

    imgURL: string;
    baseimgURL: string;
    currentUser: string;
    tutor: TutorDto = new TutorDto();
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

    cargarTutor(usuario) {
        this.apiService.endpoint = accessType.typePrivate + senseiEndpoints.buscarTutorPorIdUsuario
        this.apiService.getById(usuario).subscribe({
            next: data => {
                this.tutor = data.objeto
            }
        })
    }

    cargarDatos() {
        this.cargarTutor(this.tokenService.getCurrentUser())
        this.cargarUsuario(this.tokenService.getCurrentUser())
        this.appService.obtenerDatos().subscribe({
            next: data => {
                this.cargarTutor(data.nombreUsuario)
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
