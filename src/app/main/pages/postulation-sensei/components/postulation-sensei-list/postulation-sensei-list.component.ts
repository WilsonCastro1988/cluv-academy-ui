import {Component, OnInit} from '@angular/core';
import {Table} from "primeng/table";
import {TutorDto} from "../../../../../_model/academy/TutorDto";
import {ApiService} from "../../../../../_service/api.service";
import {AppService} from "../../../../../_service/app.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {accessType, severities} from "../../../../../_enums/constDomain";
import {senseiEndpoints} from "../../services/endpoints-postulacion-sensei";
import {TutorPostulanteDto} from "../../dto/TutorPostulanteDto";
import {customEmailValidator, customMobileValidator} from "../../../../../_validators/validators";
import {UsuarioDto} from "../../../../../_model/gestion/UsuarioDto";
import {LoginRequestDto} from "../../../../../_dto/login-request-dto";
import {ConfirmationService, ConfirmEventType} from "primeng/api";
import {TokenService} from "../../../../../_service/token.service";

@Component({
    selector: 'app-postulation-sensei-list',
    templateUrl: './postulation-sensei-list.component.html',
    styleUrls: ['./postulation-sensei-list.component.scss']
})
export class PostulationSenseiListComponent implements OnInit {

    listTutor: TutorPostulanteDto [] = [];
    selectListTutor: TutorPostulanteDto [] = [];

    tutor: TutorDto = new TutorDto();
    blockingui: boolean;
    visibleSidebarAddSensei:boolean;

    loading: boolean;
    activeIndex: number;
    visibleSidebar: boolean;
    disabledTabs: boolean = false


    exportColumns: any[];
    columnsHeader: any[];
    filterFields: any[];

    rowsPerPageOptions: any[] = [10, 25, 50, 75, 100];

    constructor(private apiService: ApiService,
                private appService: AppService,
                private tokenService: TokenService,
                private confirmationService: ConfirmationService,
                private formBuilder: FormBuilder) {
    }

    construirTabla() {

        this.columnsHeader = [
            {field: 'activo', header: 'Activo'},
            {field: 'nombres', header: 'Nombre'},
            {field: 'especializacion', header: 'ESPECIALIZACION'},
            {field: 'habilidades', header: 'HABILIDADES'},
            {field: 'sobreMi', header: 'SOBRE MI'},
        ];

        this.filterFields = [
            'activo',
            'nombres',
            'especializacion',
            'habilidades',
            'sobreMi'
        ]
        this.exportColumns = this.columnsHeader.map(col => ({title: col.header, dataKey: col.field}));
        this.loading = false;
    }

    clear(table: Table) {
        table.clear();
    }

    ngOnInit(): void {
        this.llenarListadoTutores()
        this.construirTabla();

        this.initTutorForm()
    }

    llenarListadoTutores() {

        this.apiService.endpoint = accessType.typePrivate + senseiEndpoints.listarTutorPostulante

        this.apiService.getAll().subscribe({
            next: data => {
                this.listTutor = data.listado
            }
        })
    }

    editItem(item) {
        this.blockingui = true
        this.apiService.endpoint = accessType.typePrivate + senseiEndpoints.findById
        this.apiService.getById(item.idTutor).subscribe({
            next: data => {
                this.tutor = data.objeto
                this.buscarUsuarioPorIdTutor(this.tutor);
            }
        })



    }

    actualizarTutor(){
        this.tutor.activoTutor = true;
        this.apiService.endpoint = accessType.typePrivate + senseiEndpoints.guardar
        this.apiService.saveObject(this.tutor).subscribe({
            next: data => {
                if (data.codigoRespuestaValue == 200) {
                    this.appService.msgUpdate()
                }
                this.blockingui = false
            },
            complete: () => {
                this.blockingui = false
            },
            error: error => {
                if (error.error.codigoRespuestaValue === 409) {
                    this.appService.msgInfoDetail(severities.WARNING, 'ERROR: ' + error.error.codigoRespuestaValue, 'Error en aprobación de Postulación');
                } else if (error.error.codigoRespuestaValue !== 200) {
                    this.appService.msgInfoDetail(severities.WARNING, 'ERROR', error.error.codigoRespuestaValue);
                } else {
                    this.appService.msgInfoDetail(severities.ERROR, 'ERROR', 'Ha ocurrido un error');
                }

                this.blockingui = false

            },
        })
    }

    aceptarPostulacion(item) {
        this.apiService.endpoint = accessType.typePrivate + senseiEndpoints.findById
        this.apiService.getById(item.idTutor).subscribe({
            next: data => {
                this.tutor = data.objeto
            }
        });


        this.confirmationService.confirm({
            acceptLabel: 'Aceptar',
            rejectLabel: 'Cancelar',
            acceptButtonStyleClass: 'p-button-outlined p-button-rounded p-button-success',
            rejectButtonStyleClass: 'p-button-outlined p-button-rounded p-button-danger',
            message: 'Está seguro de ealizar la Aprobación ?',
            header: 'Actualización',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.blockingui = true
                this.actualizarTutor()
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

    buscarUsuarioPorIdTutor(item) {
        this.apiService.endpoint = accessType.typePrivate + senseiEndpoints.buscarUsuarioPorIdTutor
        this.apiService.getById(item.idTutor).subscribe({
            next: data => {
                this.tokenService.setAlterCurrentUser(this.tokenService.getCurrentUser())
                this.tokenService.setCurrentUser(data.objeto.nombreUsuario)
                this.appService.enviarDatos(data.objeto)
            },
            complete: () => {
                this.visibleSidebar = true;
                this.disabledTabs = false;
                this.activeIndex = 0;
                this.blockingui = false;
            },
            error: error => {
                this.blockingui = false;
            }
        })
    }

    tutorForm: FormGroup;

    initTutorForm(): void {
        this.tutorForm = this.formBuilder.group({
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

}
