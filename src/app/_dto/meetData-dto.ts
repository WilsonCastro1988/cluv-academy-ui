import {ClaseDto} from "../_model/academy/ClaseDto";
import {MateriaDto} from "../_model/academy/MateriaDto";

export class MeetDataDto {

    meetingNumber: string;
    password: string;
    userName: string;
    clase: ClaseDto;
    materia: MateriaDto;
    tipo:number;
    zakToken: string;

    constructor() {
    }
}
