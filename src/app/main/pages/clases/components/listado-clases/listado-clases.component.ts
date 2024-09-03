import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {TokenService} from "../../../../../_service/token.service";
import {ApiService} from "../../../../../_service/api.service";
import {AppService} from "../../../../../_service/app.service";
import {Table} from "primeng/table";
import {accessType, severities} from "../../../../../_enums/constDomain";
import {endpointsClubes} from "../../../clubes/services/endpoints-clubes";
import {ClaseDto} from "../../../../../_model/academy/ClaseDto";
import {endpointsClases} from "../../services/endpoints-clases";
import {ClaseService} from "../../services/clases.service";

@Component({
    selector: 'app-listado-clases',
    templateUrl: './listado-clases.component.html',
    styleUrls: ['./listado-clases.component.scss']
})
export class ListadoClasesComponent implements OnInit {

    blockingui: boolean
    loading: boolean
    visibleSidebar: boolean
    form: FormGroup;
    clase: ClaseDto = new ClaseDto();
    listClase: ClaseDto[] = []
    listSelectClase: ClaseDto[] = []


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
                private classService: ClaseService,
                private formBuilder: FormBuilder,) {
    }

    ngOnInit(): void {
        this.initForm()
        this.construirTabla()
        this.cargarLista()
    }

    initForm(): void {
        this.form = this.formBuilder.group({
            idClub: new FormControl('',),
            nombreClub: new FormControl('',),
            descripcionClub: new FormControl('',),
            objetivosClub: new FormControl('',),
            introduccionClub: new FormControl('',),
            avatarClub: new FormControl('',),
            activoClub: new FormControl('',),
            idReconocimientoClubDto: new FormControl('',),
        });
    }

    get f() {
        return this.form.controls
    }

    construirTabla() {
        this.columnsHeader = [
            {field: 'nombreClase', header: 'Clase'},
            {field: 'descripcionClase', header: 'Descripcion'},
            //{field: 'linkZoomClase', header: 'Link Zoom'},
            //{field: 'joinUrlClase', header: 'Url Zoom'},
            //{field: 'startUrlClase', header: 'Start Zoom'},
            //{field: 'asistenciaClase', header: 'Asistencia'},
            //{field: 'aforoClase', header: 'Aforo'},
            //{field: 'costoClase', header: 'Costo'},
            //{field: 'duracionClase', header: 'Duración'},
            {field: 'fechaInicioClase', header: 'Fecha Inicio'},
            {field: 'fechaFinClase', header: 'Fecha Fin'},
            {field: 'activoClase', header: 'Activo'},

        ];

        this.filterFields = [
            'nombreClase',
            'descripcionClase',
            'linkZoomClase',
            'joinUrlClase',
            'startUrlClase',
            'asistenciaClase',
            'aforoClase',
            'costoClase',
            'duracionClase',
            'fechaInicioClase',
            'fechaFinClase',
            'activoClase',
        ]

        this.exportColumns = this.columnsHeader.map(col => ({title: col.header, dataKey: col.field}));
        this.loading = false;
    }

    clear(table: Table) {
        table.clear();
    }

    cargarLista() {
        this.loading = true
        this.apiService.endpoint = accessType.typePrivate + endpointsClases.listar
        this.apiService.getAll().subscribe({
            next: data => {
                this.listClase = data.listado
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
        this.clase = {...item}
        this.form = this.formBuilder.group(this.clase);
        this.f.avatarClase.setValue(item.avatarClase)
        this.imgURL = this.prefijoBase64 + this.f.avatarClase.value

        this.visibleSidebar = true

        this.classService.setItems(this.clase);
    }

    setEmitItem(item) {
        this.visibleSidebar = item
    }
    guardar() {

        this.blockingui = true

        if (this.form.invalid) {
            this.appService.msgCheckInfoData()
            this.blockingui = false
        } else {
            this.clase = this.form.value
            this.clase.carritoComprasCollectionDto = null
            this.clase.listaAsistenciaCollectionDto = null
            this.clase.reseniasCollectionDto = null
            this.clase.foroClaseCollectionDto = null

            this.apiService.endpoint = accessType.typePrivate + endpointsClubes.guardar
            this.apiService.saveObject(this.clase).subscribe({
                next: data => {
                    if (data.codigoRespuestaValue == 200) {
                        if (!this.clase.idClase) {
                            this.appService.msgCreate()
                        } else {
                            this.appService.msgUpdate()
                        }

                        this.cancelar()
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

        this.imgURL = 'https://lusu.ca/resources/LUSU%20Albums/LUSU%20Logos/Clubs_LOGO.jpg';
        this.baseimgURL = 'https://lusu.ca/resources/LUSU%20Albums/LUSU%20Logos/Clubs_LOGO.jpg';
    }

    onFileSelected(event: any): void {
        const file = event.target.files[0];
        if (file) {
            this.convertFileToBase64(file);
            this.f.avatarClub.setValue(this.imgURL)
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
}

