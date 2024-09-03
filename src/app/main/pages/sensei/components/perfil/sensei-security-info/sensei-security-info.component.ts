import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UsuarioDto} from "../../../../../../_model/gestion/UsuarioDto";
import {TokenService} from "../../../../../../_service/token.service";
import {ApiService} from "../../../../../../_service/api.service";
import {AppService} from "../../../../../../_service/app.service";
import {ConfirmationService, ConfirmEventType} from "primeng/api";
import {accessType, severities} from "../../../../../../_enums/constDomain";
import {senseiEndpoints} from "../../../services/endpoints-sensei";
import {LoginRequestDto} from "../../../../../../_dto/login-request-dto";

@Component({
  selector: 'app-sensei-security-info',
  templateUrl: './sensei-security-info.component.html',
  styleUrls: ['./sensei-security-info.component.scss']
})
export class SenseiSecurityInfoComponent implements OnInit {
    usuarioForm: FormGroup;
    initialForm: FormGroup;
    passwordForm: FormGroup;
    usuario: UsuarioDto = new UsuarioDto()

    panelUserName: boolean
    panelPassword: boolean
    blockingui:boolean

    constructor(private tokenService: TokenService,
                private apiService: ApiService,
                private appService: AppService,
                private formBuilder: FormBuilder,
                private confirmationService: ConfirmationService,) {
    }

    ngOnInit(): void {
        this.initInitialForm()
        this.initForm()
        this.initPasswordForm()
        this.cargarDatos()
    }

    initInitialForm(): void {
        this.initialForm = this.formBuilder.group({
            nombreUsuario: new FormControl('', Validators.compose([Validators.required])),
            clave: new FormControl('', Validators.compose([Validators.required])),
        });
    }
    initForm(): void {
        this.usuarioForm = this.formBuilder.group({
            nombreUsuario: new FormControl('', Validators.compose([Validators.required])),
            clave: new FormControl('', Validators.compose([Validators.required])),
        });
    }

    initPasswordForm(): void {
        this.passwordForm = this.formBuilder.group({
            claveAnterior: new FormControl('', Validators.compose([Validators.required])),
            clave: new FormControl('', Validators.compose([Validators.required])),
            claveConfirmada: new FormControl('', Validators.compose([Validators.required])),
        });
    }

