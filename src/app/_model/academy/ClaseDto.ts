import {TutorDto} from "./TutorDto";
import {TipoClaseDto} from "./TipoClaseDto";
import {MateriaDto} from "./MateriaDto";
import {HorarioDto} from "./HorarioDto";
import {EstadoClaseDto} from "./EstadoClaseDto";

export class ClaseDto {


    idClase: number;
    nombreClase: string;
    descripcionClase: string;
    linkZoomClase: string;
    grabarClase: boolean;
    asistenciaClase: number;
    aforoClase: number;
    costoClase: number;
    duracionClase: number;
    valoracionClase: number;
    recursosClase: string;
    materialesClase: string;
    fechaInicioClase: Date;
    fechaFinClase: Date;
    recargoClase: number;
    descuentoClase: number;
    zonaHorariaClase: string;
    startUrlClase: string;
    joinUrlClase: string;
    passwordClase: string;
    avatarClase: String;
    activoClase: boolean;
    joinIdClase: string;
    idEstadoClaseDto: EstadoClaseDto;
    horarioDto: HorarioDto;
    idMateriaDto: MateriaDto;
    idTipoClaseDto: TipoClaseDto;
    idTutorDto: TutorDto;
    carritoComprasCollectionDto: any[];
    listaAsistenciaCollectionDto: any[];
    reseniasCollectionDto: any[];
    foroClaseCollectionDto: any[];
}
