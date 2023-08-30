import {EstadoHorarioDto} from "./EstadoHorarioDto";
import {DiasHorarioDto} from "./DiasHorarioDto";
import {HorasHorarioDto} from "./HorasHorarioDto";
import {HorarioPKDto} from "./HorarioPKDto";

export class HorarioDto {
    horarioPKDto: HorarioPKDto;
    cantClubsHorario: number;
    cantEstudiantesHorario: number;
    cantTutoresHorario: number;
    activoHorario: boolean;
    diasHorariosDto: DiasHorarioDto;
    idEstadoHorarioDto: EstadoHorarioDto;
    horasHorarioDto: HorasHorarioDto;
    claseCollectionDto: any[];
}
