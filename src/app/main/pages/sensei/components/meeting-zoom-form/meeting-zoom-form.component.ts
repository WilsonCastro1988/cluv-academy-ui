import {Component, OnInit} from '@angular/core';
import {accessType, severities} from "../../../../../_enums/constDomain";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ApiService} from "../../../../../_service/api.service";
import {appZoomCredential, endpointMeeting, endpointToken, senseiEndpoints} from "../../services/endpoints-sensei";

import {AppService} from "../../../../../_service/app.service";
import {ZoomMeetingRequestDto} from "../../model/zoomMeetingRequestDto";
import {DatePipe, getLocaleDateFormat} from "@angular/common";
import {ClubDto} from "../../../../../_model/academy/ClubDto";
import {MateriaDto} from "../../../../../_model/academy/MateriaDto";
import {endpointsStudent} from "../../../student/services/endpoints-student";
import {ClaseDto} from "../../../../../_model/academy/ClaseDto";
import {productEndpoints} from "../../../producto/services/endpoints-producto";
import {TokenService} from "../../../../../_service/token.service";
import {TutorDto} from "../../../../../_model/academy/TutorDto";
import {TipoClaseDto} from "../../../../../_model/academy/TipoClaseDto";

@Component({
    selector: 'app-meeting-zoom-form',
    templateUrl: './meeting-zoom-form.component.html',
    styleUrls: ['./meeting-zoom-form.component.scss']
})
export class MeetingZoomFormComponent implements OnInit {

    classForm: FormGroup;

    tokenValue: string;
    base64String: string;
    fechaActual: Date = new Date()

    listaClub: ClubDto[] = []
    listaMateria: MateriaDto[] = []
    listaTipoClase: TipoClaseDto[] = []
    tutor: TutorDto = new TutorDto()

    meeting: ZoomMeetingRequestDto;

    meetings: ZoomMeetingRequestDto[];


    constructor(
        private apiService: ApiService,
        private appService: AppService,
        private tokenService: TokenService,
        private formBuilder: FormBuilder,
        public datepipe: DatePipe
    ) {
    }


    blockingui: boolean;

    ngOnInit(): void {
        this.initClassForm()
        this.getAllListaCluvs()
        this.cargarUsuario()
    }

    cancelar() {
        this.appService.msgInfoDetail('info', '', 'Acción Cancelada')
    }

    clean(){
        this.classForm.reset()
        this.initClassForm()
        this.getAllListaCluvs()
        this.cargarUsuario()
    }

    initClassForm() {
        this.classForm = this.formBuilder.group({
            idClase: new FormControl('',),
            nombreClase: new FormControl('',),
            descripcionClase: new FormControl('',),
            linkZoomClase: new FormControl('',),
            grabarClase: new FormControl('',),
            asistenciaClase: new FormControl('',),
            aforoClase: new FormControl('',),
            costoClase: new FormControl('0.00',),
            duracionClase: new FormControl('',),
            valoracionClase: new FormControl('',),
            recursosClase: new FormControl('',),
            materialesClase: new FormControl('',),
            fechaInicioClase: new FormControl(this.fechaActual,),
            fechaFinClase: new FormControl('',),
            recargoClase: new FormControl('0.00',),
            descuentoClase: new FormControl('0.00',),
            zonaHorariaClase: new FormControl(Intl.DateTimeFormat().resolvedOptions().timeZone,),
            startUrlClase: new FormControl('',),
            joinUrlClase: new FormControl('',),
            passwordClase: new FormControl('',),
            avatarClase: new FormControl('',),
            activoClase: new FormControl('',),
            idEstadoClaseDto: new FormControl('',),
            horarioDto: new FormControl('',),
            idMateriaDto: new FormControl('',),
            idTipoClaseDto: new FormControl('',),
            idTutorDto: new FormControl('',),
            //carritoComprasCollectionDto: any[];
            //listaAsistenciaCollectionDto: any[];
            //reseniasCollectionDto: any[];
            //foroClaseCollectionDto: any[];
        });

        this.classForm.controls.zonaHorariaClase.disable()
        this.classForm.controls.recargoClase.disable()
        this.fechaActual = new Date();
    }

    get fClass() {
        return this.classForm.controls;
    }

    getAllListaCluvs() {
        this.apiService.endpoint = accessType.typePrivate + senseiEndpoints.listarAllCluvs
        this.apiService.getAll().subscribe({
            next: data => {
                this.listaClub = data.listado
            }
        })
    }

