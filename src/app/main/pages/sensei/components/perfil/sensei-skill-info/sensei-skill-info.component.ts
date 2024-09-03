import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {InfoAcademicaTutorDto} from "../../../../../../_model/academy/InfoAcademicaTutorDto";
import {TutorDto} from "../../../../../../_model/academy/TutorDto";
import {TokenService} from "../../../../../../_service/token.service";
import {ApiService} from "../../../../../../_service/api.service";
import {AppService} from "../../../../../../_service/app.service";
import {Table} from "primeng/table";
import {accessType, severities} from "../../../../../../_enums/constDomain";
import {senseiEndpoints} from "../../../services/endpoints-sensei";
import {InfoDestrezasDto} from "../../../../../../_model/academy/InfoDestrezasDto";

@Component({
  selector: 'app-sensei-skill-info',
  templateUrl: './sensei-skill-info.component.html',
  styleUrls: ['./sensei-skill-info.component.scss']
})
export class SenseiSkillInfoComponent implements OnInit {

    blockingui: boolean
    loading: boolean
    form: FormGroup;
    infoSkillsTutor: InfoDestrezasDto = new InfoDestrezasDto();
    tutor: TutorDto = new TutorDto()
    listInfoSkillsTutor: InfoDestrezasDto[] = []
    listSelectInfoSkillsTutor: InfoDestrezasDto[] = []

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
            idInfoDestrezasTutor: new FormControl('',),
            nombreInfoDestrezasTutor: new FormControl('',),
            activoInfoDestrezasTutor: new FormControl(true,),
            idTutorDto: new FormControl('',),
        });
    }

    get f() {
        return this.form.controls
    }

    construirTabla() {
        this.columnsHeader = [
            {field: 'activoInfoDestrezasTutor', header: 'Activo'},
            {field: 'nombreInfoDestrezasTutor', header: 'Destreza'},
        ];

        this.filterFields = [
            'activoInfoDestrezasTutor',
            'nombreInfoDestrezasTutor',
        ]

        this.exportColumns = this.columnsHeader.map(col => ({title: col.header, dataKey: col.field}));
        this.loading = false;
    }

    clear(table: Table) {
        table.clear();
    }

    cargarListaPorIdTutor() {
        this.loading = true
        this.apiService.endpoint = accessType.typePrivate + senseiEndpoints.listarInfoDestrezasTutorByIdTutor
        this.apiService.getById(this.tutor.idTutor).subscribe({
            next: data => {
                this.listInfoSkillsTutor = data.listado
                this.loading = false
            },
            complete: () => {
                this.loading = false
            }, error: () => {
                this.loading = false
            }
        })
    }

    cargarListaPorUsuario(usuario) {
        this.loading = true
        this.apiService.endpoint = accessType.typePrivate + senseiEndpoints.buscarTutorPorIdUsuario
        this.apiService.getById(usuario).subscribe({
            next: data => {
                if(data.objeto !== null) {
                    this.tutor = data.objeto
                    this.f.idTutorDto.setValue(this.tutor)
                    this.listInfoSkillsTutor = this.tutor.infoDestrezasCollectionDto
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
        this.cargarListaPorUsuario(this.tokenService.getCurrentUser())
        this.appService.obtenerDatos().subscribe({
            next: data => {
                this.cargarListaPorUsuario(data.nombreUsuario)
            }, complete: () => {
            }, error: error => {
                console.log('ERROR GET: ', error)
            }
        });
    }

    editItem(item) {
        this.infoSkillsTutor = {...item}
        this.form = this.formBuilder.group(this.infoSkillsTutor);
        this.f.idTutorDto.setValue(this.tutor)
    }

    guardar() {

        this.blockingui = true

        if (this.form.invalid) {
            this.appService.msgCheckInfoData()
            this.blockingui = false
        } else {
            this.infoSkillsTutor = this.form.value

            this.apiService.endpoint = accessType.typePrivate + senseiEndpoints.guardarInfoDestrezasTutor
            this.apiService.saveObject(this.infoSkillsTutor).subscribe({
                next: data => {
                    if (data.codigoRespuestaValue == 200) {
                        if (!this.infoSkillsTutor.idInfoDestrezasTutor) {
                            this.appService.msgCreate()
                        } else {
                            this.appService.msgUpdate()
                        }

                        this.cargarListaPorIdTutor()

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

