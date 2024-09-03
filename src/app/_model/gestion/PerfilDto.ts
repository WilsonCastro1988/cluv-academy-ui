import {MenuDto} from "./MenuDto";
import {AutorizacionDto} from "./AutorizacionDto";

export class PerfilDto {

    idPerfil: number;
    nombre: string;
    descripcion: string;
    activo: string;
    autorizacionListDto: AutorizacionDto[] = [];
    perfilUsuarioListDto: any[] = [];

    constructor() {
    }
}
