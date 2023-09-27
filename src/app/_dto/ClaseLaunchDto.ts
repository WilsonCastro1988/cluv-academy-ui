export class ClaseLaunchDto {

    idClase: number;
    nombre: string;
    descripcion: string;
    estado: string;
    aforo: number;
    costo: number;
    linkZoomClase: string;
    grabarClase: boolean;
    duracionClase: number;
    fechaInicioClase: Date;
    fechaFinClase: Date;
    zonaHorariaClase: string;
    startUrlClase: string;
    joinUrlClase: string;
    joinIdClase: string;
    passwordClase: string;

    constructor() {
    }
}
