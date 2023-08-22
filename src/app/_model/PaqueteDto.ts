import {MateriaDto} from "./MateriaDto";
import {TipoPaqueteDto} from "./TipoPaqueteDto";

export class PaqueteDto {
    idPaquete: number;
    nombrePaquete: string;
    descripcionPaquete: string;
    costoPaquete: number;
    descuentoPaquete: number;
    totalPaquete: number;
    activoPaquete: boolean;
    idMateriaDto: MateriaDto;
    idTipoPaqueteDto: TipoPaqueteDto;
}
