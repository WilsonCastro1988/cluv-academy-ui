import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {TokenService} from "../../../../_service/token.service";
import {ApiService} from "../../../../_service/api.service";
import {AppService} from "../../../../_service/app.service";
import {Table} from "primeng/table";
import {accessType, severities} from "../../../../_enums/constDomain";
import {endpointsPermisos} from "../services/endpoints-permisos";
import {AutorizacionDto} from "../../../../_model/gestion/AutorizacionDto";
import {PerfilDto} from "../../../../_model/gestion/PerfilDto";
import {MenuDto} from "../../../../_model/gestion/MenuDto";
import {endpointsPerfil} from "../../perfil/services/endpoints-perfil";
import {PermisosDto} from "../dto/PermisosDto";

@Component({
    selector: 'app-permisos',
    templateUrl: './permisos.component.html',
    styleUrls: ['./permisos.component.scss']
})
export class PermisosComponent implements OnInit {

    blockingui: boolean
    loading: boolean
    form: FormGroup;
    permisos: AutorizacionDto;
    listPermisos: PermisosDto[] = []
    listPerfil: PerfilDto[] = []
    listMenu: MenuDto[] = []

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
        this.cargarListaPerfiles()
        this.cargarListaMenus()
    }

    initForm(): void {
        this.form = this.formBuilder.group({
            idAutorizacion: new FormControl('',),
            permisos: new FormControl('',),
            idMenuDto: new FormControl('',),
            idPerfilDto: new FormControl('',),
        });
    }

    get f() {
        return this.form.controls
    }

    construirTabla() {
        this.columnsHeader = [
            {field: 'permiso', header: 'Permisos'},
            {field: 'menu', header: 'Menu'},
            {field: 'url', header: 'Url'},
            {field: 'perfil', header: 'Perfil'}
        ];

        this.filterFields = [
            'permiso',
            'menu',
            'url',
            'perfil'
        ]

        this.exportColumns = this.columnsHeader.map(col => ({title: col.header, dataKey: col.field}));
        this.loading = false;
    }

    clear(table: Table) {
        table.clear();
    }

    cargarLista() {
        this.loading = true
        this.apiService.endpoint = accessType.typePrivate + endpointsPermisos.listaPermisos
        this.apiService.getAll().subscribe({
            next: data => {
                this.listPermisos = data.listado
                this.loading = false
            },
            complete: () => {
                this.loading = false
            }, error: () => {
                this.loading = false
            }
        })
    }

    cargarListaPerfiles() {
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

    cargarListaMenus() {
        this.loading = true
        this.apiService.endpoint = accessType.typePrivate + endpointsPermisos.listarMenu
        this.apiService.getAll().subscribe({
            next: data => {
                this.listMenu = data.listado
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

        this.apiService.endpoint = accessType.typePrivate + endpointsPermisos.buscarPorIdAutorizacion

        this.apiService.getById(item.idPermiso).subscribe({
            next: data =>{
                this.permisos = data.objeto
                this.form = this.formBuilder.group(this.permisos);


            },
            complete: () => {},
            error: () => {this.appService.msgInfoDetail(severities.ERROR, 'Error', 'ha ocurrido un error al consultar Autorizaciones')}
        })

        this.f.idMenuDto.setValue(this.listMenu.find(menu => menu.idMenu === item.idMenu))
        this.f.idPerfilDto.setValue(this.listPerfil.find(perfil => perfil.idPerfil === item.idPerfil))
    }

    guardar() {

        this.blockingui = true

        if (this.form.invalid) {
            this.appService.msgCheckInfoData()
            this.blockingui = false
        } else {
            this.permisos = this.form.value

            this.apiService.endpoint = accessType.typePrivate + endpointsPermisos.guardar
            this.apiService.saveObject(this.permisos).subscribe({
                next: data => {
                    if (data.codigoRespuestaValue == 200) {
                        if (!this.permisos.idAutorizacion) {
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
        this.cargarListaPerfiles()
        this.cargarListaMenus()
    }
}



