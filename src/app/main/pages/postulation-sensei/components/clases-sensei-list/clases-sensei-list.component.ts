import {Component, OnInit} from '@angular/core';
import {TutorPostulanteDto} from "../../dto/TutorPostulanteDto";
import {TutorDto} from "../../../../../_model/academy/TutorDto";
import {ApiService} from "../../../../../_service/api.service";
import {AppService} from "../../../../../_service/app.service";
import {FormBuilder} from "@angular/forms";
import {Table} from "primeng/table";
import {accessType} from "../../../../../_enums/constDomain";
import {senseiEndpoints} from "../../services/endpoints-postulacion-sensei";
import {TokenService} from "../../../../../_service/token.service";
import {ClaseLaunchDto} from "../../../../../_dto/ClaseLaunchDto";

@Component({
    selector: 'app-clases-sensei-list',
    templateUrl: './clases-sensei-list.component.html',
    styleUrls: ['./clases-sensei-list.component.scss']
})
export class ClasesSenseiListComponent implements OnInit {

    listClases: ClaseLaunchDto[] = [];
    selectListClases: ClaseLaunchDto [] = [];

    claseLaunch: ClaseLaunchDto = new ClaseLaunchDto();

    loading: boolean;
    activeIndex: number;
    visibleSidebar: boolean;
    disabledTabs: boolean = false

    exportColumns: any[];
    columnsHeader: any[];
    filterFields: any[];

    rowsPerPageOptions: any[] = [10, 25, 50, 75, 100];

    constructor(private apiService: ApiService,
                private tokenService: TokenService,
                private appService: AppService,
                private formBuilder: FormBuilder) {
    }

    construirTabla() {

        this.columnsHeader = [
            {field: 'nombre', header: 'Nombre'},
            {field: 'descripcion', header: 'DESCRIPCION'},
            {field: 'startUrlClase', header: 'ZOOM'},
            {field: 'fechaInicioClase', header: 'FECHA'},
            {field: 'zonaHorariaClase', header: 'ZONA HORARIA'},
        ];

        this.filterFields = [
            'nombre',
            'descripcion',
            'fechaInicioClase',
            'zonaHorariaClase'
        ]
        this.exportColumns = this.columnsHeader.map(col => ({title: col.header, dataKey: col.field}));
        this.loading = false;
    }

    clear(table: Table) {
        table.clear();
    }

    ngOnInit(): void {
        this.cargarUsuario()
        this.construirTabla()
    }

    cargarUsuario() {
        this.apiService.endpoint = accessType.typePrivate + senseiEndpoints.buscarTutorPorIdUsuario
        this.apiService.getById(this.tokenService.getCurrentUser()).subscribe({
            next: data => {
                this.apiService.endpoint = accessType.typePrivate + senseiEndpoints.clasesMeetPoridTutor
                this.apiService.getById(data.objeto.idTutor).subscribe({
                    next: data => {
                        this.listClases = data.listado
                    }
                })
            }
        })
    }

    editItem(item) {
        this.apiService.endpoint = accessType.typePrivate + senseiEndpoints.findById
        this.apiService.getById(item.idTutor).subscribe({
            next: data => {
                this.claseLaunch = data.objeto
            }
        })
        this.visibleSidebar = true;
        this.disabledTabs = false;
        this.activeIndex = 0;
    }

}
