import {Component, OnInit} from '@angular/core';
import {accessType, severities} from "../../../../../_enums/constDomain";
import {productEndpoints} from "../../services/endpoints-producto";
import {ClaseLandingDto} from "../../../landing/dto/ClaseLandingDto";
import {StepProductoService} from "../../services/step-producto.service";
import {ApiService} from "../../../../../_service/api.service";
import {Router} from "@angular/router";
import {ClaseDto} from "../../../../../_model/academy/ClaseDto";
import {MateriaDto} from "../../../../../_model/academy/MateriaDto";
import {EstudianteDto} from "../../../../../_model/academy/EstudianteDto";
import {CarritoComprasDto} from "../../../../../_model/academy/CarritoComprasDto";
import {FacturaDto} from "../../../../../_model/academy/FacturaDto";
import {UsuarioDto} from "../../../../../_model/gestion/UsuarioDto";
import {TokenService} from "../../../../../_service/token.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {customEmailValidator, customMobileValidator} from "../../../../../_validators/validators";
import {PagosDto} from "../../../../../_model/academy/PagosDto";
import {AppService} from "../../../../../_service/app.service";

@Component({
    selector: 'app-product-checkout',
    templateUrl: './product-checkout.component.html',
    styleUrls: ['./product-checkout.component.scss']
})
export class ProductCheckoutComponent implements OnInit {

    form: FormGroup;

    clase: ClaseDto = new ClaseDto()
    materia: MateriaDto = new MateriaDto()
    usuario: UsuarioDto = new UsuarioDto()
    estudiante: EstudianteDto = new EstudianteDto()

    base64String: string;
    total: number;
    aplicadoDescuento: boolean = false
    blockingui: boolean = false;


    constructor(private readonly stepService: StepProductoService,
                private readonly apiService: ApiService,
                private readonly appService: AppService,
                private tokenService: TokenService,
                private formBuilder: FormBuilder,
                private readonly routeService: Router,) {
    }

    ngOnInit(): void {
        this.iniciarForms()
        this.cargarUsuario()
        this.verificarEmiterMovimiento()
    }

    iniciarForms() {
        console.log('EJECUTA INICIA FORMS')

        this.form = this.formBuilder.group({
            correo: new FormControl('', Validators.compose([Validators.required, customEmailValidator])),
            nombre: new FormControl('', [Validators.required]),
            dni: new FormControl('', [Validators.required]),
            direccion: new FormControl('', [Validators.required]),
            telefono: new FormControl('', Validators.compose([Validators.required, customMobileValidator])),
            comprobante: new FormControl('', [Validators.required]),
            descuento: new FormControl('',)
        });
    }

    get f() {
        return this.form.controls;
    }


    cargarUsuario() {
        this.apiService.endpoint = accessType.typePrivate + productEndpoints.buscarPorNombreUsuario

        this.apiService.getById(this.tokenService.getCurrentUser()).subscribe({
            next: data => {
                this.usuario = data.objeto
                this.f.correo.setValue(this.usuario.emailPersonal)
                this.f.nombre.setValue(this.usuario.nombreUsuario)
                this.f.dni.setValue(this.usuario.cedula)
                this.f.direccion.setValue(this.usuario.direccion)
                this.f.telefono.setValue(this.usuario.telefono)


                this.apiService.endpoint = accessType.typePrivate + productEndpoints.buscarEstudiantePorIdUsuario

                this.apiService.getById(this.usuario.idUsuario).subscribe({
                    next: data => {
                        this.estudiante = data.objeto
                    }
                })

            }
        })
    }

    verificarEmiterMovimiento() {

        this.apiService.endpoint = accessType.typePrivate + productEndpoints.findById

        this.apiService.getById(1).subscribe({
            next: data => {
                this.clase = data.objeto
                if (this.clase.descuentoClase !== 0) {
                    this.f.descuento.setValue(this.clase.descuentoClase)
                } else {
                    this.f.descuento.disable()
                }
                this.aplicarSinDesceunto()
                this.apiService.endpoint = accessType.typePrivate + productEndpoints.findMateriaById
                this.apiService.getById(this.clase.idMateriaDto.idMateria).subscribe({
                    next: data => {
                        this.materia = data.objeto
                    }
                })
                console.log('LISTADO DE RESEÑAS: ' + this.clase.reseniasCollectionDto.length)
            }
        })

        if (this.stepService.data.producto != null) {
            this.apiService.endpoint = accessType.typePrivate + productEndpoints.findById

            this.clase = this.stepService.data.clase
            this.aplicarSinDesceunto()
            this.f.descuento.setValue(this.clase.descuentoClase == 0 ? '' : this.clase.descuentoClase)
            this.materia = this.stepService.data.materia
        } else {
            console.log('DATOS FAIL: ')
        }
    }

    onFileSelected(event: any): void {
        const file = event.target.files[0];
        if (file) {
            this.convertFileToBase64(file);
        }else this.base64String = ''
    }

