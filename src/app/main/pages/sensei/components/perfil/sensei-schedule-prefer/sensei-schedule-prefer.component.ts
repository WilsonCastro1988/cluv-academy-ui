import {Component, OnInit} from '@angular/core';
import {HorarioSugeridoTutorDto} from "../../../../../../_model/academy/HorarioSugeridoTutorDto";
import {TokenService} from "../../../../../../_service/token.service";
import {ApiService} from "../../../../../../_service/api.service";
import {AppService} from "../../../../../../_service/app.service";
import {TutorDto} from "../../../../../../_model/academy/TutorDto";
import {accessType, severities} from "../../../../../../_enums/constDomain";
import {senseiEndpoints} from "../../../services/endpoints-sensei";
import {ResponseGenerico} from "../../../../../../_dto/response-generico";

@Component({
    selector: 'app-sensei-schedule-prefer',
    templateUrl: './sensei-schedule-prefer.component.html',
    styleUrls: ['./sensei-schedule-prefer.component.scss']
})
export class SenseiSchedulePreferComponent implements OnInit {

    lstHorariosInput: HorarioSugeridoTutorDto[];
    tutor: TutorDto = new TutorDto();

    blockingui: boolean = false;
    loading: boolean = false;


    constructor(private tokenService: TokenService,
                private apiService: ApiService,
                private appService: AppService,) {
    }

    ngOnInit(): void {
        this.cargarDatos()
    }

    cargarDatos() {
        this.cargarTutor(this.tokenService.getCurrentUser())
        this.appService.obtenerDatos().subscribe({
            next: data => {
                this.cargarTutor(data.nombreUsuario)
            }, complete: () => {
            }, error: error => {
                console.log('ERROR GET: ', error)
            }
        });
    }

    cargarTutor(usuario) {
        this.apiService.endpoint = accessType.typePrivate + senseiEndpoints.buscarTutorPorIdUsuario
        this.apiService.getById(usuario).subscribe({
            next: data => {
                if(data.objeto !== null) {
                    let responseGenerico: ResponseGenerico = data
                    this.tutor = responseGenerico.objeto
                    this.cargarHorarioSugeridoTutor(this.tutor.idTutor)
                }

            },
            error: error => {
                console.log('ERROR GET: ', error)
            }
        })
    }

    cargarHorarioSugeridoTutor(item) {
        this.loading = true
        this.apiService.endpoint = accessType.typePrivate + senseiEndpoints.findHorarioSugeridoByIdTutor
        this.apiService.getById(item).subscribe({
            next: data => {
                let responseGenerico: ResponseGenerico = data
                this.lstHorariosInput = responseGenerico.listado

                this.loading = false

                if (responseGenerico.codigoRespuestaValue == 404) {
                    this.cargarHorarioDefault()
                }

            }
        })
    }

    cargarHorarioDefault() {

        this.lstHorariosInput = new Array();

        for (let index = 0; index < 23; index++) {
            let horario: HorarioSugeridoTutorDto = new HorarioSugeridoTutorDto();

            let inicioHora = `${index.toString().padStart(2, '0')}:00:00`;
            let finHora = `${(index + 1).toString().padStart(2, '0')}:00:00`;

            horario.inicioHorarioSugeridoTutor = inicioHora;
            horario.finHorarioSugeridoTutor = finHora;


            horario.lunesHorarioSugeridoTutor = false;
            horario.martesHorarioSugeridoTutor = false;
            horario.miercoles = false;
            horario.juevesHorarioSugeridoTutor = false;
            horario.viernesHorarioSugeridoTutor = false;
            horario.sabadoHorarioSugeridoTutor = false;
            horario.domingoHorarioSugeridoTutor = false;
            horario.activoHorarioSugeridoTutor = false;
            horario.idTutorDto = this.tutor;

            this.lstHorariosInput.push(horario)
        }

        this.loading = false

    }

    transformDate(item, campo){
        const fecha = new Date();
        const horaString = item[campo];
        const [hora, minutos, segundos] = horaString.split(":"); // Dividir la cadena en partes
        fecha.setHours(parseInt(hora, 10), parseInt(minutos, 10), parseInt(segundos, 10));
        return fecha
    }

    guardar() {
        this.loading = true
        try {
            this.apiService.endpoint = accessType.typePrivate + senseiEndpoints.guardarHorarioSugeridoTutor
            let responseGenerico: ResponseGenerico;
            let index = 0;
            this.lstHorariosInput.forEach(item => {

                item.inicioHorarioSugeridoTutor = this.transformDate(item, 'inicioHorarioSugeridoTutor')
                item.finHorarioSugeridoTutor = this.transformDate(item, 'finHorarioSugeridoTutor')

                this.apiService.saveObject(item).subscribe({
                    next: data => {
                        responseGenerico = data
                        index ++;
                        if(index >= this.lstHorariosInput.length) {
                            if (responseGenerico.codigoRespuestaValue == 200) {
                                this.appService.msgCreate()
                                this.lstHorariosInput = new Array()
                                this.cargarDatos()
                            }
                        }
                    },
                    error: error => {
                        this.appService.msgInfoDetail(severities.ERROR, 'Error', 'Ha ocurrido un error, ' + error.error)
                    }
                })
            })

        } catch (e) {
            this.appService.msgInfoDetail(severities.ERROR, 'Error', 'Ha ocurrido un error, ' + e.message)
        }

    }

    toggleDia(hora: any, dia: string) {
        hora[dia] = !hora[dia];
    }

    cancelar() {
        this.cargarDatos()
    }


}