    cargarUsuario(usuario) {
        this.apiService.endpoint = accessType.typePrivate + senseiEndpoints.buscarPorNombreUsuario
        this.apiService.getById(usuario).subscribe({
            next: data => {
                this.usuario = data.objeto
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

    actualizarNombreUsuario() {
        this.confirmationService.confirm({
            acceptLabel: 'Aceptar',
            rejectLabel: 'Cancelar',
            acceptButtonStyleClass: 'p-button-outlined p-button-rounded p-button-success',
            rejectButtonStyleClass: 'p-button-outlined p-button-rounded p-button-danger',
            message: 'Está seguro de actualizar su nombre de usuario?',
            header: 'Actualización',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.blockingui = true
                if (this.usuarioForm.invalid) {
                    this.appService.msgCheckInfoData()
                    this.blockingui = false
                    return
                }

                const loginRequest = new LoginRequestDto();
                loginRequest.nombreUsuario = this.usuario.nombreUsuario
                loginRequest.contrasenia = this.usuarioForm.controls.clave.value;

                this.apiService.endpoint = accessType.typePrivate + senseiEndpoints.validarUsuarioClave
                this.apiService.saveObject(loginRequest).subscribe({
                    next: data => {
                        if (data.codigoRespuestaValue == 200) {
                            this.actualizarUsuarioSinPassword()
                        }
                        this.blockingui = false

                    },
                    complete: () => {
                        this.blockingui = false
                    },
                    error: error => {
                        if (error.error.codigoRespuestaValue === 409) {
                            this.appService.msgInfoDetail(severities.WARNING, 'ERROR: '+error.error.codigoRespuestaValue, 'Clave ingresada no es correcta');
                        } else
                        if (error.error.codigoRespuestaValue !== 200) {
                            this.appService.msgInfoDetail(severities.WARNING, 'ERROR', error.error.codigoRespuestaValue);
                        } else {
                            this.appService.msgInfoDetail(severities.ERROR, 'ERROR', 'Ha ocurrido un error');
                        }

                        this.blockingui = false

                    },
                })
            },
            reject: (type) => {
                switch (type) {
                    case ConfirmEventType.REJECT:
                        this.appService.msgInfoDetail(severities.ERROR, 'Acción Rechazada', 'Se ha cancelado la Actualización');
                        break;
                    case ConfirmEventType.CANCEL:
                        this.appService.msgInfoDetail(severities.WARNING, 'Acción Cancelada', 'Se ha cancelado la Actualización');
                        break;
                }
            }
        });
    }

    actualizarPassword() {
        this.confirmationService.confirm({
            acceptLabel: 'Aceptar',
            rejectLabel: 'Cancelar',
            acceptButtonStyleClass: 'p-button-outlined p-button-rounded p-button-success',
            rejectButtonStyleClass: 'p-button-outlined p-button-rounded p-button-danger',
            message: 'Está seguro de actualizar su nombre de usuario?',
            header: 'Actualización',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.blockingui = true
                if (this.passwordForm.invalid) {
                    this.appService.msgCheckInfoData()
                    this.blockingui = false
                    return
                }

                if (this.passwordForm.controls.clave.value !== this.passwordForm.controls.claveConfirmada.value) {
                    this.appService.msgInfoDetail(severities.ERROR, 'Verificación', 'La clave no es igual, por favor, confirmar');
                    this.blockingui = false
                    return
                }

                const loginRequest = new LoginRequestDto();
                loginRequest.nombreUsuario = this.usuario.nombreUsuario
                loginRequest.contrasenia = this.passwordForm.controls.claveAnterior.value;

                this.apiService.endpoint = accessType.typePrivate + senseiEndpoints.validarUsuarioClave
                this.apiService.saveObject(loginRequest).subscribe({
                    next: data => {
                        if (data.codigoRespuestaValue == 200) {
                            this.actualizarUsuarioConPassword()
                        }
                        this.blockingui = false
                    },
                    complete: () => {
                        this.blockingui = false
                    },
                    error: error => {
                        if (error.error.codigoRespuestaValue === 409) {
                            this.appService.msgInfoDetail(severities.WARNING, 'ERROR: '+error.error.codigoRespuestaValue, 'Clave antigua no es correcta');
                        } else
                        if (error.error.codigoRespuestaValue !== 200) {
                            this.appService.msgInfoDetail(severities.WARNING, 'ERROR', error.error.codigoRespuestaValue);
                        } else {
                            this.appService.msgInfoDetail(severities.ERROR, 'ERROR', 'Ha ocurrido un error');
                        }
                        this.blockingui = false
                    },
                })


            },
            reject: (type) => {
                switch (type) {
                    case ConfirmEventType.REJECT:
                        this.appService.msgInfoDetail(severities.ERROR, 'Acción Rechazada', 'Se ha cancelado la Actualización');
                        break;
                    case ConfirmEventType.CANCEL:
                        this.appService.msgInfoDetail(severities.WARNING, 'Acción Cancelada', 'Se ha cancelado la Actualización');
                        break;
                }
            }
        });
    }

    actualizarUsuarioSinPassword() {
        this.usuario.nombreUsuario = this.usuarioForm.controls.nombreUsuario.value

        this.apiService.endpoint = accessType.typePrivate + senseiEndpoints.actualizarUsuario

        this.apiService.saveObject(this.usuario).subscribe({
            next: data => {
                if (data.codigoRespuestaValue == 200) {
                    this.appService.msgInfoDetail(severities.INFO, 'Nombre Usuario', 'Datos actualizados exitosamente')
                }
                this.usuario = data.objeto
                this.tokenService.setCurrentUser(this.usuario.nombreUsuario)
                window.location.reload();

                this.blockingui = false

            },
            complete: () => {
                this.blockingui = false
            },
            error: error => {
                if (error.error.codigoRespuestaValue !== 200) {
                    this.appService.msgInfoDetail(severities.WARNING, 'ERROR', error.error.codigoRespuestaValue);
                } else {
                    this.appService.msgInfoDetail(severities.ERROR, 'ERROR', 'Ha ocurrido un error');
                }
                this.blockingui = false
            },
        })

    }

    actualizarUsuarioConPassword() {
        this.usuario.clave = this.passwordForm.controls.clave.value

        this.apiService.endpoint = accessType.typePrivate + senseiEndpoints.guardarUsuario

        this.apiService.saveObject(this.usuario).subscribe({
            next: data => {
                if (data.codigoRespuestaValue == 200) {
                    this.appService.msgInfoDetail(severities.INFO, 'Clave Usuario', 'Datos actualizados exitosamente')
                }
                this.usuario = data.objeto
                this.blockingui = false

                this.appService.logout()

            },
            complete: () => {
                this.blockingui = false
            },
            error: error => {
                if (error.error.codigoRespuestaValue !== 200) {
                    this.appService.msgInfoDetail(severities.WARNING, 'ERROR', error.error.codigoRespuestaValue);
                } else {
                    this.appService.msgInfoDetail(severities.ERROR, 'ERROR', 'Ha ocurrido un error');
                }
                this.blockingui = false
            },
        })

    }


}

