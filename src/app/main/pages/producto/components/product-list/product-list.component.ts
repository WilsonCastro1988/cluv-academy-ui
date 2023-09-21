import {Component, OnInit} from '@angular/core';
import {accessType} from "../../../../../_enums/constDomain";
import {claseEndpoints} from "../../../landing/services/endpoints-landing";
import {ApiService} from "../../../../../_service/api.service";
import {ClaseLandingDto} from "../../../landing/dto/ClaseLandingDto";
import {StepProductoService} from "../../services/step-producto.service";
import {Router} from "@angular/router";
import {ResponseGenerico} from "../../../../../_dto/response-generico";

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

    constructor(private readonly stepService: StepProductoService,
                private readonly routeService: Router,
                private readonly apiService: ApiService,) {
    }

    listClases: ClaseLandingDto[] = [];


    ngOnInit(): void {
        this.llenarListaClases()

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
        this.routeService.navigate(['pages/product-detail']).then(()=>{
            this.stepService.data = ({
                producto: item
            })
            //this.stepService._methodToCall.emit('select');
        })
    }

}
