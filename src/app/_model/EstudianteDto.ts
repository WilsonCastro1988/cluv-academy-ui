import {EstadoEstudianteDto} from "./EstadoEstudianteDto";

export class EstudianteDto {
    idEstudiante: number;
    idUsuarioEstudiante: number;
    activoEstudiante: boolean;
    idEstadoEstudiante: EstadoEstudianteDto;
    carritoComprasCollectionDto: any[];
}
