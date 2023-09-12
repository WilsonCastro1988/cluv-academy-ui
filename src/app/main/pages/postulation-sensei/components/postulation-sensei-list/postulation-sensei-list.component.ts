import {Component, OnInit} from '@angular/core';
import {Table} from "primeng/table";
import {TutorDto} from "../../../../../_model/academy/TutorDto";
import {ApiService} from "../../../../../_service/api.service";
import {AppService} from "../../../../../_service/app.service";
import {FormBuilder} from "@angular/forms";
import {accessType} from "../../../../../_enums/constDomain";
import {senseiEndpoints} from "../../services/endpoints-postulacion-sensei";

@Component({
    selector: 'app-postulation-sensei-list',
    templateUrl: './postulation-sensei-list.component.html',
    styleUrls: ['./postulation-sensei-list.component.scss']
})
export class PostulationSenseiListComponent implements OnInit {

    endPoint = accessType.typePrivate

    listTutor: TutorDto [] = [];
    selectListTutor: TutorDto [] = [];

    movimientoAjuste: TutorDto = new TutorDto();

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
            {field: 'idTutor', header: 'ID'},
            {field: 'especializacionTutor', header: 'ESPECIALIZACION'},
            {field: 'habilidadesTutor', header: 'HABILIDADES'},
            {field: 'sobremiTutor', header: 'SOBRE MI'},
        ];

        this.filterFields = [
            'idTutor',
            'especializacionTutor',
            'habilidadesTutor',
            'sobremiTutor'
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
    }

    llenarListadoTutores(){

            this.apiService.endpoint = accessType.typePrivate + senseiEndpoints.listarAll

            this.apiService.getAll().subscribe({
                next: data => {
                    this.listTutor = data.listado
                }
            })

    }


    editItem(item) {
        this.movimientoAjuste = {...item};
        this.visibleSidebar = true;
        this.disabledTabs = false;
       /* this.stepService.servicioData = ({
            movimientoDto: this.movimientoAjuste,
            listaMovimiento: this.listMovimientoAjustes,
            listaDetalleMovimiento: null,
            listaEvidenciaMovimiento: null
        })
        this.stepService._methodToCall.emit('edit');
        */
        this.activeIndex = 0;
    }

}
