import {EstadoFacturaDto} from "./EstadoFacturaDto";

export class FacturaDto {
    idFactura: number;
    dniFactura: string;
    direccionFactura: string;
    nombreFactura: string;
    telefonoFactura: string;
    subtotalFactura: number;
    ivaFactura: number;
    descuentoFactura: number;
    recargoFactura: number;
    totalFactura: number;
    activoFactura: boolean;
    idEstadoFacturaDto: EstadoFacturaDto;
    pagosCollectionDto: any[];
    carritoComprasCollectionDto: any[];
}
