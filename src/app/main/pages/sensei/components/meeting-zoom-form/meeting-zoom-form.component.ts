import { Component, OnInit } from '@angular/core';
import {accessType} from "../../../../../_enums/constDomain";
import {StudentDto} from "../../../student/model/studentDto";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ZoomMeetingRequestDto} from "../../model/zoomMeetingRequestDto";
import {ApiService} from "../../../../../_service/api.service";
import {appZoomCredential, endpointMeeting, endpointToken} from "../../services/endpoints-sensei";
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-meeting-zoom-form',
  templateUrl: './meeting-zoom-form.component.html',
  styleUrls: ['./meeting-zoom-form.component.scss']
})
export class MeetingZoomFormComponent implements OnInit {



    endPoint = accessType.typePrivate

    meeting: ZoomMeetingRequestDto;

    meetings: ZoomMeetingRequestDto[];
    meetingForm: FormGroup;

    tokenValue: string;

  constructor(
      private apiService: ApiService,
      private formBuilder: FormBuilder,

      public datepipe: DatePipe

  ) { }


    inMeetingForm(): void {
        this.meetingForm = this.formBuilder.group({
            topic:'',
            type:2,
            start_time:'',
            duration:60,
            schedule_for:'',
            timezone:'America/Bogotá',
            password:'',
            agenda:'',
        });
    }


    get f() {
        return this.meetingForm.controls;
    }

    crearToken(): void {
        this.apiService.endpoint= endpointToken.create;
        const formKey=  appZoomCredential.accountId + '/' + appZoomCredential.clientId + '/' + appZoomCredential.clientSecret;



        this.apiService.createTokenService(formKey).subscribe((value) => {
            this.tokenValue = value.objeto.access_token;

            this.meeting= this.meetingForm.value;
            this.meeting.topic= this.f.topic.value;
           // this.meeting.startTime= this.f.startTime.value;
            this.meeting.duration= this.f.duration.value;
            this.meeting.start_time= this.datepipe.transform(this.f.start_time.value, 'yyyy-MM-ddTHH:mm:ssZ');


            alert(this.meeting.start_time);

            this.apiService.endpoint= endpointMeeting.create;

            this.apiService.createMeetingOpcion(this.tokenValue, this.meeting) .subscribe((val) => {



                this.apiService.msgInfoDetail('INFO', '','Datos Cargados exitosamente')

                error: error => {
                    this.apiService.msgInfoDetail( 'ERROR', '',  error.error)
                }




            });







        });
    }


    /*guardarEstudiante(): void {
        const formData = this.estudianteForm.value;
        this.apiService.endpoint = this.endPoint + endpointsStudent.guardar
        if (this.modoEdicion) {
            this.apiService
                .saveObject(formData)
                .subscribe(() => {
                    this.cargarEstudiantes();
                    this.limpiarFormulario();
                });
        } else {
            this.apiService.saveObject(formData).subscribe(() => {
                this.cargarEstudiantes();
                this.limpiarFormulario();
            });
        }
    }*/

  ngOnInit(): void {
      this.inMeetingForm();
  }


    cancelar() {
        this.meetingForm.reset();
        this.inMeetingForm();
        this.apiService.msgInfoDetail('info', '', 'Acción Cancelada')
    }

}
