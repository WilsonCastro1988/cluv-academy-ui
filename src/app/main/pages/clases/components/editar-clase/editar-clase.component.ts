import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {HorarioSugeridoTutorDto} from "../../../../../_model/academy/HorarioSugeridoTutorDto";
import {ClubDto} from "../../../../../_model/academy/ClubDto";
import {MateriaDto} from "../../../../../_model/academy/MateriaDto";
import {TipoClaseDto} from "../../../../../_model/academy/TipoClaseDto";
import {TutorDto} from "../../../../../_model/academy/TutorDto";
import {ZoomMeetingRequestDto} from "../../../sensei/model/zoomMeetingRequestDto";
import {ApiService} from "../../../../../_service/api.service";
import {AppService} from "../../../../../_service/app.service";
import {TokenService} from "../../../../../_service/token.service";
import {DatePipe} from "@angular/common";
import {accessType, severities} from "../../../../../_enums/constDomain";
import {endpointMeeting, senseiEndpoints} from "../../../sensei/services/endpoints-sensei";
import {ResponseGenerico} from "../../../../../_dto/response-generico";
import {ClaseDto} from "../../../../../_model/academy/ClaseDto";
import {MenuItem} from "primeng/api";
import {Subscription} from "rxjs";
import {ClaseService} from "../../services/clases.service";
import {endpointsClubes} from "../../../clubes/services/endpoints-clubes";
import {EstadoClaseDto} from "../../../../../_model/academy/EstadoClaseDto";
import {endpointsClases} from "../../services/endpoints-clases";
import {TutorLandingDto} from "../../../landing/dto/TutorLandingDto";
import {MeetDataDto} from "../../../../../_dto/meetData-dto";
import {Router} from "@angular/router";
import {productEndpoints} from "../../../producto/services/endpoints-producto";

@Component({
    selector: 'app-editar-clase',
    templateUrl: './editar-clase.component.html',
    styleUrls: ['./editar-clase.component.scss']
})
export class EditarClaseComponent implements OnInit {

    @Output() public emitClosePanel = new EventEmitter<any>();

    subscription: Subscription;
    classForm: FormGroup;
    tutorForm: FormGroup;

    items: MenuItem[];

    tokenValue: string;
    base64String: string;
    fechaActual: Date = new Date()

    lstHorariosInput: HorarioSugeridoTutorDto[];
    dates: Date[];
    rangeDates: Date[];

    clase: ClaseDto = new ClaseDto();
    clubDto: ClubDto = new ClubDto();
    tutor: TutorDto = new TutorDto();
    tutorLanding: TutorLandingDto = new TutorLandingDto();

    listaClub: ClubDto[] = []
    listaMateria: MateriaDto[] = []
    listaTipoClase: TipoClaseDto[] = []
    listaEstadoClase: EstadoClaseDto[] = []
    listaTutor: TutorDto[] = []
    listaTutorLanding: TutorLandingDto[] = []

    meeting: ZoomMeetingRequestDto;

    tabIndexActivated: number = 0;

    blockingui: boolean = false;
    loading: boolean = false;

    divConfiguracion: boolean = true;
    divEstructura: boolean = false;
    divRecursos: boolean = false;
    divPrecios: boolean = false;
    divRecargos: boolean = false;
    divPromociones: boolean = false;
    divHorarioFecha: boolean = false;
    divHorarioSemanal: boolean = false;
    divSensei: boolean = false;
    divMeet: boolean = false;

    constructor(
        private routeService: Router,
        private apiService: ApiService,
        private appService: AppService,
        private tokenService: TokenService,
        private formBuilder: FormBuilder,
        private claseService: ClaseService,
        public datepipe: DatePipe
    ) {
        this.subscription = claseService.itemsHandler.subscribe(response => {
            this.editItem(response)
        });
    }

    iniciarClasePorTipo(tipo) {
        this.apiService.endpoint = endpointMeeting.zakToken
        this.apiService.getAll().subscribe({
            next: data => {
                let zakToken = data.objeto
                this.iniciarMeetData(zakToken, tipo)
            },
            complete: () => {
                this.routeService.navigate(['/pages/meet'])
            }
        })
    }

