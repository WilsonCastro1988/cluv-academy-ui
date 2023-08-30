import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../../../../_service/api.service";
import {accessType, severities} from "../../../../../_enums/constDomain";
import {endpointsStudent} from "../../services/endpoints-student";
import {EstudianteDto} from "../../../../../_model/academy/EstudianteDto";
import {UsuarioDto} from "../../../../../_model/gestion/UsuarioDto";
import {AppService} from "../../../../../_service/app.service";
import {ResponseGenerico} from "../../../../../_dto/response-generico";
import {customEmailValidator, customMobileValidator} from "../../../../../_validators/validators";
import {environment} from "../../../../../../environments/environment";

@Component({
    selector: 'app-student-form',
    templateUrl: './student-form.component.html',
    styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {

    endPoint = accessType.typePrivate

    responseGenerico: ResponseGenerico;
    usuario: UsuarioDto;
    usuarioForm: FormGroup;
    modoSave: boolean = false;
    terminos: boolean = false;
    base64String: string;

    constructor(
        private apiService: ApiService,
        private appService: AppService,
        private formBuilder: FormBuilder
    ) {
    }

    ngOnInit(): void {
        this.initEstudianteForm();
    }

    initEstudianteForm(): void {
        this.usuarioForm = this.formBuilder.group({
            idUsuario: new FormControl('',),
            nombreUsuario: new FormControl('', Validators.compose([Validators.required])),
            clave: new FormControl('', Validators.compose([Validators.required])),
            cedula: new FormControl('', Validators.compose([Validators.required])),
            fechaCreacion: new FormControl('',),
            activo: new FormControl('',),
            nombres: new FormControl('', Validators.compose([Validators.required])),
            pathFirma: new FormControl('',),
            avatar: new FormControl('',),
            direccion: new FormControl('', Validators.compose([Validators.required])),
            telefono: new FormControl('',),
            celular: new FormControl('', Validators.compose([Validators.required, customMobileValidator])),
            emailPersonal: new FormControl('', Validators.compose([Validators.required, customEmailValidator])),
            emailInstitucional: new FormControl('',),
            zonaHoraria: new FormControl(Intl.DateTimeFormat().resolvedOptions().timeZone,),
        });
    }


    guardarEstudiante(): void {

        this.modoSave = true
        this.apiService.endpoint = this.endPoint + endpointsStudent.guardarEstudianteUsuario

        if (this.usuarioForm.invalid) {
            this.appService.msgInfoDetail('warn', 'Verificación', 'Verificar los Datos a Ingresar')
            this.modoSave = false
            return
        } else {
            this.usuario = this.usuarioForm.value;

            this.apiService
                .saveObject(this.usuario)
                .subscribe({
                    next: data => {
                        this.responseGenerico = data
                        if (this.responseGenerico.codigoRespuestaValue == 226) {
                            this.appService.msgInfoDetail(severities.WARNING, 'Inconveniente', 'Nombre de usuario en uso, escoja otro por favor')
                            return
                        }
                        if (this.responseGenerico.codigoRespuestaValue == 302) {
                            this.appService.msgInfoDetail(severities.WARNING, 'Inconveniente', 'Usuario ya está registrado')
                            return
                        }
                        if (this.responseGenerico.codigoRespuestaValue == 200) {
                            this.appService.msgCreate()
                            this.limpiarFormulario()
                        } else {
                            this.appService.msgInfoDetail(severities.ERROR, 'ERROR', 'Consulte a CluvAcademy: ' + this.responseGenerico.codigoRespuestaValue + ' : ' + this.responseGenerico.codigoRespuestaName + ' : ' + this.responseGenerico.mensaje)
                            this.limpiarFormulario()
                        }
                    },
                    complete: () => {
                    },
                    error: error => {
                        console.error('Error', JSON.stringify(error))
                        if (error.status == '302')
                            this.appService.msgInfoDetail(severities.WARNING, 'Inconveniente', 'Usuario con DNI: '+this.usuario.cedula+' ya está registrado')
                        else
                            this.appService.msgInfoDetail(severities.ERROR, 'ERROR', 'Ha ocurrido un error inesperado: ' + JSON.stringify(error.status))
                    }
                });
        }

        this.modoSave = false
    }


    limpiarFormulario(): void {
        this.usuarioForm.reset();
        this.modoSave = false;
        this.terminos = false;
        this.base64String = '';
    }

    verCondiciones() {
        window.open(environment.ARCHIVO_CONDICIONES_REGISTRO, '_blank');
    }


    onFileSelected(event: any): void {
        const file = event.target.files[0];
        if (file) {
            this.convertFileToBase64(file);
        }
    }

    convertFileToBase64(file: File): void {
        const reader = new FileReader();

        reader.onload = () => {
            this.base64String = reader.result as string;
            this.usuarioForm.controls.avatar.setValue(this.base64String.split(',')[1]);
            console.log(this.usuarioForm.controls.avatar.value);
        };

        reader.readAsDataURL(file);
    }
}

