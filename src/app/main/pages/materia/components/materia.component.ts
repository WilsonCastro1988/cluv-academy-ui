import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {MateriaDto} from "../../../../_model/academy/MateriaDto";
import {TokenService} from "../../../../_service/token.service";
import {ApiService} from "../../../../_service/api.service";
import {AppService} from "../../../../_service/app.service";
import {Table} from "primeng/table";
import {accessType, severities} from "../../../../_enums/constDomain";
import {ClubDto} from "../../../../_model/academy/ClubDto";
import {endpointsMateria} from "../services/endpoints-materia";
import {endpointsClubes} from "../../clubes/services/endpoints-clubes";

@Component({
    selector: 'app-materia',
    templateUrl: './materia.component.html',
    styleUrls: ['./materia.component.scss']
})
export class MateriaComponent implements OnInit {

    blockingui: boolean
    loading: boolean
    form: FormGroup;
    materia: MateriaDto = new MateriaDto();
    listMateria: MateriaDto[] = []
    listSelectMateria: MateriaDto[] = []
    listClubes: ClubDto[] = []

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
        this.cargarListaClubes()
    }

    initForm(): void {
        this.form = this.formBuilder.group({
            idMateria: new FormControl('',),
            nombreMateria: new FormControl('',),
            descripcionMateria: new FormControl('',),
            valoracionMateria: new FormControl('',),
            recursosMateria: new FormControl('',),
            materialesMateria: new FormControl('',),
            aforoReferencialMateria: new FormControl('',),
            costoReferencialMateria: new FormControl('',),
            activoMateria: new FormControl('',),
            idClubDto: new FormControl('',),

        });
    }

    get f() {
        return this.form.controls
    }

    construirTabla() {
        this.columnsHeader = [
            {field: 'nombreMateria', header: 'Materia'},
            {field: 'descripcionMateria', header: 'Descripcion'},
            {field: 'valoracionMateria', header: 'Valoració'},
            {field: 'recursosMateria', header: 'Recursos'},
            {field: 'materialesMateria', header: 'Materiales'},
            {field: 'aforoReferencialMateria', header: 'Aforo'},
            {field: 'costoReferencialMateria', header: 'Costo Referencial'},
            {field: 'activoMateria', header: 'Activo'},
        ];

        this.filterFields = [
            'nombreMateria',
            'descripcionMateria',
            'valoracionMateria',
            'recursosMateria',
            'materialesMateria',
            'aforoReferencialMateria',
            'costoReferencialMateria',
            'activoMateria'
        ]

        this.exportColumns = this.columnsHeader.map(col => ({title: col.header, dataKey: col.field}));
        this.loading = false;
    }

    clear(table: Table) {
        table.clear();
    }

    cargarLista() {
        this.loading = true
        this.apiService.endpoint = accessType.typePrivate + endpointsMateria.listar
        this.apiService.getAll().subscribe({
            next: data => {
                this.listMateria = data.listado
                this.loading = false
            },
            complete: () => {
                this.loading = false
            }, error: () => {
                this.loading = false
            }
        })
    }

    cargarListaClubes() {
        this.loading = true
        this.apiService.endpoint = accessType.typePrivate + endpointsClubes.listar
        this.apiService.getAll().subscribe({
            next: data => {
                this.listClubes = data.listado
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
        this.materia = {...item}
        this.form = this.formBuilder.group(this.materia);
        this.f.idClubDto.setValue(this.listClubes.find(item => item.idClub === this.materia.idClubDto.idClub))
    }

    guardar() {

        this.blockingui = true

        if (this.form.invalid) {
            this.appService.msgCheckInfoData()
            this.blockingui = false
        } else {
            this.materia = this.form.value
            this.materia.paqueteCollectionDto = null;
            this.materia.claseCollectionDto = null;
            this.materia.silaboCollectionDto = null;

            this.apiService.endpoint = accessType.typePrivate + endpointsMateria.guardar
            this.apiService.saveObject(this.materia).subscribe({
                next: data => {
                    if (data.codigoRespuestaValue == 200) {
                        if (!this.materia.idMateria) {
                            this.appService.msgCreate()
                        } else {
                            this.appService.msgUpdate()
                        }

                        this.cargarLista()
                        this.cargarListaClubes()

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
        this.cargarListaClubes()
    }
}