    convertFileToBase64(file: File): void {
        const reader = new FileReader();

        reader.onload = () => {
            this.base64String = reader.result as string;
            this.f.comprobante.setValue(this.base64String.split(',')[1]);
            console.log(this.form.controls.comprobante.value);
        };

        reader.readAsDataURL(file);
    }

    aplicarDescuento() {
        this.total = (this.clase.costoClase + (this.clase.costoClase * 12 / 100)) - this.clase.descuentoClase
        this.aplicadoDescuento = true
    }

    aplicarSinDesceunto() {
        this.total = (this.clase.costoClase + (this.clase.costoClase * 12 / 100))
        this.aplicadoDescuento = false
    }

    irAListadoProductos() {
        this.routeService.navigate(['pages/product-list']).then(() => {
            this.stepService.data = ({
                producto: null,
                clase: null,
                materia: null
            })
        })
    }

    irAOrdenExitosa() {
        this.routeService.navigate(['pages/order-summary']).then(() => {
            this.stepService.data = ({
                producto: null,
                clase: this.clase,
                materia: this.materia
            })

            this.clean()
        })
    }

    procesoGuardaCompra() {
        this.blockingui = true
        /********* GUARDA FACTURA **********/
        var factura: FacturaDto = new FacturaDto()

        factura.dniFactura = this.f.dni.value
        factura.direccionFactura = this.f.direccion.value
        factura.emailFactura = this.f.correo.value
        factura.nombreFactura = this.f.nombre.value
        factura.telefonoFactura = this.f.telefono.value
        factura.subtotalFactura = this.clase.costoClase + (this.clase.costoClase * 12 / 100)
        factura.ivaFactura = this.clase.costoClase * 12 / 100
        factura.descuentoFactura = this.f.descuento.value
        factura.recargoFactura = 0;
        factura.totalFactura = this.total
        factura.activoFactura = true

        this.apiService.endpoint = accessType.typePrivate + productEndpoints.guardarFactura
        this.apiService.saveObject(factura).subscribe({
            next: data => {
                factura = data.objeto
                if (factura.idFactura != 0) {

                    /********* GUARDA PAGOS **********/
                    var pago: PagosDto = new PagosDto()

                    pago.activoPago = true
                    pago.comprobantePago = this.f.comprobante.value
                    pago.idFacturaDto = factura
                    pago.montoPago = this.total
                    pago.saldoPago = 0

                    this.apiService.endpoint = accessType.typePrivate + productEndpoints.guardarPago
                    this.apiService.saveObject(pago).subscribe({
                        next: data => {
                            pago = data.objeto
                        }
                    })

                    /********* GUARDA CARRITO COMPRAS **********/
                    var carrito: CarritoComprasDto = new CarritoComprasDto()

                    carrito.activoCarritoCompras = true
                    carrito.cantidadCarritoCompras = 1
                    carrito.descuentoCarritoCompras = this.f.descuento.value
                    carrito.idFacturaDto = factura
                    carrito.idClaseDto = this.clase
                    carrito.idEstudianteDto = this.estudiante
                    carrito.recargoCarritoCompras = 0
                    carrito.valorCarritoCompras = this.total

                    this.apiService.endpoint = accessType.typePrivate + productEndpoints.guardarCarrito
                    this.apiService.saveObject(carrito).subscribe({
                        next: data => {
                            carrito = data.objeto
                        }
                    })

                    this.appService.msgInfoDetail(severities.INFO, 'Clase', 'Clase comprada exitosamente !.')
                    this.blockingui = false

                    this.stepService.orden = ({
                        carrito:carrito,
                        factura:factura,
                        pago:pago
                    })

                    this.stepService.data =({
                        producto: null,
                        clase: this.clase,
                        materia: this.materia
                    })

                    this.irAOrdenExitosa()

                }
            }
        })
    }

    pagarProducto() {
        try {
            this.apiService.endpoint = accessType.typePrivate + productEndpoints.validarByIdClaseAndIdStudent
            this.apiService.getByTwoId(this.clase.idClase, this.estudiante.idEstudiante).subscribe({
                next: data => {
                    if (!data.objeto) {
                        this.procesoGuardaCompra()
                    } else {
                        this.appService.msgInfoDetail(severities.WARNING, 'CLASE', 'Usted YA se encuentra inscrito en la Clase: ' + this.clase.nombreClase)
                        this.irAListadoProductos()
                    }
                }
            })
        } catch (e) {
            this.appService.msgInfoDetail(severities.ERROR, 'ERROR', 'Ha ocurrido un error: ' + e)
            this.blockingui = false
        }
    }

    clean() {
        this.form.reset()
        this.clase = new ClaseDto()
        this.materia = new MateriaDto()
        this.usuario = new UsuarioDto()
        this.estudiante = new EstudianteDto()

        this.base64String = '';
        this.total = 0;
        this.aplicadoDescuento = false
        this.blockingui = false;

    }

}
