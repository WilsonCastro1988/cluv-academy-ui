import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ReconocimientoClubDto} from "../../../../_model/academy/ReconocimientoClubDto";
import {TokenService} from "../../../../_service/token.service";
import {ApiService} from "../../../../_service/api.service";
import {AppService} from "../../../../_service/app.service";
import {Table} from "primeng/table";
import {accessType, severities} from "../../../../_enums/constDomain";
import {endpointsReconocimientoClub} from "../services/endpoints-reconocimiento-club";

@Component({
    selector: 'app-reconocimiento-club',
    templateUrl: './reconocimiento-club.component.html',
    styleUrls: ['./reconocimiento-club.component.scss']
})
export class ReconocimientoClubComponent implements OnInit {
    blockingui: boolean
    loading: boolean
    form: FormGroup;
    reconocimientoClub: ReconocimientoClubDto = new ReconocimientoClubDto();
    listReconocimientoClub: ReconocimientoClubDto[] = []
    listSelectReconocimientoClub: ReconocimientoClubDto[] = []


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
    }

    initForm(): void {
        this.form = this.formBuilder.group({
            idReconocimientoClub: new FormControl('',),
            nombreReconocimientoClub: new FormControl('',),
            descripcionReconocimientoClub: new FormControl('',),
            activoReconocimientoClub: new FormControl('',)
        });
    }

    get f() {
        return this.form.controls
    }

    construirTabla() {
        this.columnsHeader = [
            {field: 'nombreReconocimientoClub', header: 'Reconocimiento'},
            {field: 'descripcionReconocimientoClub', header: 'Descripcion'},
            {field: 'activoReconocimientoClub', header: 'Activo'}
        ];

        this.filterFields = [
            'nombreReconocimientoClub',
            'descripcionReconocimientoClub',
            'activoReconocimientoClub'
        ]

        this.exportColumns = this.columnsHeader.map(col => ({title: col.header, dataKey: col.field}));
        this.loading = false;
    }

    clear(table: Table) {
        table.clear();
    }

    cargarLista() {
        this.loading = true
        this.apiService.endpoint = accessType.typePrivate + endpointsReconocimientoClub.listar
        this.apiService.getAll().subscribe({
            next: data => {
                this.listReconocimientoClub = data.listado
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
        this.reconocimientoClub = {...item}
        this.form = this.formBuilder.group(this.reconocimientoClub);
    }

    guardar() {

        this.blockingui = true

        if (this.form.invalid) {
            this.appService.msgCheckInfoData()
            this.blockingui = false
        } else {
            this.reconocimientoClub = this.form.value

            this.apiService.endpoint = accessType.typePrivate + endpointsReconocimientoClub.guardar
            this.apiService.saveObject(this.reconocimientoClub).subscribe({
                next: data => {
                    if (data.codigoRespuestaValue == 200) {
                        if (!this.reconocimientoClub.idReconocimientoClub) {
                            this.appService.msgCreate()
                        } else {
                            this.appService.msgUpdate()
                        }

                        this.cargarLista()

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
    }


}

