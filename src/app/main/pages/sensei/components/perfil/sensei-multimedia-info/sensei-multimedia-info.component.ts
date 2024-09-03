import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {TutorDto} from "../../../../../../_model/academy/TutorDto";
import {TokenService} from "../../../../../../_service/token.service";
import {ApiService} from "../../../../../../_service/api.service";
import {AppService} from "../../../../../../_service/app.service";
import {Table} from "primeng/table";
import {accessType, severities} from "../../../../../../_enums/constDomain";
import {senseiEndpoints} from "../../../services/endpoints-sensei";
import {MultimediaTutorDto} from "../../../../../../_model/academy/MultimediaTutorDto";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {SelectItem} from "primeng/api";

@Component({
    selector: 'app-sensei-multimedia-info',
    templateUrl: './sensei-multimedia-info.component.html',
    styleUrls: ['./sensei-multimedia-info.component.scss']
})
export class SenseiMultimediaInfoComponent implements OnInit {

    blockingui: boolean
    loading: boolean
    form: FormGroup;
    infoMultimediaTutor: MultimediaTutorDto = new MultimediaTutorDto();
    tutor: TutorDto = new TutorDto()
    listInfoMultimediaTutor: MultimediaTutorDto[] = []
    listSelectInfoMultimediaTutor: MultimediaTutorDto[] = []

    videoUrl!: SafeResourceUrl;
    videoUrlEdit!: SafeResourceUrl;


    //para tabla
    exportColumns: any[];
    columnsHeader: any[];
    filterFields: any[];
    rowsPerPageOptions: any[] = [10, 25, 50, 75, 100];

    sortOptions: SelectItem[];
    sortOrder: number;
    sortField: string;

    constructor(private tokenService: TokenService,
                private apiService: ApiService,
                private appService: AppService,
                private _sanitizer: DomSanitizer,
                private formBuilder: FormBuilder,) {
    }

    ngOnInit(): void {
        this.initForm()
        this.videoUrlEdit = this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/w1zEJeFVGro');
        this.cargarDatos()
        this.construirTabla()
    }

    initForm(): void {
        this.form = this.formBuilder.group({
            idMultimediaTutor: new FormControl('',),
            nombreMultimediaTutor: new FormControl('',),
            pathMultimediaTutor: new FormControl('',),
            descripcionMultimediaTutor: new FormControl('',),
            activoMultimediaTutor: new FormControl(true,),
            idTutorDto: new FormControl('',),
        });


        this.sortOptions = [
            {label: 'Price High to Low', value: '!price'},
            {label: 'Price Low to High', value: 'price'}
        ];
    }

    get f() {
        return this.form.controls
    }

    construirTabla() {
        this.columnsHeader = [
            {field: 'activoMultimediaTutor', header: 'Activo'},
            {field: 'nombreMultimediaTutor', header: 'Nombre Principal'},
            {field: 'pathMultimediaTutor', header: 'ID Video'},
            {field: "descripcionMultimediaTutor", header: 'Descrición'},
        ];

        this.filterFields = [
            'activoMultimediaTutor',
            'nombreMultimediaTutor',
            'pathMultimediaTutor',
            'descripcionMultimediaTutor',
        ]

        this.exportColumns = this.columnsHeader.map(col => ({title: col.header, dataKey: col.field}));
        this.loading = false;
    }

    clear(table: Table) {
        table.clear();
    }

    cargarListaInfoMultimediaTutor() {
        this.loading = true
        this.apiService.endpoint = accessType.typePrivate + senseiEndpoints.listarInfoMultimediaTutorByIdTutor
        this.apiService.getById(this.tutor.idTutor).subscribe({
            next: data => {
                this.listInfoMultimediaTutor = data.listado
                this.loading = false
            },
            complete: () => {
                this.loading = false
            }, error: () => {
                this.loading = false
            }
        })
    }

    cargarListaMultimediaAndTutor(usuario) {
        this.loading = true
        this.apiService.endpoint = accessType.typePrivate + senseiEndpoints.buscarTutorPorIdUsuario
        this.apiService.getById(usuario).subscribe({
            next: data => {
                if (data.objeto !== null) {
                    this.tutor = data.objeto
                    this.f.idTutorDto.setValue(this.tutor)
                    this.listInfoMultimediaTutor = this.tutor.multimediaTutorCollectionDto
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
        this.cargarListaMultimediaAndTutor(this.tokenService.getCurrentUser())
        this.appService.obtenerDatos().subscribe({
            next: data => {
                this.cargarListaMultimediaAndTutor(data.nombreUsuario)
            }, complete: () => {
            }, error: error => {
                console.log('ERROR GET: ', error)
            }
        });
    }

    editItem(item) {
        this.infoMultimediaTutor = {...item}
        this.form = this.formBuilder.group(this.infoMultimediaTutor);
        this.f.idTutorDto.setValue(this.tutor)

        this.videoUrlEdit = this.obtenerUrlVideoSanitized(this.infoMultimediaTutor.pathMultimediaTutor)
    }

    obtenerUrlVideoSanitized(url) {
        this.videoUrl = this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + url);
        return this.videoUrl;
    }

    guardar() {

        this.blockingui = true

        if (this.form.invalid) {
            this.appService.msgCheckInfoData()
            this.blockingui = false
        } else {
            this.infoMultimediaTutor = this.form.value

            this.apiService.endpoint = accessType.typePrivate + senseiEndpoints.guardarInfoMultimediaTutor
            this.apiService.saveObject(this.infoMultimediaTutor).subscribe({
                next: data => {
                    if (data.codigoRespuestaValue == 200) {
                        if (!this.infoMultimediaTutor.idMultimediaTutor) {
                            this.appService.msgCreate()
                        } else {
                            this.appService.msgUpdate()
                        }

                        this.cargarListaInfoMultimediaTutor()

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


