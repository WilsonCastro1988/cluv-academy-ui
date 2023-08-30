import {TutorDto} from "./TutorDto";
import {EstadoPostulacionDto} from "./EstadoPostulacionDto";

export class PostulacionesDto {
    idPostulacion: number;
    nombrePostulacion: string;
    descripcionPostulacion: string;
    fechaInicioPostulacion: Date;
    fechaFinPostulacion: Date;
    recursosPostulacion: string;
    idClubPostulacion: number;
    idMateriaPostulacion: number;
    idPaquetePostulacion: number;
    activoPostulacion: boolean;
    idEstadoPostulacionDto: EstadoPostulacionDto;
    idTutorDto: TutorDto;
}
