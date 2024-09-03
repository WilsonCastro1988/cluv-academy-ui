import {MenuDto} from "./MenuDto";
import {PerfilDto} from "./PerfilDto";

export class AutorizacionDto {

    idAutorizacion: number;
    permisos: string;
    idMenuDto: MenuDto;
    idPerfilDto: PerfilDto;
    constructor() {
    }
}
