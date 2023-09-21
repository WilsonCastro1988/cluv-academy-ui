import {AfterViewInit, Component, OnInit} from '@angular/core';
import {StepProductoService} from "../../services/step-producto.service";
import {ApiService} from "../../../../../_service/api.service";
import {accessType} from "../../../../../_enums/constDomain";
import {claseEndpoints} from "../../services/endpoints-producto";
import {ClaseDto} from "../../../../../_model/academy/ClaseDto";
import {ClaseLandingDto} from "../../../landing/dto/ClaseLandingDto";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

    formEvidencia: FormGroup;

    claseLanding: ClaseLandingDto = new ClaseLandingDto()
    clase: ClaseDto = new ClaseDto()


    constructor(private readonly stepService: StepProductoService,
                private readonly apiService: ApiService,
                private formBuilder: FormBuilder) {
    }

    ngOnInit(): void {
        this.iniciarForms();

        this.verificarEmiterMovimiento()
    }

    iniciarForms() {
        console.log('EJECUTA INICIA FORMS')

        this.formEvidencia = this.formBuilder.group({
            idEvidenciasInv: new FormControl('',),
            idClase: new FormControl('',),
            nombre: new FormControl('',),
            descripcion: new FormControl('',),
            estado: new FormControl('',),
            aforo: new FormControl('',),
            reservas: new FormControl('',),
            avatarClase: new FormControl([''],),
            valoracion: new FormControl('',),
            costo: new FormControl('',),
            nombreTutor: new FormControl('',),
            avatarTutor: new FormControl('',),
            sobreMiTutor: new FormControl('',)
        });
    }

    get f() {
        return this.formEvidencia.controls;
    }


    verificarEmiterMovimiento() {
        console.log('EJECUTA VERIFICA EMITER' + this.stepService.data.producto)

        if (this.stepService.data.producto != null) {


            this.claseLanding = this.stepService.data.producto

            this.formEvidencia = this.formBuilder.group(this.claseLanding);
            this.formEvidencia.controls.avatarClase.setValue(this.claseLanding.avatarClase)

            console.log('DATOS ENTRADA: ', this.formEvidencia.value)


        } else {
            this.claseLanding = new ClaseLandingDto();
            console.log('DATOS FAIL: ')
        }
    }

}
