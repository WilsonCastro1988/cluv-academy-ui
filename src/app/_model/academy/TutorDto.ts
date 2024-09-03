import {EstadoActividadTutorDto} from "./EstadoActividadTutorDto";
import {ClaseDto} from "./ClaseDto";

export class TutorDto {
    idTutor: number;
    especializacionTutor: string;
    habilidadesTutor: string;
    sobremiTutor: string;
    valoracionTutor: number;
    cantEstudiantesTutor: number;
    catClasesTutor: number;
    experienciaTutor: string;
    redesTutor: string;
    videoPresentacionTutor: string;
    ensenianzaTutor: string;
    curriculumTutor: string;
    metodologiaTutor: string;
    reseniasTutor: string;
    notificaEstudiantesTutor: boolean;
    notificaForoTutor: boolean;
    notificaCalificacionTutor: boolean;
    whatsappmeTutor: string;
    idUsuarioTutor: number;
    activoTutor: boolean;
    foroTutorCollectionDto: any[] = [];
    claseCollectionDto: ClaseDto[] = [];
    multimediaTutorCollectionDto: any[]= [];
    infoBancariaCollectionDto: any[]= [];
    horarioSugeridoTutorCollectionDto: any[]= [];
    infoAcademicaTutorCollectionDto: any[]= [];
    idEstadoActividadTutorDto: EstadoActividadTutorDto;
    postulacionesCollectionDto: any[]= [];
    infoDestrezasCollectionDto: any[]= [];
    calificacionTutorCollectionDto: any[]= [];
}
