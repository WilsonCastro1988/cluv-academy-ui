import {ClaseDto} from "./ClaseDto";
import {EstadoCarritoComprasDto} from "./EstadoCarritoComprasDto";
import {EstudianteDto} from "./EstudianteDto";
import {FacturaDto} from "./FacturaDto";

export class CarritoComprasDto {
    idCarritoCompras: number;
    valorCarritoCompras: number;
    cantidadCarritoCompras: number;
    recargoCarritoCompras: number;
    descuentoCarritoCompras: number;
    activoCarritoCompras: boolean;
    idClaseDto: ClaseDto;
    idEstadoCarritoComprasDto: EstadoCarritoComprasDto;
    idEstudianteDto: EstudianteDto;
    idFacturaDto: FacturaDto;
}
