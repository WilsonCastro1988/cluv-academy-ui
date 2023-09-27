import {Component, OnInit} from '@angular/core';
import {Table} from "primeng/table";
import {TutorDto} from "../../../../../_model/academy/TutorDto";
import {ApiService} from "../../../../../_service/api.service";
import {AppService} from "../../../../../_service/app.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {accessType} from "../../../../../_enums/constDomain";
import {senseiEndpoints} from "../../services/endpoints-postulacion-sensei";
import {TutorPostulanteDto} from "../../dto/TutorPostulanteDto";
import {customEmailValidator, customMobileValidator} from "../../../../../_validators/validators";

@Component({
    selector: 'app-postulation-sensei-list',
    templateUrl: './postulation-sensei-list.component.html',
    styleUrls: ['./postulation-sensei-list.component.scss']
})
export class PostulationSenseiListComponent implements OnInit {

    listTutor: TutorPostulanteDto [] = [];
    selectListTutor: TutorPostulanteDto [] = [];

    tutor: TutorDto = new TutorDto();

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
                private formBuilder: FormBuilder) {
    }

    construirTabla() {

        this.columnsHeader = [
            {field: 'nombres', header: 'Nombre'},
            {field: 'especializacion', header: 'ESPECIALIZACION'},
            {field: 'habilidades', header: 'HABILIDADES'},
            {field: 'sobreMi', header: 'SOBRE MI'},
        ];

        this.filterFields = [
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

    llenarListadoTutores(){

            this.apiService.endpoint = accessType.typePrivate + senseiEndpoints.listarTutorPostulante

            this.apiService.getAll().subscribe({
                next: data => {
                    this.listTutor = data.listado
                }
            })
    }

    editItem(item) {
        this.apiService.endpoint = accessType.typePrivate + senseiEndpoints.findById

        console.log('TUTOR: ', item)
        this.apiService.getById(item.idTutor).subscribe({
            next: data => {
                this.tutor = data.objeto
            }
        })
        this.visibleSidebar = true;
        this.disabledTabs = false;
        this.activeIndex = 0;
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
