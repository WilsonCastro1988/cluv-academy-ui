import {Component, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {AppService} from "../../../_service/app.service";
import {FileService} from "../../../_service/utils/file.service";
import {ApiService} from "../../../_service/api.service";
import {ConfirmationService} from "primeng/api";
import {Table} from "primeng/table";

@Component({
    selector: 'app-shared-table',
    templateUrl: './shared-table.component.html',
    styleUrls: ['./shared-table.component.scss']
})
export class SharedTableComponent implements OnInit {
    @Input() proceso: string;
    @Input() list: any[];
    @Input() dto: any;
    @Input() selectedDto: any;
    @Input() columnsHeader: any[] = [];
    @Input() selectedList: any[];

    @Input() submitted: boolean;
    @Input() loading: boolean;
    @Input() titleTable: string;
    @Input() exportColumns: any[];
    @Input() cols: any[];
    @Input() rows: any;
    @Input() paginator: any;
    @Input() globalRowFilters: any[] = [];
    @Input() responsiveLayout: any;
    @Input() autoLayout: any;
    @Input() dataKey: any;
    @Input() sorts: boolean;
    @Input() filters: boolean;
    @Input() expExcel: boolean;
    @Input() expPdf: boolean;
    @Input() customBodyTemplate!: TemplateRef<any>;

    @Input() endpoint: string;
    @Input() opciones: boolean;
    @Input() btnDelete: boolean;
    @Input() btnEdit: boolean;
    @Input() chekList: boolean;
    @Input() sumary: boolean;
    @Input() sumaryClass: string;
    @Input() sumaryContent: string;
    @Input() colspan:number;
    @Input() legendFooter:string;
    @Input() currency:string;

    @Input() nombreReporteExcel: string;
    @Input() nombreReportePdf: string;

    @Output() public emitDeleteDto = new EventEmitter<number>();
    @Output() public emitSelectedDto = new EventEmitter<any>();
    @Output() public emitSelectedList = new EventEmitter<any>();

    constructor(
        private appService: AppService,
        private fileService: FileService,
        private apiService: ApiService,
        private confirmationService: ConfirmationService
    ) {
        this.apiService.endpoint = this.endpoint;
    }

    ngOnInit() {
    }

    clear(table: Table) {
        table.clear();
    }

    deleteSelected() {
        this.emitSelectedList.emit(this.selectedList);
    }

    edit(dto) {
        this.dto = {...dto};
        this.emitSelectedDto.emit(this.dto);
        this.gotTo();
    }

    gotTo(){
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }

    delete(dto) {
        this.dto = {...dto};
        this.emitDeleteDto.emit(this.dto);
    }

    exportPdf() {
        this.appService.exportPdf(this.exportColumns, this.list, this.nombreReportePdf, "p");
    }

    exportExcel() {
        this.appService.exportExcel(this.list, this.nombreReporteExcel);
    }

    descargarArchivo(fileName: string) {
        try {
            this.fileService.getFileByName(fileName, this.proceso);
        } catch (error) {
            this.appService.msgInfoDetail('error', 'Error', 'Error al descargar el archivo');
        }
    }
}
