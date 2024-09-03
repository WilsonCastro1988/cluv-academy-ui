import {Component, OnInit} from '@angular/core';
import {AppService} from "../../../_service/app.service";
import {ApiService} from "../../../_service/api.service";

import {accessType} from "../../../_enums/constDomain";
import {claseEndpoints, cluvsEndpoints, senseiEndpoints} from "./services/endpoints-landing";
import {TutorLandingDto} from "./dto/TutorLandingDto";
import {ClubLandingDto} from "./dto/ClubLandingDto";
import {ClaseLandingDto} from "./dto/ClaseLandingDto";
import {Router} from "@angular/router";
import {StepProductoService} from "../producto/services/step-producto.service";
import {ScrollService} from "../../../_service/utils/scroll-service.service";

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {


    listSenseis: TutorLandingDto[];
    listClubs: ClubLandingDto[];
    listClases: ClaseLandingDto[];

    responsiveOptions;
    dialogTerminos: boolean;

    isLoggedIn: boolean;


    constructor(private readonly serviceApp: AppService,
                private scrollService: ScrollService,
                private readonly routeService: Router,
                private readonly stepService: StepProductoService,
                private readonly apiService: ApiService,) {
        this.responsiveOptions = [
            {
                breakpoint: '1024px',
                numVisible: 3,
                numScroll: 3
            },
            {
                breakpoint: '768px',
                numVisible: 2,
                numScroll: 2
            },
            {
                breakpoint: '560px',
                numVisible: 1,
                numScroll: 1
            }
        ];

        this.scrollService.sectionClicked$.subscribe(sectionId => {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({behavior: 'smooth', block: 'start'});
            }
        });
    }

    ngOnInit(): void {
        //this.eventNavigation();

        this.llenarListaTutores()
        this.llenarListaClubs()
        this.llenarListaClases()

        this.isAutenticated()

    }

    isAutenticated() {
        if (this.serviceApp.isAuthenticated()) {
            this.isLoggedIn = true
        } else this.isLoggedIn = false
    }

    llenarListaTutores() {
        this.apiService.endpoint = accessType.typePrivate + senseiEndpoints.listarAllTutoresLanding

        this.apiService.getAll().subscribe({
            next: data => {
                this.listSenseis = data.listado
                //this.listSenseis.pop()
                //this.listSenseis.pop()


            }
        })
    }

    goToRegisterStudent() {
        this.routeService.navigate(['student-register'])
    }

    goToLogindIn() {
        if (this.isLoggedIn)
            this.routeService.navigate(['/pages/product-list'])
        else
            this.routeService.navigate(['/authentication/login']);
    }

    goToRegisterSensei() {
        this.routeService.navigate(['sensei-register'])
    }

    llenarListaClubs() {
        this.apiService.endpoint = accessType.typePrivate + cluvsEndpoints.listarAllCluvsLanding

        this.apiService.getAll().subscribe({
            next: data => {
                this.listClubs = data.listado
            }
        })
    }

    llenarListaClases() {
        this.apiService.endpoint = accessType.typePrivate + claseEndpoints.listarAllClasesLanding

        this.apiService.getAll().subscribe({
            next: data => {
                this.listClases = data.listado
            }
        })
    }


    eventNavigation(): void {
        const links = document.querySelectorAll('a[href^="#"]');

        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();

                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    targetElement.scrollIntoView({behavior: 'smooth'});
                }
            });
        });
    }

    selectProduct(item) {
        console.log('DATA BOTON AZUL')
        this.routeService.navigate(['pages/product-detail']).then(() => {
            this.stepService.data = ({
                producto: item,
                clase: null,
                materia: null
            })
        })
    }

    getClassOfIndexListSenseis(item) {
        let index = this.listSenseis.indexOf(item);
        let classBorder = ''
        if (index % 2 === 0)
            classBorder = 'tutor-card linear-gradient-to-top inline-block'
        else classBorder = 'tutor-card linear-gradient-to-bottom inline-block'

        return classBorder
    }

    getClassOfIndexListCluvs(item) {
        let index = this.listClubs.indexOf(item);
        let classBorder = ''
        if (index % 2 === 0)
            classBorder = 'cluv-card'
        else classBorder = 'cluv-card'

        return classBorder
    }

    getClassOfIndexListClases(item) {
        let index = this.listClases.indexOf(item);
        let classBorder = ''
        if (index % 2 === 0)
            classBorder = 'clases-card'
        else classBorder = 'clases-card'

        return classBorder
    }
}
