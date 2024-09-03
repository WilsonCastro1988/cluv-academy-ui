import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ClaseDto} from "../../../../../_model/academy/ClaseDto";
import {MateriaDto} from "../../../../../_model/academy/MateriaDto";
import {FacturaDto} from "../../../../../_model/academy/FacturaDto";
import {CarritoComprasDto} from "../../../../../_model/academy/CarritoComprasDto";
import {PagosDto} from "../../../../../_model/academy/PagosDto";
import {StepProductoService} from "../../services/step-producto.service";
import {ApiService} from "../../../../../_service/api.service";
import {AppService} from "../../../../../_service/app.service";
import {accessType} from "../../../../../_enums/constDomain";
import {productEndpoints} from "../../services/endpoints-producto";
import * as es6printJS from "print-js";
import html2canvas from "html2canvas";


@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
    clase: ClaseDto = new ClaseDto()
    materia: MateriaDto = new MateriaDto()
    factura: FacturaDto = new FacturaDto()
    carrito: CarritoComprasDto = new CarritoComprasDto()
    pago: PagosDto = new PagosDto()
    numOrden: string

    constructor(private readonly stepService: StepProductoService,
                private readonly apiService: ApiService,
                private el: ElementRef,
                private readonly appService: AppService,) {
    }

    ngOnInit(): void {
        this.verificarEmiterMovimiento()
    }


    verificarEmiterMovimiento() {

        this.apiService.endpoint = accessType.typePrivate + productEndpoints.findById

        /*this.apiService.getById(1).subscribe({
            next: data => {
                this.clase = data.objeto
                this.apiService.endpoint = accessType.typePrivate + productEndpoints.findMateriaById
                this.apiService.getById(this.clase.idMateriaDto.idMateria).subscribe({
                    next: data => {
                        this.materia = data.objeto

                        let fecha = new Date(this.clase.fechaInicioClase)
                        this.numOrden = fecha.getFullYear() + '' + fecha.getMonth() + '' + fecha.getDate() + '' + this.clase.idClase + '' + this.materia.idMateria

                        this.apiService.endpoint = accessType.typePrivate + productEndpoints.buscarFacturaById
                        this.apiService.getById(4).subscribe({
                            next: data => {
                                this.factura = data.objeto
                                this.apiService.endpoint = accessType.typePrivate + productEndpoints.buscarPagoById
                                this.apiService.getById(3).subscribe({
                                    next: data => {
                                        this.pago = data.objeto
                                    }
                                })
                            }
                        })



                    }
                })
                console.log('LISTADO DE RESEÑAS: ' + this.clase.reseniasCollectionDto.length)
            }
        })*/

        if (this.stepService.orden.factura != null && this.stepService.data.clase != null) {
            this.apiService.endpoint = accessType.typePrivate + productEndpoints.findById

            this.factura = this.stepService.orden.factura
            this.pago = this.stepService.orden.pago
            this.carrito = this.stepService.orden.carrito

            this.clase = this.stepService.data.clase
            this.materia = this.stepService.data.materia

            let fecha = new Date(this.clase.fechaInicioClase)
            this.numOrden = fecha.getFullYear() + '' + fecha.getMonth() + '' + fecha.getDate() + '' + this.factura.idFactura + '' + this.carrito.idCarritoCompras + '' + this.pago.idPago
        } else {
            this.appService.irAProductList()
        }
    }


    imprimirDiv() {
        console.log({
            es6_module: es6printJS
        });
        es6printJS("divToPrint", "html" );
    }

    imprSelec(){

        const divToPrint = this.el.nativeElement.querySelector('#divToPrint'); // Reemplaza 'divToPrint' con el ID de tu <div>

        if (divToPrint) {
            html2canvas(divToPrint).then(canvas => {
                const imgData = canvas.toDataURL('image/png');

                const printWindow = window.open('', '_blank');
                printWindow.document.open();
                printWindow.document.write('<html><body>');
                printWindow.document.write('<img style="width: 100%" src="' + imgData + '" />');
                printWindow.document.write('</body></html>');
                printWindow.document.close();
                printWindow.print();
                printWindow.close();
            });
        } else {
            console.error('No se encontró el elemento a imprimir.');
        }
    }


}

