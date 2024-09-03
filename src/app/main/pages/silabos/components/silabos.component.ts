import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {MateriaDto} from "../../../../_model/academy/MateriaDto";
import {ClubDto} from "../../../../_model/academy/ClubDto";
import {TokenService} from "../../../../_service/token.service";
import {ApiService} from "../../../../_service/api.service";
import {AppService} from "../../../../_service/app.service";
import {Table} from "primeng/table";
import {accessType, severities} from "../../../../_enums/constDomain";
import {endpointsMateria} from "../../materia/services/endpoints-materia";
import {endpointsClubes} from "../../clubes/services/endpoints-clubes";
import {SilaboDto} from "../../../../_model/academy/SilaboDto";
import {endpointsSilabos} from "../services/endpoints-silabos";

@Component({
  selector: 'app-silabos',
  templateUrl: './silabos.component.html',
  styleUrls: ['./silabos.component.scss']
})
export class SilabosComponent implements OnInit {

    blockingui: boolean
    loading: boolean
    form: FormGroup;
    silabo: SilaboDto = new SilaboDto();
    listSilabo: SilaboDto[] = []
    listSelectSilabo: SilaboDto[] = []
    listMaterias: MateriaDto[] = []

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
        this.cargarListaMaterias()
    }

    initForm(): void {
        this.form = this.formBuilder.group({
            idSilabo: new FormControl('',),
            temaSilabo: new FormControl('',),
            descripcionSilabo: new FormControl('',),
            materialesSilabo: new FormControl('',),
            activoSilabo: new FormControl('',),
            idMateriaDto: new FormControl('',),

        });
    }

    get f() {
        return this.form.controls
    }

    construirTabla() {
        this.columnsHeader = [
            {field: 'temaSilabo', header: 'Sílabo'},
            {field: 'descripcionSilabo', header: 'Descripcion'},
            {field: 'materialesSilabo', header: 'Materiales'},
            {field: 'activoSilabo', header: 'Activo'},

        ];

        this.filterFields = [
            'temaSilabo',
            'descripcionSilabo',
            'materialesSilabo',
            'activoSilabo',

        ]

        this.exportColumns = this.columnsHeader.map(col => ({title: col.header, dataKey: col.field}));
        this.loading = false;
    }

    clear(table: Table) {
        table.clear();
    }

    cargarLista() {
        this.loading = true
        this.apiService.endpoint = accessType.typePrivate + endpointsSilabos.listar
        this.apiService.getAll().subscribe({
            next: data => {
                this.listSilabo = data.listado
                this.loading = false
            },
            complete: () => {
                this.loading = false
            }, error: () => {
                this.loading = false
            }
        })
    }

    cargarListaMaterias() {
        this.loading = true
        this.apiService.endpoint = accessType.typePrivate + endpointsMateria.listar
        this.apiService.getAll().subscribe({
            next: data => {
                this.listMaterias = data.listado
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
        this.silabo = {...item}
        this.form = this.formBuilder.group(this.silabo);
        this.f.idMateriaDto.setValue(this.listMaterias.find(item => item.idMateria === this.silabo.idMateriaDto.idMateria))
    }

    guardar() {

        this.blockingui = true

        if (this.form.invalid) {
            this.appService.msgCheckInfoData()
            this.blockingui = false
        } else {
            this.silabo = this.form.value

            this.apiService.endpoint = accessType.typePrivate + endpointsSilabos.guardar
            this.apiService.saveObject(this.silabo).subscribe({
                next: data => {
                    if (data.codigoRespuestaValue == 200) {
                        if (!this.silabo.idSilabo) {
                            this.appService.msgCreate()
                        } else {
                            this.appService.msgUpdate()
                        }

                        this.cargarLista()
                        this.cargarListaMaterias()

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
        this.cargarListaMaterias()
    }
}



