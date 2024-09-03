import {Component, OnInit} from '@angular/core';
import {accessType, severities} from "../../../../../../_enums/constDomain";
import {senseiEndpoints} from "../../../services/endpoints-sensei";
import {TokenService} from "../../../../../../_service/token.service";
import {ApiService} from "../../../../../../_service/api.service";
import {AppService} from "../../../../../../_service/app.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Table} from "primeng/table";
import {InfoAcademicaTutorDto} from "../../../../../../_model/academy/InfoAcademicaTutorDto";
import {TutorDto} from "../../../../../../_model/academy/TutorDto";

@Component({
    selector: 'app-sensei-academy-info',
    templateUrl: './sensei-academy-info.component.html',
    styleUrls: ['./sensei-academy-info.component.scss']
})
export class SenseiAcademyInfoComponent implements OnInit {

    blockingui: boolean
    loading: boolean
    form: FormGroup;
    infoAcademicaTutor: InfoAcademicaTutorDto = new InfoAcademicaTutorDto();
    tutor: TutorDto = new TutorDto()
    listInfoAcademicaTutor: InfoAcademicaTutorDto[] = []
    listSelectInfoAcademicaTutor: InfoAcademicaTutorDto[] = []


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
            idInfoAcademicaTutor: new FormControl('',),
            institucion: new FormControl('',),
            nivelInfoAcademicaTutor: new FormControl('',),
            tituloInfoAcademicaTutor: new FormControl('',),
            activoInfoAcademicaTutor: new FormControl(true,),
            idTutorDto: new FormControl('',),
        });
    }

    get f() {
        return this.form.controls
    }

    construirTabla() {
        this.columnsHeader = [
            {field: 'activoInfoAcademicaTutor', header: 'Activo'},
            {field: 'institucion', header: 'Institurción'},
            {field: 'nivelInfoAcademicaTutor', header: 'Nivel Académico'},
            {field: "tituloInfoAcademicaTutor", header: 'Nombre Título'},
        ];

        this.filterFields = [
            'activoInfoAcademicaTutor',
            'institucion',
            'nivelInfoAcademicaTutor',
            'tituloInfoAcademicaTutor'
        ]

        this.exportColumns = this.columnsHeader.map(col => ({title: col.header, dataKey: col.field}));
        this.loading = false;
    }

    clear(table: Table) {
        table.clear();
    }

    cargarListaInfoAcademicaTutor() {
        this.loading = true
        this.apiService.endpoint = accessType.typePrivate + senseiEndpoints.listarInfoAcademicaTutorByIdTutor
        this.apiService.getById(this.tutor.idTutor).subscribe({
            next: data => {
                this.listInfoAcademicaTutor = data.listado
                this.loading = false
            },
            complete: () => {
                this.loading = false
            }, error: () => {
                this.loading = false
            }
        })
    }

    cargarListaAcademicaAndTutor(usuario) {
        this.loading = true
        this.apiService.endpoint = accessType.typePrivate + senseiEndpoints.buscarTutorPorIdUsuario

        this.apiService.getById(usuario).subscribe({
            next: data => {
                if(data.objeto !== null) {
                    this.tutor = data.objeto
                    this.f.idTutorDto.setValue(this.tutor)
                    this.listInfoAcademicaTutor = this.tutor.infoAcademicaTutorCollectionDto
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
        this.cargarListaAcademicaAndTutor(this.tokenService.getCurrentUser())
        this.appService.obtenerDatos().subscribe({
            next: data => {
                this.cargarListaAcademicaAndTutor(data.nombreUsuario)
            }, complete: () => {
            }, error: error => {
                console.log('ERROR GET: ', error)
            }
        });
    }


    editItem(item) {
        this.infoAcademicaTutor = {...item}
        this.form = this.formBuilder.group(this.infoAcademicaTutor);
        this.f.idTutorDto.setValue(this.tutor)
    }

    guardar() {

        this.blockingui = true

        if (this.form.invalid) {
            this.appService.msgCheckInfoData()
            this.blockingui = false
        } else {
            this.infoAcademicaTutor = this.form.value

            this.apiService.endpoint = accessType.typePrivate + senseiEndpoints.guardarInfoAcademicaTutor
            this.apiService.saveObject(this.infoAcademicaTutor).subscribe({
                next: data => {
                    if (data.codigoRespuestaValue == 200) {
                        if (!this.infoAcademicaTutor.idInfoAcademicaTutor) {
                            this.appService.msgCreate()
                        } else {
                            this.appService.msgUpdate()
                        }

                        this.cargarListaInfoAcademicaTutor()

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
