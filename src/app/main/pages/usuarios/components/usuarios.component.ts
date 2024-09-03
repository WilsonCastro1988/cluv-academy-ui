import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TokenService} from "../../../../_service/token.service";
import {ApiService} from "../../../../_service/api.service";
import {AppService} from "../../../../_service/app.service";
import {Table} from "primeng/table";
import {accessType, severities} from "../../../../_enums/constDomain";
import {UsuarioDto} from "../../../../_model/gestion/UsuarioDto";
import {endpointsUsuarios} from "../services/endpoints-usuarios";
import {endpointsPerfil} from "../../perfil/services/endpoints-perfil";
import {PerfilDto} from "../../../../_model/gestion/PerfilDto";
import {PerfilUsuarioDto} from "../../../../_model/gestion/PerfilUsuarioDto";
import {PerfilUsuarioPKDto} from "../../../../_model/gestion/PerfilUsuarioPKDto";

@Component({
    selector: 'app-usuarios',
    templateUrl: './usuarios.component.html',
    styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

    blockingui: boolean
    loading: boolean
    form: FormGroup;
    usuario: UsuarioDto = new UsuarioDto();
    listUsuario: UsuarioDto[] = []
    listSelectUsuario: UsuarioDto[] = []
    perfil: PerfilDto = new PerfilDto();
    listPerfiles: PerfilDto[] = []

    imgURL: string = 'https://lusu.ca/resources/LUSU%20Albums/LUSU%20Logos/Clubs_LOGO.jpg';
    baseimgURL: string = 'https://lusu.ca/resources/LUSU%20Albums/LUSU%20Logos/Clubs_LOGO.jpg';
    prefijoBase64 = 'data:image/png;base64,';


    //para tabla
    exportColumns: any[];
    columnsHeader: any[];
    filterFields: any[];
    rowsPerPageOptions: any[] = [10, 25, 50, 75, 100];

    constructor(private tokenService: TokenService,
                private apiService: ApiService,
                private appService: AppService,
                private formBuilder: FormBuilder,) {
    }

    ngOnInit(): void {
        this.initForm()
        this.construirTabla()
        this.cargarLista()
        this.cargarListaPerfiles()
    }

    initForm(): void {
        this.form = this.formBuilder.group({
            idUsuario: new FormControl('', ),
            nombreUsuario: new FormControl('',Validators.required),
            clave: new FormControl('',Validators.required),
            cedula: new FormControl('',Validators.required),
            fechaCreacion: new FormControl('',),
            activo: new FormControl(true,),
            nombres: new FormControl('',Validators.required),
            pathFirma: new FormControl('',),
            avatar: new FormControl('',),
            direccion: new FormControl('',Validators.required),
            telefono: new FormControl('',Validators.required),
            celular: new FormControl('',Validators.required),
            emailPersonal: new FormControl('',Validators.required),
            emailInstitucional: new FormControl('',),
            zonaHoraria: new FormControl('',Validators.required),
        });
    }

    get f() {
        return this.form.controls
    }

    construirTabla() {
        this.columnsHeader = [
            {field: 'nombreUsuario', header: 'Usuario'},
            {field: 'cedula', header: 'DNI'},
            {field: 'fechaCreacion', header: 'Fecha Creación'},
            {field: 'nombres', header: 'Nombres'},
            {field: 'direccion', header: 'Dirección'},
            {field: 'telefono', header: 'Telf'},
            {field: 'celular', header: 'Movil'},
            {field: 'emailPersonal', header: 'Email'},
            {field: 'emailInstitucional', header: 'Email Academy'},
            {field: 'zonaHoraria', header: 'GMT'},
            {field: 'activo', header: 'Activo'},
        ];

        this.filterFields = [
            'nombreUsuario',
            'cedula',
            'fechaCreacion',
            'nombres',
            'direccion',
            'telefono',
            'celular',
            'emailPersonal',
            'emailInstitucional',
            'zonaHoraria',
            'activo'
        ]

        this.exportColumns = this.columnsHeader.map(col => ({title: col.header, dataKey: col.field}));
        this.loading = false;
    }

    clear(table: Table) {
        table.clear();
    }

    cargarLista() {
        this.loading = true
        this.apiService.endpoint = accessType.typePrivate + endpointsUsuarios.listar
        this.apiService.getAll().subscribe({
            next: data => {
                this.listUsuario = data.listado
                this.loading = false
            },
            complete: () => {
                this.loading = false
            }, error: () => {
                this.loading = false
            }
        })
    }

    cargarListaPerfiles() {
        this.loading = true
        this.apiService.endpoint = accessType.typePrivate + endpointsPerfil.listar
        this.apiService.getAll().subscribe({
            next: data => {
                this.listPerfiles = data.listado
                this.loading = false
            },
            complete: () => {
                this.loading = false
            }, error: () => {
                this.loading = false
            }
        })
    }

    editItem(item) {
        this.usuario = {...item}
        this.form = this.formBuilder.group(this.usuario);
        this.apiService.endpoint = accessType.typePrivate + endpointsUsuarios.buscarPerfilPorUsuario
        this.apiService.getById(this.usuario.nombreUsuario).subscribe({
            next: data => {
                if (data.codigoRespuestaValue == 200) {
                    this.perfil = this.listPerfiles.find(item => item.idPerfil === data.objeto.idPerfil)
                }
            },
            complete: () => {
                this.blockingui = false
            },
            error: () => {
                this.blockingui = false
            }
        })
        this.f.avatar.setValue(item.avatar)
        this.f.activo.setValue(item.activo === 'SI' ? true: false)
        this.imgURL = this.prefijoBase64 + this.f.avatar.value
    }

    guardar() {

        this.blockingui = true

        if (this.form.invalid) {
            this.appService.msgCheckInfoData()
            this.marcarControlesComoDirty(this.form)
            this.blockingui = false
            return;
        } else {

            if (!this.perfil) {
                this.appService.msgInfoDetail(severities.ERROR, 'ERROR', 'Por favor, seleccione un Perfil para el Usuario')
                this.blockingui = false
                return;
            }
            this.usuario = this.form.value
            this.usuario.activo = this.f.activo ? 'SI': 'NO';

            this.apiService.endpoint = accessType.typePrivate + endpointsUsuarios.guardar
            this.apiService.saveObject(this.usuario).subscribe({
                next: data => {

                    if (data.codigoRespuestaValue == 226) {
                        this.appService.msgInfoDetail(severities.WARNING, 'Inconveniente', 'Nombre de usuario en uso, escoja otro por favor')
                        return
                    }
                    if (data.codigoRespuestaValue == 302) {
                        this.appService.msgInfoDetail(severities.WARNING, 'Inconveniente', 'Usuario ya está registrado')
                        return
                    }


                    if (data.codigoRespuestaValue == 200) {
                        if (!this.usuario.idUsuario) {
                            this.appService.msgCreate()
                        } else {
                            this.appService.msgUpdate()
                        }

                        this.usuario = data.objeto

                        let perfilUsuario: PerfilUsuarioDto = new PerfilUsuarioDto();
                        let perfilUsuarioPK: PerfilUsuarioPKDto = new PerfilUsuarioPKDto();

                        perfilUsuarioPK.idUsuario = this.usuario.idUsuario;
                        perfilUsuarioPK.idPerfil = this.perfil.idPerfil

                        perfilUsuario.perfilUsuarioPKDto = perfilUsuarioPK
                        perfilUsuario.usuarioDto = this.usuario
                        perfilUsuario.perfilDto = this.perfil

                        this.apiService.endpoint = accessType.typePrivate + endpointsUsuarios.guardarPerfilUsuario
                        this.apiService.saveObject(perfilUsuario).subscribe({
                            next: data => {
                                if (data.codigoRespuestaValue == 200) {
                                    this.appService.msgInfoDetail(severities.WARNING, 'Info', 'Perfil procesado')
                                } else {
                                    this.appService.msgInfoDetail(severities.WARNING, 'Info', 'Inconveninete al procesar perfil')
                                }
                            },
                            complete: () => {
                                this.blockingui = false
                                this.cancelar()
                            },
                            error: () => {
                                this.blockingui = false
                            }
                        })

                    } else {
                        this.appService.msgInfoDetail(severities.WARNING, 'Info', 'Inconveninete al Guardar')
                    }
                },
                complete: () => {
                    this.blockingui = false
                },
                error: () => {
                    this.blockingui = false
                }
            })
        }
    }

    cancelar() {
        this.form.reset()
        this.initForm()
        this.cargarLista()
        this.cargarListaPerfiles()
        this.perfil = new PerfilDto();
        this.usuario = new UsuarioDto();

        this.imgURL = 'https://lusu.ca/resources/LUSU%20Albums/LUSU%20Logos/Clubs_LOGO.jpg';
        this.baseimgURL = 'https://lusu.ca/resources/LUSU%20Albums/LUSU%20Logos/Clubs_LOGO.jpg';
    }

    onFileSelected(event: any): void {
        const file = event.target.files[0];
        if (file) {
            this.convertFileToBase64(file);
            this.f.avatar.setValue(this.imgURL)
        } else this.imgURL = this.baseimgURL
    }

    convertFileToBase64(file: File): void {
        const reader = new FileReader();
        reader.onload = () => {
            this.imgURL = reader.result as string;
        };

        reader.readAsDataURL(file);
    }

    cancelChangeAvatar() {
        this.imgURL = this.baseimgURL
    }

    marcarControlesComoDirty(formGroup: FormGroup | FormControl) {
        formGroup.markAsDirty();

        if (formGroup instanceof FormGroup) {
            Object.keys(formGroup.controls).forEach(controlName => {
                const control = formGroup.get(controlName);

                if (control instanceof FormGroup || control instanceof FormControl) {
                    if (control.validator) {
                        this.marcarControlesComoDirty(control);
                    }
                }
            });
        }
    }
}