    iniciarMeetData(zakToken, tipo) {
        let meetData: MeetDataDto = new MeetDataDto();
        meetData.userName = this.tokenService.getCurrentUser()
        meetData.meetingNumber = this.clase.joinIdClase
        meetData.password = this.clase.passwordClase
        meetData.clase = this.clase
        meetData.tipo = tipo === 0 ? 0 : 1;
        meetData.zakToken = zakToken

        this.apiService.endpoint = accessType.typePrivate + productEndpoints.findMateriaById
        this.apiService.getById(this.clase.idMateriaDto.idMateria).subscribe({
            next: data => {
                meetData.materia = data.objeto
                this.claseService.setMeetData(meetData)
            }
        })


    }

    ngOnInit(): void {
        this.initClassForm()
        this.initTutorForm()
        this.construirMenu()
        this.getAllListaCluvs()
        this.getAllListaTutores()
        this.getAllListaTipoClase()
        this.getAllListaEstadoClase()
    }

    construirMenu() {
        this.items = [
            {
                label: 'Clase',
                items: [
                    {
                        label: 'Configuración',
                        icon: 'pi pi-cog',
                        command: () => {
                            this.offDivs()
                            this.divConfiguracion = true;
                        }
                    },
                    {
                        label: 'Estructura',
                        icon: 'pi pi-box',
                        command: () => {
                            this.offDivs()
                            this.divEstructura = true;
                        }
                    },
                    {
                        label: 'Sensei',
                        icon: 'pi pi-user',
                        command: () => {
                            this.offDivs()
                            this.divSensei = true;
                        }
                    }
                ]
            },
            {
                label: 'Contenido',
                items: [
                    {
                        label: 'Recursos',
                        icon: 'pi pi-paperclip',
                        command: () => {
                            this.offDivs()
                            this.divRecursos = true;
                        }
                    },
                ]
            },
            {
                label: 'Costos',
                items: [
                    {
                        label: 'Precios',
                        icon: 'pi pi-dollar',
                        command: () => {
                            this.offDivs()
                            this.divPrecios = true;
                        }
                    },
                    {
                        label: 'Recargos',
                        icon: 'pi pi-ticket',
                        command: () => {
                            this.offDivs()
                            this.divRecargos = true;
                        }
                    },
                    {
                        label: 'Promociones',
                        icon: 'pi pi-tags',
                        command: () => {
                            this.offDivs()
                            this.divPromociones = true;
                        }
                    }
                ]
            },
            {
                label: 'Horarios',
                items: [
                    {
                        label: 'Horaiors Fecha',
                        icon: 'pi pi-clock',
                        command: () => {
                            this.offDivs()
                            this.divHorarioFecha = true;
                        }
                    },
                    {
                        label: 'Semanal',
                        icon: 'pi pi-calendar-plus',
                        command: () => {
                            this.offDivs()
                            this.divHorarioSemanal = true;
                        }
                    }
                ]
            },
            {
                label: 'Meeting',
                items: [
                    {
                        label: 'Zoom',
                        icon: 'pi pi-video',
                        command: () => {
                            this.offDivs()
                            this.divMeet = true;
                        }
                    }
                ]
            }
        ];
    }

    cancelar() {
        this.appService.msgInfoDetail('info', '', 'Acción Cancelada')
        this.emitClosePanel.emit(false)
    }

    offDivs() {
        this.divConfiguracion = false;
        this.divEstructura = false;
        this.divRecursos = false;
        this.divPrecios = false;
        this.divRecargos = false;
        this.divPromociones = false;
        this.divHorarioFecha = false;
        this.divHorarioSemanal = false;
        this.divSensei = false;
        this.divMeet = false;
    }

