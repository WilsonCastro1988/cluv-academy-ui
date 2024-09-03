import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {TokenService} from "../../../../_service/token.service";
import {ApiService} from "../../../../_service/api.service";
import {AppService} from "../../../../_service/app.service";
import {Table} from "primeng/table";
import {accessType, severities} from "../../../../_enums/constDomain";
import {endpointsSilabos} from "../../silabos/services/endpoints-silabos";
import {endpointsMateria} from "../../materia/services/endpoints-materia";
import {endpointsPerfil} from "../services/endpoints-perfil";

@Component({
    selector: 'app-perfil',
    templateUrl: './perfil.component.html',
    styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

    blockingui: boolean
    loading: boolean
    form: FormGroup;
    perfil: any;
    listPerfil: any[] = []
    listSelectPerfil: any[] = []

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
            idPerfil: new FormControl('',),
            nombre: new FormControl('',),
            descripcion: new FormControl('',),
            activo: new FormControl('',),
        });
    }

    get f() {
        return this.form.controls
    }

    construirTabla() {
        this.columnsHeader = [
            {field: 'nombre', header: 'Nombre Perfil'},
            {field: 'descripcion', header: 'Descripcion'},
            {field: 'activo', header: 'Habilitado'},

        ];

        this.filterFields = [
            'nombre',
            'descripcion',
            'activo',

        ]

        this.exportColumns = this.columnsHeader.map(col => ({title: col.header, dataKey: col.field}));
        this.loading = false;
    }

    clear(table: Table) {
        table.clear();
    }

    cargarLista() {
        this.loading = true
        this.apiService.endpoint = accessType.typePrivate + endpointsPerfil.listar
        this.apiService.getAll().subscribe({
            next: data => {
                this.listPerfil = data.listado
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
        this.perfil = {...item}
        this.form = this.formBuilder.group(this.perfil);
        this.f.activo.setValue(this.perfil.activo === 'SI' ? true:false)
    }

    guardar() {

        this.blockingui = true

        if (this.form.invalid) {
            this.appService.msgCheckInfoData()
            this.blockingui = false
        } else {
            this.perfil = this.form.value
            this.perfil.activo = this.f.activo.value ? 'SI': 'NO'
            this.perfil.autorizacionListDto = null;
            this.perfil.perfilUsuarioListDto = null;

            this.apiService.endpoint = accessType.typePrivate + endpointsPerfil.guardar
            this.apiService.saveObject(this.perfil).subscribe({
                next: data => {
                    if (data.codigoRespuestaValue == 200) {
                        if (!this.perfil.idPerfil) {
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



