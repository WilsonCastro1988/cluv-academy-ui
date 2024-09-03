import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../../../_service/api.service";
import {AppService} from "../../../../../_service/app.service";
import {Table} from "primeng/table";
import {accessType, severities} from "../../../../../_enums/constDomain";
import {EstudiantePostulanteDto} from "../../dto/EstudiantePostulanteDto";
import {postulacionStudent} from "../../services/endpoints-postulacion-student";


@Component({
    selector: 'app-postulation-student-list',
    templateUrl: './postulation-student-list.component.html',
    styleUrls: ['./postulation-student-list.component.scss']
})
export class PostulationStudentListComponent implements OnInit {

    listStudent: EstudiantePostulanteDto [] = [];
    selectListStudent: EstudiantePostulanteDto [] = [];

    student: EstudiantePostulanteDto = new EstudiantePostulanteDto();

    blockingui: boolean;
    loading: boolean;
    activeIndex: number;
    visibleSidebar: boolean;
    disabledTabs: boolean = false
    visibleSidebarAddStudent: boolean

    exportColumns: any[];
    columnsHeader: any[];
    filterFields: any[];

    rowsPerPageOptions: any[] = [10, 25, 50, 75, 100];

    constructor(private apiService: ApiService,
                private appService: AppService) {
    }

    construirTabla() {

        this.columnsHeader = [
            {field: 'activoEstudiante', header: 'Activo'},
            {field: 'nombreUsuario', header: 'Nombre Usuario'},
            {field: 'nombres', header: 'Nombre'},
            {field: 'emailPersonal', header: 'Email personal'},
            {field: 'emailInstitucional', header: 'Email institucional'}
        ];

        this.filterFields = [
            'activoEstudiante',
            'nombres',
            'nombreUsuario',
            'emailPersonal',
            'emailInstitucional'
        ]
        this.exportColumns = this.columnsHeader.map(col => ({title: col.header, dataKey: col.field}));
        this.loading = false;
    }

    clear(table: Table) {
        table.clear();
    }

    ngOnInit(): void {
        this.llenarListadoStudents()
        this.construirTabla();
    }

    llenarListadoStudents() {

        this.apiService.endpoint = accessType.typePrivate + postulacionStudent.listarEstudiantes

        this.apiService.getAll().subscribe({
            next: data => {
                this.listStudent = data.listado
            }
        })
    }

    editItem(item) {
        this.blockingui = true
        this.student = {...item}
        this.buscarUsuarioPorIdStudent(this.student);
    }

    buscarUsuarioPorIdStudent(item) {
        this.apiService.endpoint = accessType.typePrivate + postulacionStudent.buscarUsuarioPorIdStudent
        this.apiService.getById(item.idEstudiante).subscribe({
            next: data => {
                this.appService.enviarDatos(data.objeto)
                this.visibleSidebar = true;
                this.disabledTabs = false;
                this.activeIndex = 0;
                this.blockingui = false;
            },
            complete: () => {

            },
            error: error => {
                this.blockingui = false;
            }
        })
    }
}

