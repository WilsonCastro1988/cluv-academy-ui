import {ClubDto} from "./ClubDto";

export class MateriaDto {
    idMateria: number;
    nombreMateria: string;
    descripcionMateria: string;
    valoracionMateria: number;
    recursosMateria: string;
    materialesMateria: string;
    aforoReferencialMateria: number;
    costoReferencialMateria: number;
    activoMateria: boolean;
    paqueteCollectionDto: any[];
    claseCollectionDto: any[];
    silaboCollectionDto: any[];
    idClubDto: ClubDto;
}
