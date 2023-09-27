import {AfterViewInit, Component, OnInit} from '@angular/core';
import {StepProductoService} from "../../services/step-producto.service";
import {ApiService} from "../../../../../_service/api.service";
import {accessType} from "../../../../../_enums/constDomain";
import {productEndpoints} from "../../services/endpoints-producto";
import {ClaseDto} from "../../../../../_model/academy/ClaseDto";
import {ClaseLandingDto} from "../../../landing/dto/ClaseLandingDto";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {MateriaDto} from "../../../../../_model/academy/MateriaDto";
import {Router} from "@angular/router";
import {AppService} from "../../../../../_service/app.service";

@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

    formEvidencia: FormGroup;

    claseLanding: ClaseLandingDto = new ClaseLandingDto()
    clase: ClaseDto = new ClaseDto()
    materia: MateriaDto = new MateriaDto()


    constructor(private readonly stepService: StepProductoService,
                private readonly apiService: ApiService,
                private readonly appService: AppService,
                private readonly routeService: Router,
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

        this.apiService.endpoint = accessType.typePrivate + productEndpoints.findById

        /*this.apiService.getById(1).subscribe({
            next: data => {
                this.clase = data.objeto
                this.apiService.endpoint = accessType.typePrivate + productEndpoints.findMateriaById
                this.apiService.getById(this.clase.idMateriaDto.idMateria).subscribe({
                    next: data => {
                        this.materia = data.objeto
                    }
                })
                console.log('LISTADO DE RESEÑAS: ' + this.clase.reseniasCollectionDto.length)
            }
        })*/

        if (this.stepService.data.producto != null) {
            this.claseLanding = this.stepService.data.producto
            this.apiService.endpoint = accessType.typePrivate + productEndpoints.findById
            this.apiService.getById(this.claseLanding.idClase).subscribe({
                next: data => {
                    this.clase = data.objeto
                    this.apiService.endpoint = accessType.typePrivate + productEndpoints.findMateriaById
                    this.apiService.getById(this.clase.idMateriaDto.idMateria).subscribe({
                        next: data => {
                            this.materia = data.objeto
                        }
                    })
                }
            })

            this.formEvidencia = this.formBuilder.group(this.claseLanding);
            this.formEvidencia.controls.avatarClase.setValue(this.claseLanding.avatarClase)

            console.log('DATOS ENTRADA: ', this.formEvidencia.value)


        } else {
            this.claseLanding = new ClaseLandingDto();
            this.appService.irAProductList()
            console.log('DATOS FAIL: ')
        }
    }

    irAPago() {
        this.routeService.navigate(['pages/product-checkout']).then(() => {
            this.stepService.data = ({
                producto: this.claseLanding,
                clase: this.clase,
                materia: this.materia
            })
            //this.stepService._methodToCall.emit('select');
        })
    }


}
