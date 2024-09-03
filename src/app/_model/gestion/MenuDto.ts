import {AutorizacionDto} from "./AutorizacionDto";
import {AplicacionDto} from "./AplicacionDto";

export class MenuDto {

    idMenu: number;
    nombre: string;
    descripcion: string;
    url: string;
    orden: number
    activo: string;
    tipo: string;
    autorizacionListDto: AutorizacionDto[] = [];
    idAplicacionDto: AplicacionDto;
    menuListDto: MenuDto[] = [];
    idMenuPadreDto: MenuDto;

    constructor() {
    }
}
