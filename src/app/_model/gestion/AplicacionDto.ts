import {MenuDto} from "./MenuDto";

export class AplicacionDto {

    idAplicacion: number;
    nombre: string;
    descripcion: string;
    activo: string;
    url: string;
    urlfoto: string;
    urlfotoinfo: string;
    menuListDto: MenuDto[] = [];

    constructor() {
    }
}
