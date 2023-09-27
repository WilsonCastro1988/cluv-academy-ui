import { Component, OnInit } from '@angular/core';
import {ClaseLaunchDto} from "../../../../../_dto/ClaseLaunchDto";
import {ApiService} from "../../../../../_service/api.service";
import {TokenService} from "../../../../../_service/token.service";
import {AppService} from "../../../../../_service/app.service";
import {FormBuilder} from "@angular/forms";
import {Table} from "primeng/table";
import {accessType} from "../../../../../_enums/constDomain";
import {senseiEndpoints} from "../../../postulation-sensei/services/endpoints-postulacion-sensei";
import {endpointsStudent} from "../../services/endpoints-student";

@Component({
  selector: 'app-clases-student-list',
  templateUrl: './clases-student-list.component.html',
  styleUrls: ['./clases-student-list.component.scss']
})
export class ClasesStudentListComponent implements OnInit {

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
            {field: 'joinUrlClase', header: 'ZOOM'},
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
        this.apiService.endpoint = accessType.typePrivate + endpointsStudent.buscarEstudiantePorIdUsuario
        this.apiService.getById(this.tokenService.getCurrentUser()).subscribe({
            next: data => {
                this.apiService.endpoint = accessType.typePrivate + endpointsStudent.clasesMeetPorIdEstudiante
                this.apiService.getById(data.objeto.idEstudiante).subscribe({
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

