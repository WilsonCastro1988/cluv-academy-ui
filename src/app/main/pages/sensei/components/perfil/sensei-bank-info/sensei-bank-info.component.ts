import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {TutorDto} from "../../../../../../_model/academy/TutorDto";
import {TokenService} from "../../../../../../_service/token.service";
import {ApiService} from "../../../../../../_service/api.service";
import {AppService} from "../../../../../../_service/app.service";
import {Table} from "primeng/table";
import {accessType, severities} from "../../../../../../_enums/constDomain";
import {senseiEndpoints} from "../../../services/endpoints-sensei";
import {InfoBancariaDto} from "../../../../../../_model/academy/InfoBancariaDto";

@Component({
    selector: 'app-sensei-bank-info',
    templateUrl: './sensei-bank-info.component.html',
    styleUrls: ['./sensei-bank-info.component.scss']
})
export class SenseiBankInfoComponent implements OnInit {

    blockingui: boolean
    loading: boolean
    form: FormGroup;
    infoBankTutor: InfoBancariaDto = new InfoBancariaDto();
    tutor: TutorDto = new TutorDto()
    listInfoBankTutor: InfoBancariaDto[] = []
    listSelectInfoBankTutor: InfoBancariaDto[] = []


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
        this.cargarDatos()
        this.construirTabla()
    }

    initForm(): void {
        this.form = this.formBuilder.group({
            idInfoBancariaTutor: new FormControl('',),
            cuentaInfoBancariaTutor: new FormControl('',),
            tipoInfoBancariaTutor: new FormControl('',),
            entidadInfoBancariaTutor: new FormControl('',),
            otroMetodoInfoBancariaTutor: new FormControl('',),
            activoInfoBancariaTutor: new FormControl(true,),
            idTutorDto: new FormControl('',),
        });
    }

    get f() {
        return this.form.controls
    }

    construirTabla() {
        this.columnsHeader = [
            {field: 'activoInfoBancariaTutor', header: 'Activo'},
            {field: 'cuentaInfoBancariaTutor', header: 'Cuenta'},
            {field: 'tipoInfoBancariaTutor', header: 'Tipo'},
            {field: "entidadInfoBancariaTutor", header: 'Entidad Bancaria'},
            {field: "otroMetodoInfoBancariaTutor", header: 'Otro Medio de Pago'},
        ];

        this.filterFields = [
            'activoInfoBancariaTutor',
            'cuentaInfoBancariaTutor',
            'tipoInfoBancariaTutor',
            'entidadInfoBancariaTutor',
            'otroMetodoInfoBancariaTutor',
        ]

        this.exportColumns = this.columnsHeader.map(col => ({title: col.header, dataKey: col.field}));
        this.loading = false;
    }

    clear(table: Table) {
        table.clear();
    }

    cargarListaInfoBankTutor() {
        this.loading = true
        this.apiService.endpoint = accessType.typePrivate + senseiEndpoints.listarInfoBancariaTutorByIdTutor
        this.apiService.getById(this.tutor.idTutor).subscribe({
            next: data => {
                this.listInfoBankTutor = data.listado
                this.loading = false
            },
            complete: () => {
                this.loading = false
            }, error: () => {
                this.loading = false
            }
        })
    }

    cargarListaBankAndTutor(usuario) {
        this.loading = true
        this.apiService.endpoint = accessType.typePrivate + senseiEndpoints.buscarTutorPorIdUsuario
        this.apiService.getById(usuario).subscribe({
            next: data => {
                if (data.objeto !== null) {
                    this.tutor = data.objeto
                    this.f.idTutorDto.setValue(this.tutor)
                    this.listInfoBankTutor = this.tutor.infoBancariaCollectionDto
                    this.loading = false
                }
            }, complete: () => {
                this.loading = false
            }, error: () => {
                this.loading = false
            }
        })
    }

    cargarDatos() {
        this.cargarListaBankAndTutor(this.tokenService.getCurrentUser())
        this.appService.obtenerDatos().subscribe({
            next: data => {
                this.cargarListaBankAndTutor(data.nombreUsuario)
            }, complete: () => {
            }, error: error => {
                console.log('ERROR GET: ', error)
            }
        });
    }

    editItem(item) {
        this.infoBankTutor = {...item}
        this.form = this.formBuilder.group(this.infoBankTutor);
        this.f.idTutorDto.setValue(this.tutor)
    }

    guardar() {

        this.blockingui = true

        if (this.form.invalid) {
            this.appService.msgCheckInfoData()
            this.blockingui = false
        } else {
            this.infoBankTutor = this.form.value

            this.apiService.endpoint = accessType.typePrivate + senseiEndpoints.guardarInfoBancariaTutor
            this.apiService.saveObject(this.infoBankTutor).subscribe({
                next: data => {
                    if (data.codigoRespuestaValue == 200) {
                        if (!this.infoBankTutor.idInfoBancariaTutor) {
                            this.appService.msgCreate()
                        } else {
                            this.appService.msgUpdate()
                        }

                        this.cargarListaInfoBankTutor()

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
        this.f.idTutorDto.setValue(this.tutor)
        this.cargarDatos()
    }


}