    clean() {
        this.classForm.reset()
        this.initClassForm()
        this.tutorForm.reset()
        this.initTutorForm()

        this.getAllListaCluvs()
        this.getAllListaTipoClase()
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
            fechaInicioClase: new FormControl('',),
            fechaFinClase: new FormControl('',),
            recargoClase: new FormControl('0.00',),
            descuentoClase: new FormControl('0.00',),
            zonaHorariaClase: new FormControl(Intl.DateTimeFormat().resolvedOptions().timeZone,),
            startUrlClase: new FormControl('',),
            joinUrlClase: new FormControl('',),
            passwordClase: new FormControl('',),
            avatarClase: new FormControl('',),
            activoClase: new FormControl('',),
            joinIdClase: new FormControl('',),
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

    initTutorForm() {
        this.tutorForm = this.formBuilder.group({
            nombres: new FormControl('',),
            avatar: new FormControl('',),
            sobreMi: new FormControl('',),
            idTutor: new FormControl('',),
            tutorLanding: new FormControl('',),
        });
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

    setTutorInClass(event) {
        if (event.value) {
            let tutor: TutorDto = event.value
            this.apiService.endpoint = accessType.typePrivate + senseiEndpoints.buscarTutorPorIdTutor

            this.apiService.getById(tutor.idTutor).subscribe({
                next: data => {
                    this.tutor = data.objeto
                    this.fClass.idTutorDto.setValue(this.tutor)
                    this.tutorLanding = this.listaTutorLanding.find(obj => obj.idTutor === this.tutor.idTutor)
                }
            })
        } else {

            this.appService.msgInfoDetail(severities.ERROR, 'Tutor Necesario', 'Debe escojer un Tutor')

            this.tutorLanding = this.listaTutorLanding.find(obj => obj.idTutor === this.clase.idTutorDto.idTutor)
            this.tutorForm.controls.nombres.setValue(this.tutorLanding.nombres)
            this.tutorForm.controls.avatar.setValue(this.tutorLanding.avatar)
            this.tutorForm.controls.sobreMi.setValue(this.tutorLanding.sobreMi)
            this.tutorForm.controls.idTutor.setValue(this.tutorLanding.idTutor)
            this.tutorForm.controls.tutorLanding.setValue(this.tutorLanding)

        }
    }


    getAllListaTutores() {
        this.apiService.endpoint = accessType.typePrivate + senseiEndpoints.listarAll
        this.apiService.getAll().subscribe({
            next: data => {
                this.listaTutor = data.listado
            }
        })

        this.apiService.endpoint = accessType.typePrivate + senseiEndpoints.listarAllTutoresLanding
        this.apiService.getAll().subscribe({
            next: data => {
                this.listaTutorLanding = data.listado
            }
        })
    }


    getAllListaEstadoClase() {
        this.apiService.endpoint = accessType.typePrivate + endpointsClases.listarEstadoClase
        this.apiService.getAll().subscribe({
            next: data => {
                this.listaEstadoClase = data.listado
            }
        })
    }

    getAllListaTipoClase() {
        this.apiService.endpoint = accessType.typePrivate + senseiEndpoints.listarAllTipoClase
        this.apiService.getAll().subscribe({
            next: data => {
                this.listaTipoClase = data.listado
            }
        })
    }


    getAllListaMateriasByClub() {
        this.apiService.endpoint = accessType.typePrivate + senseiEndpoints.listarAllMateriaByIdClub
        this.apiService.getById(this.clubDto.idClub).subscribe({
            next: data => {
                this.listaMateria = data.listado
                this.fClass.idMateriaDto.setValue(this.listaMateria.find(obj => obj.idMateria === this.clase.idMateriaDto.idMateria))
            }
        })
    }

    editItem(item) {
        this.clase = {...item}
        this.classForm = this.formBuilder.group(this.clase);
        //TODO: cnsultar club por materia
        this.apiService.endpoint = accessType.typePrivate + endpointsClubes.findClubByMateria
        this.apiService.getById(this.clase.idMateriaDto.idMateria).subscribe({
            next: data => {
                this.clubDto = data.objeto
                this.getAllListaMateriasByClub()
            }

        })
        //TODO: cnsultar lista de materias por club
        this.fClass.idTipoClaseDto.setValue(this.listaTipoClase.find(obj => obj.idTipoClase === this.clase.idTipoClaseDto.idTipoClase))
        this.fClass.idEstadoClaseDto.setValue(this.listaEstadoClase.find(obj => obj.idEstadoClase === this.clase.idEstadoClaseDto.idEstadoClase))
        this.fClass.idTutorDto.setValue(this.listaTutor.find(obj => obj.idTutor === this.clase.idTutorDto.idTutor))
        this.tutorLanding = this.listaTutorLanding.find(obj => obj.idTutor === this.clase.idTutorDto.idTutor)
        //this.tutorForm = this.formBuilder.group(this.tutorLanding);
        this.tutorForm.controls.nombres.setValue(this.tutorLanding.nombres)
        this.tutorForm.controls.avatar.setValue(this.tutorLanding.avatar)
        this.tutorForm.controls.sobreMi.setValue(this.tutorLanding.sobreMi)
        this.tutorForm.controls.idTutor.setValue(this.tutorLanding.idTutor)
        this.tutorForm.controls.tutorLanding.setValue(this.tutorLanding)

        let fechas: Date[] = []
        fechas.push(this.clase.fechaInicioClase)

        this.fClass.fechaInicioClase.setValue(fechas)

    }

    reprogramarClase() {
        let newClass: ClaseDto = new ClaseDto();
        let fechas: Date[] = []
        fechas = this.fClass.fechaInicioClase.value

        newClass = this.classForm.value
        newClass.fechaInicioClase = fechas[0];

        if (this.clase.fechaInicioClase === newClass.fechaInicioClase) {
            this.appService.msgInfoDetail(severities.WARNING, 'Sin Reprogramacion', 'No exitsen cambios de Horario')
            return
        }
    }

    cargarUsuario() {
        this.apiService.endpoint = accessType.typePrivate + senseiEndpoints.buscarTutorPorIdUsuario
        this.apiService.getById(this.tokenService.getCurrentUser()).subscribe({
            next: data => {
                this.tutor = data.objeto
                this.fClass.idTutorDto.setValue(this.tutor)
                this.cargarHorarioSugeridoTutor(this.tutor.idTutor)
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

    areDateListsNonOverlapping() {
        //console.log('LIST2: ', this.classForm.controls.fechaFinClass.value)
        /*
                let list1: Date[] = <Date[]>this.classForm.controls.fechaInicioClass.value
                let list2: Date[] = <Date[]>this.classForm.controls.fechaFinClass.value


                if(list1.length >0 && list2.length>0) {
                    const dateSet1 = new Set<number>();
                    const dateSet2 = new Set<number>();

                    for (let i = 0; i < list1.length; i++) {
                        const date = list1[i].getTime();
                        if (dateSet2.has(date)) {
                            // Si la fecha ya está en list2, elimina la fecha de list1 y ajusta el índice.
                            list1.splice(i, 1);
                            i--;
                        } else {
                            dateSet1.add(date);
                        }
                    }

                    for (let i = 0; i < list2.length; i++) {
                        const date = list2[i].getTime();
                        if (dateSet1.has(date)) {
                            // Si la fecha ya está en list1, elimina la fecha de list2 y ajusta el índice.
                            list2.splice(i, 1);
                            i--;
                        } else {
                            dateSet2.add(date);
                        }
                    }

                    // Si después de eliminar las fechas con cruces, ambas listas están vacías, no hubo cruces.
                    let cruce: boolean = list1.length === 0 && list2.length === 0;

                    if (cruce) {
                        this.appService.msgInfoDetail(severities.WARNING, 'CRUCE DE FECHAS', 'Verificar el cruce de fechas para continuar')
                    }
                }*/
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
                    this.appService.msgInfoDetail(severities.WARNING, 'Horario', 'No cuenta con horario preferido, diríjase a => Perfil => Horario Preferido')
                }

            }
        })
    }

    actualizarClase() {
        this.blockingui = true

        this.clase = this.classForm.value
        this.clase.fechaInicioClase = this.fClass.fechaInicioClase.value[0];
        this.clase.horarioDto = null
        this.clase.carritoComprasCollectionDto = null;
        this.clase.listaAsistenciaCollectionDto = null;
        this.clase.reseniasCollectionDto = null;
        this.clase.foroClaseCollectionDto = null;

        this.apiService.endpoint = accessType.typePrivate + endpointsClases.editar
        this.apiService.saveObject(this.clase).subscribe({
            next: data => {
                let response: ResponseGenerico = data
                if (response.codigoRespuestaValue == 200) {
                    this.appService.msgInfoDetail(severities.INFO, 'CLASE', 'Actualizada exitosamente')
                } else {
                    this.appService.msgInfoDetail(severities.WARNING, 'CLASE', 'Inconvenientes en Actualización')
                }
                this.blockingui = false
            },
            complete: () => {
                //this.appService.msgInfoDetail(severities.INFO, 'CLASE', 'Creada exitosamente')
                this.blockingui = false
            },
            error: error => {
                this.appService.msgInfoDetail(severities.ERROR, 'ERROR', 'Error al actualizar la clase')
                this.blockingui = false
            }
        })

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


