import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UsuarioDto} from "../../../../../../_model/gestion/UsuarioDto";
import {TokenService} from "../../../../../../_service/token.service";
import {ApiService} from "../../../../../../_service/api.service";
import {AppService} from "../../../../../../_service/app.service";
import {customEmailValidator, customMobileValidator} from "../../../../../../_validators/validators";
import {TokenDto} from "../../../../../../_dto/token-dto";
import {accessType, severities} from "../../../../../../_enums/constDomain";
import {senseiEndpoints} from "../../../../sensei/services/endpoints-sensei";

@Component({
    selector: 'app-user-personal-info',
    templateUrl: './user-personal-info.component.html',
    styleUrls: ['./user-personal-info.component.scss']
})
export class UserPersonalInfoComponent implements OnInit {

    usuarioForm: FormGroup;
    usuario: UsuarioDto = new UsuarioDto();

    constructor(
        private tokenService: TokenService,
        private apiService: ApiService,
        private appService: AppService,
        private formBuilder: FormBuilder
    ) {
    }

    ngOnInit(): void {
        this.initForm()
        this.cargarDatos()

    }

    initForm(): void {
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

    cargarUsuario(usuario) {
        this.apiService.endpoint = accessType.typePrivate + senseiEndpoints.buscarPorNombreUsuario
        this.apiService.getById(usuario).subscribe({
            next: data => {
                this.usuario = data.objeto
                this.usuarioForm = this.formBuilder.group(this.usuario);
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

    guardar() {
        if (this.usuarioForm.invalid) {
            this.appService.msgCheckInfoData()
            return
        } else {
            this.usuario = this.usuarioForm.value
            this.apiService.endpoint = accessType.typePrivate + senseiEndpoints.actualizarUsuario

            this.apiService.saveObject(this.usuario).subscribe({
                next: data => {
                    if (data.codigoRespuestaValue == 200) {
                        this.appService.msgUpdate()
                    }
                    this.usuario = data.objeto
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

