import {Component, OnInit} from '@angular/core';
import {accessType, severities} from "../../../../../_enums/constDomain";
import {ApiService} from "../../../../../_service/api.service";
import {Router} from "@angular/router";
import {ResponseGenerico} from "../../../../../_dto/response-generico";
import {productEndpoints} from "../../services/endpoints-producto";
import {AppService} from "../../../../../_service/app.service";
import {TokenService} from "../../../../../_service/token.service";
import {EstudianteDto} from "../../../../../_model/academy/EstudianteDto";
import {StepProductoService} from "../../services/step-producto.service";
import {ClaseLandingDto} from "../../../landing/dto/ClaseLandingDto";
import {claseEndpoints} from "../../../landing/services/endpoints-landing";

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

    estudiante: EstudianteDto = new EstudianteDto()
    blockingui: boolean = false;


    constructor(private readonly stepService: StepProductoService,
                private readonly routeService: Router,
                private tokenService: TokenService,
                private readonly appService: AppService,
                private readonly apiService: ApiService,) {
    }

    listClases: ClaseLandingDto[] = [];


    ngOnInit(): void {
        this.llenarListaClases()
        this.cargarUsuario()
    }

    cargarUsuario() {
        this.apiService.endpoint = accessType.typePrivate + productEndpoints.buscarPorNombreUsuario

        this.apiService.getById(this.tokenService.getCurrentUser()).subscribe({
            next: data => {
                this.apiService.endpoint = accessType.typePrivate + productEndpoints.buscarEstudiantePorIdUsuario
                this.apiService.getById(data.objeto.idUsuario).subscribe({
                    next: data => {
                        this.estudiante = data.objeto
                    }
                })

            }
        })
    }


    llenarListaClases() {
        this.apiService.endpoint = accessType.typePrivate + claseEndpoints.listarAllClasesLanding
        this.listClases = new Array()
        this.apiService.getAll().subscribe({
            next: data => {
                this.listClases = data.listado
            }
        })
    }

    selectProduct(item) {
        try {
            this.blockingui = true

            this.apiService.endpoint = accessType.typePrivate + productEndpoints.validarByIdClaseAndIdStudent
            this.apiService.getByTwoId(item.idClase, this.estudiante.idEstudiante).subscribe({
                next: data => {
                    if (!data.objeto) {
                        this.routeService.navigate(['pages/product-detail']).then(()=>{
                            this.stepService.data = ({
                                producto: item,
                                clase: null,
                                materia: null
                            })
                        })
                    } else {
                        this.appService.msgInfoDetail(severities.WARNING, 'CLASE', 'Usted YA se encuentra inscrito en esta Clase')
                    }

                    this.blockingui = false

                }
            })
            this.blockingui = false

        } catch (e) {
            this.appService.msgInfoDetail(severities.ERROR, 'ERROR', 'Ha ocurrido un error: ' + e)
            this.blockingui = false
        }

    }



}
