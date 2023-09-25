import {Component, OnInit} from '@angular/core';
import {accessType} from "../../../../../_enums/constDomain";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ApiService} from "../../../../../_service/api.service";
import {appZoomCredential, endpointMeeting, endpointToken} from "../../services/endpoints-sensei";

import {AppService} from "../../../../../_service/app.service";
import {ZoomMeetingRequestDto} from "../../model/zoomMeetingRequestDto";
import {DatePipe, getLocaleDateFormat} from "@angular/common";

@Component({
    selector: 'app-meeting-zoom-form',
    templateUrl: './meeting-zoom-form.component.html',
    styleUrls: ['./meeting-zoom-form.component.scss']
})
export class MeetingZoomFormComponent implements OnInit {

    meetingForm: FormGroup;
    classForm: FormGroup;

    tokenValue: string;
    base64String: string;
    fechaActual:Date = new Date()

    endPoint = accessType.typePrivate

    meeting: ZoomMeetingRequestDto;

    meetings: ZoomMeetingRequestDto[];


    constructor(
        private apiService: ApiService,
        private appService: AppService,
        private formBuilder: FormBuilder,
        public datepipe: DatePipe
    ) {
    }


    blockingui: boolean;

    ngOnInit(): void {
        this.initClassForm()
    }

    cancelar() {
        this.meetingForm.reset();
        this.appService.msgInfoDetail('info', '', 'Acción Cancelada')
    }

    initClassForm() {
        this.classForm = this.formBuilder.group({
            idUsuario: new FormControl('',),
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
    }


    get f() {
        return this.meetingForm.controls;
    }

    get fClass() {
        return this.classForm.controls;
    }

    crearToken(): void {
        this.blockingui = true
        this.apiService.endpoint = endpointToken.create;
        const formKey = appZoomCredential.accountId + '/' + appZoomCredential.clientId + '/' + appZoomCredential.clientSecret;

        this.apiService.createTokenService(formKey).subscribe((value) => {
            this.tokenValue = value.objeto.access_token;

            this.meeting = this.meetingForm.value;
            this.meeting.topic = this.fClass.nombreClase.value;
            this.meeting.type = 2;
            this.meeting.timezone= this.fClass.zonaHorariaClase.value;
            this.meeting.duration = this.fClass.duracionClase.value;
            this.meeting.start_time = this.datepipe.transform(this.fClass.fechaInicioClase.value, 'yyyy-MM-ddTHH:mm:ssZ');

            alert(this.meeting.start_time);

            this.apiService.endpoint = endpointMeeting.create;
            this.apiService.createMeetingOpcion(this.tokenValue, this.meeting).subscribe((val) => {

                this.appService.msgInfoDetail('INFO', '', 'Datos Cargados exitosamente')

                this.blockingui = false;

                error => {
                    this.appService.msgInfoDetail('ERROR', '', error.error)
                    this.blockingui = false
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
