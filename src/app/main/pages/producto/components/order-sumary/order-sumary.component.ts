import {Component, OnInit} from '@angular/core';
import {accessType} from "../../../../../_enums/constDomain";
import {productEndpoints} from "../../services/endpoints-producto";
import {StepProductoService} from "../../services/step-producto.service";
import {ApiService} from "../../../../../_service/api.service";
import {AppService} from "../../../../../_service/app.service";
import {ClaseDto} from "../../../../../_model/academy/ClaseDto";
import {MateriaDto} from "../../../../../_model/academy/MateriaDto";
import {UsuarioDto} from "../../../../../_model/gestion/UsuarioDto";
import {EstudianteDto} from "../../../../../_model/academy/EstudianteDto";
import {FacturaDto} from "../../../../../_model/academy/FacturaDto";
import {CarritoComprasDto} from "../../../../../_model/academy/CarritoComprasDto";
import {PagosDto} from "../../../../../_model/academy/PagosDto";
import {Router} from "@angular/router";

@Component({
    selector: 'app-order-sumary',
    templateUrl: './order-sumary.component.html',
    styleUrls: ['./order-sumary.component.scss']
})
export class OrderSumaryComponent implements OnInit {

    clase: ClaseDto = new ClaseDto()
    materia: MateriaDto = new MateriaDto()
    factura: FacturaDto = new FacturaDto()
    carrito: CarritoComprasDto = new CarritoComprasDto()
    pago: PagosDto = new PagosDto()
    numOrden: string

    constructor(private readonly stepService: StepProductoService,
                private readonly apiService: ApiService,
                private readonly routeService: Router,
                private readonly appService: AppService,) {
    }

    ngOnInit(): void {
        this.verificarEmiterMovimiento()
    }

    irAOrdenPrint() {
        this.routeService.navigate(['pages/invoice']).then(() => {
            this.stepService.data = ({
                producto: null,
                clase: this.clase,
                materia: this.materia
            })

            this.stepService.orden = ({
                carrito:this.carrito,
                factura:this.factura,
                pago:this.pago
            })
        })
    }


    verificarEmiterMovimiento() {

        this.apiService.endpoint = accessType.typePrivate + productEndpoints.findById

        this.apiService.getById(1).subscribe({
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
        })

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
            console.log('DATOS FAIL: ')
        }
    }

}
