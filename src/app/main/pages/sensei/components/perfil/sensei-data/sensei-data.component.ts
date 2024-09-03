import {Component, OnInit} from '@angular/core';
import {accessType, severities} from "../../../../../../_enums/constDomain";
import {senseiEndpoints} from "../../../services/endpoints-sensei";
import {TokenService} from "../../../../../../_service/token.service";
import {ApiService} from "../../../../../../_service/api.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {TutorDto} from "../../../../../../_model/academy/TutorDto";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {AppService} from "../../../../../../_service/app.service";

@Component({
    selector: 'app-sensei-data',
    templateUrl: './sensei-data.component.html',
    styleUrls: ['./sensei-data.component.scss']
})
export class SenseiDataComponent implements OnInit {

    tutorForm: FormGroup;
    tutor: TutorDto = new TutorDto()

    videoUrl!: SafeResourceUrl;
    whatssMe!: SafeResourceUrl;

    urlYoutube: string
    urlFacebook: string
    urlLinkedIn: string

    base64String: string;


    constructor(private tokenService: TokenService,
                private apiService: ApiService,
                private appService: AppService,
                private formBuilder: FormBuilder,
                private _sanitizer: DomSanitizer) {
    }

    ngOnInit(): void {
        this.initForm()
        this.videoUrl = this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/w1zEJeFVGro');
        this.cargarDatos()
    }

    initForm(): void {
        this.tutorForm = this.formBuilder.group({
            idTutor: new FormControl('',),
            especializacionTutor: new FormControl('',),
            habilidadesTutor: new FormControl('',),
            sobremiTutor: new FormControl('',),
            valoracionTutor: new FormControl('',),
            cantEstudiantesTutor: new FormControl('',),
            catClasesTutor: new FormControl('',),
            experienciaTutor: new FormControl('',),
            redesTutor: new FormControl('',),
            videoPresentacionTutor: new FormControl('',),
            ensenianzaTutor: new FormControl('',),
            curriculumTutor: new FormControl('',),
            metodologiaTutor: new FormControl('',),
            reseniasTutor: new FormControl('',),
            notificaEstudiantesTutor: new FormControl('',),
            notificaForoTutor: new FormControl('',),
            notificaCalificacionTutor: new FormControl('',),
            whatsappmeTutor: new FormControl('',),
            idUsuarioTutor: new FormControl('',),
            activoTutor: new FormControl('',),
            idEstadoActividadTutorDto: new FormControl('',),

            //foroTutorCollectionDto: new FormControl('',),
            //claseCollectionDto: new FormControl([],),
            //multimediaTutorCollectionDto: new FormControl('',),
            //infoBancariaCollectionDto: new FormControl('',),
            //horarioSugeridoTutorCollectionDto: new FormControl('',),
            //infoAcademicaTutorCollectionDto: new FormControl('',),
            //postulacionesCollectionDto: new FormControl('',),
            //infoDestrezasCollectionDto: new FormControl('',),
            //calificacionTutorCollectionDto: new FormControl('',),
        });
    }

    get f() {
        return this.tutorForm.controls;
    }

    cargarUsuario(usuario) {
        this.apiService.endpoint = accessType.typePrivate + senseiEndpoints.buscarTutorPorIdUsuario
        this.apiService.getById(usuario).subscribe({
            next: data => {
                if (data.objeto != null) {
                    this.tutor = data.objeto
                    this.tutorForm = this.formBuilder.group(this.tutor);
                    this.videoUrl = this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + this.f.videoPresentacionTutor.value);
                    this.tutorForm.controls.videoPresentacionTutor.setValue(this.tutor.videoPresentacionTutor);

                    if (this.tutor.redesTutor) {
                        let redes = {
                            facebook: '',
                            linkedin: '',
                            youtube: ''
                        }

                        redes = JSON.parse(this.tutor.redesTutor)

                        this.urlLinkedIn = redes.linkedin
                        this.urlFacebook = redes.facebook
                        this.urlYoutube = redes.youtube
                    }

                }
            }
        })
    }

    cargarDatos() {
        this.cargarUsuario(this.tokenService.getCurrentUser())
        this.appService.obtenerDatos().subscribe({
            next: data => {
                this.cargarUsuario(data.nombreUsuario)
            }, complete: () => {
            }, error: error => {
                console.log('ERROR GET: ', error)
            }
        });
    }


    onFileSelected(event: any): void {
        const file = event.target.files[0];
        if (file) {
            this.convertFileToBase64(file);
        }
    }

    convertFileToBase64(file: File): void {
        const reader = new FileReader();

        reader.onload = () => {
            this.base64String = reader.result as string;
            this.tutorForm.controls.curriculumTutor.setValue(this.base64String.split(',')[1]);
        };

        reader.readAsDataURL(file);
    }

    guardar() {
        if (this.tutorForm.invalid) {
            this.appService.msgInfoDetail('warn', 'Verificación', 'Verificar los Datos a Ingresar')
            return
        } else {
            this.apiService.endpoint = accessType.typePrivate + senseiEndpoints.guardar


            this.tutor = this.tutorForm.value

            let redes = {
                facebook: this.urlFacebook,
                linkedin: this.urlLinkedIn,
                youtube: this.urlYoutube
            }

            this.tutor.redesTutor = JSON.stringify(redes)
            this.tutor.claseCollectionDto = null;
            this.tutor.multimediaTutorCollectionDto = null;
            this.tutor.infoBancariaCollectionDto = null;
            this.tutor.horarioSugeridoTutorCollectionDto = null;
            this.tutor.infoAcademicaTutorCollectionDto = null;
            this.tutor.postulacionesCollectionDto = null;
            this.tutor.infoDestrezasCollectionDto = null;
            this.tutor.calificacionTutorCollectionDto = null;

            this.apiService.saveObject(this.tutor).subscribe({
                next: data => {
                    if (data.codigoRespuestaValue == 200) {
                        this.appService.msgUpdate()
                    }
                    this.tutor = data.objeto
                },
                complete: () => {
                },
                error: error => {
                    if (error.error.codigoRespuestaValue !== 200) {
                        this.appService.msgInfoDetail(severities.WARNING, 'ERROR', error.error.codigoRespuestaValue);
                    } else {
                        this.appService.msgInfoDetail(severities.ERROR, 'ERROR', 'Ha ocurrido un error');
                    }
                },
            })

        }
    }
}