    getAllListaByClub(event) {
        if (event.value) {
            let club: ClubDto = event.value
            this.apiService.endpoint = accessType.typePrivate + senseiEndpoints.listarAllMateriaByIdClub

            this.apiService.getById(club.idClub).subscribe({
                next: data => {
                    this.listaMateria = data.listado
                }
            })
        }
    }

    cargarUsuario() {
        this.apiService.endpoint = accessType.typePrivate + senseiEndpoints.buscarTutorPorIdUsuario
        this.apiService.getById(this.tokenService.getCurrentUser()).subscribe({
            next: data => {
                this.tutor = data.objeto
                this.fClass.idTutorDto.setValue(this.tutor)
            }
        })

        this.apiService.endpoint = accessType.typePrivate + senseiEndpoints.listarAllTipoClase
        this.apiService.getAll().subscribe({
            next: data => {
                this.listaTipoClase = data.listado
            }
        })

        this.apiService.endpoint = accessType.typePrivate + senseiEndpoints.buscarPorIdEstadoClase
        this.apiService.getById(6).subscribe({
            next: data => {
                this.fClass.idEstadoClaseDto.setValue(data.objeto)
            }
        })

        this.apiService.endpoint = accessType.typePrivate + senseiEndpoints.horarioDefault
        this.apiService.getAll().subscribe({
            next: data => {
                this.fClass.horarioDto.setValue(data.objeto)
            }
        })

    }

    crearToken() {
        this.blockingui = true
        this.apiService.endpoint = endpointToken.create;
        const formKey = appZoomCredential.accountId + '/' + appZoomCredential.clientId + '/' + appZoomCredential.clientSecret;

        this.apiService.createTokenService(formKey).subscribe((value) => {
            this.tokenValue = value.objeto.access_token;

            this.meeting = new ZoomMeetingRequestDto()
            this.meeting.topic = this.fClass.nombreClase.value;
            this.meeting.type = 2;
            this.meeting.timezone = this.fClass.zonaHorariaClase.value;
            this.meeting.duration = this.fClass.duracionClase.value;
            this.meeting.start_time = this.datepipe.transform(this.fClass.fechaInicioClase.value, 'yyyy-MM-ddTHH:mm:ssZ');

            this.apiService.endpoint = endpointMeeting.create;
            this.apiService.createMeetingOpcion(this.tokenValue, this.meeting).subscribe({
                next: data => {
                    if (data !== '') {
                        let zoomResponse = data.objeto

                        let clase: ClaseDto = new ClaseDto()
                        clase = this.classForm.value

                        clase.startUrlClase = zoomResponse.start_url
                        clase.joinUrlClase = zoomResponse.join_url
                        clase.idClase = zoomResponse.id
                        clase.passwordClase = zoomResponse.password
                        clase.zonaHorariaClase = Intl.DateTimeFormat().resolvedOptions().timeZone
                        clase.activoClase = true

                        console.log('CLASSSS: ', JSON.stringify(clase))

                        this.apiService.endpoint = accessType.typePrivate + senseiEndpoints.guardarClase

                        this.apiService.saveObject(clase).subscribe({
                            next: data => {
                                clase = data.objeto
                                console.log('CLASE ', clase)
                            },
                            complete: () => {
                                this.appService.msgInfoDetail(severities.INFO, 'CLASE', 'Creada exitosamente')
                            },
                            error: error => {
                                this.appService.msgInfoDetail(severities.ERROR, 'ERROR', 'Error al crear la clase')
                            }
                        })


                    } else {
                        this.appService.msgInfoDetail(severities.ERROR, 'ERROR', 'Ha ocurrido un error al crear El MeetingZoom')
                    }
                }, complete: () => {
                    this.appService.msgInfoDetail(severities.INFO, 'MEET', 'Creada exitosamente')
                },
                error: error => {
                    this.appService.msgInfoDetail(severities.ERROR, 'ERROR', 'Ha ocurrido un error ' + error)
                }
            });

            this.blockingui = false

        });

    }

    onFileSelected(event: any): void {
        const file = event.target.files[0];
        if (file) {
            this.convertFileToBase64(file);
        } else {
            this.base64String = ''
            //this.fClass.avatarClase.setValue('')
        }
    }

    limpiarImagen() {
        this.base64String = ''
        this.fClass.avatarClase.setValue('')

    }

    convertFileToBase64(file: File): void {
        const reader = new FileReader();

        reader.onload = () => {
            this.base64String = reader.result as string;
            this.fClass.avatarClase.setValue(this.base64String.split(',')[1]);
        };

        reader.readAsDataURL(file);
    }
}
