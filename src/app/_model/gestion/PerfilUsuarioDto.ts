import {PerfilDto} from "./PerfilDto";
import {UsuarioDto} from "./UsuarioDto";
import {PerfilUsuarioPKDto} from "./PerfilUsuarioPKDto";

export class PerfilUsuarioDto {

    perfilUsuarioPKDto: PerfilUsuarioPKDto;
    perfilDto: PerfilDto;
    usuarioDto: UsuarioDto;

    constructor() {
    }
}
