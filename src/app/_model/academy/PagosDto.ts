import {FacturaDto} from "./FacturaDto";
import {TipoPagoDto} from "./TipoPagoDto";

export class PagosDto {
    idPago: number;
    montoPago: number;
    saldoPago: number;
    comprobantePago: string;
    activoPago: boolean;
    idFacturaDto: FacturaDto;
    idTipoPagoDto: TipoPagoDto;
}
