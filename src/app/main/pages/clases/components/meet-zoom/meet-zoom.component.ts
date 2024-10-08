import {AfterViewInit, Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import ZoomMtgEmbedded, {Participant, SuspensionViewType} from '@zoom/meetingsdk/embedded'

import {PrimeIcons} from "primeng/api";
import {TokenDto} from "../../../../../_dto/token-dto";
import {TokenService} from "../../../../../_service/token.service";
import {ClaseDto} from "../../../../../_model/academy/ClaseDto";
import {MateriaDto} from "../../../../../_model/academy/MateriaDto";
import {ApiService} from "../../../../../_service/api.service";
import {AppService} from "../../../../../_service/app.service";
import {SignatureDto} from "../../../../../_dto/signature-dto";
import {MeetDataDto} from "../../../../../_dto/meetData-dto";
import {ClaseService} from "../../services/clases.service";
import {Subscription} from "rxjs";
import {environment} from "../../../../../../environments/environment";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";


@Component({
    selector: 'app-meet-zoom',
    templateUrl: './meet-zoom.component.html',
    styleUrls: ['./meet-zoom.component.scss']
})
export class MeetZoomComponent implements OnInit, AfterViewInit, OnDestroy {
    subscription: Subscription;
    private readonly sdkKey = `${environment.sdkKey}`;

    meetData: MeetDataDto = new MeetDataDto();
    signature: SignatureDto = new SignatureDto();

    client = ZoomMtgEmbedded.createClient()


    events1: any[];
    imgURL
    ordenPor: any[];
    selectOrdenPor: any;
    clase: ClaseDto = new ClaseDto()
    materia: MateriaDto = new MateriaDto()


    constructor(private readonly ngZone: NgZone,
                public httpClient: HttpClient,
                private routeService: Router,
                private readonly appService: AppService,
                private readonly tokenService: TokenService,
                private readonly apiService: ApiService,
                private readonly claseService: ClaseService,
    ) {
        let token: TokenDto = JSON.parse(this.tokenService.getResponseAuth());
        this.imgURL = 'data:image/png;base64,' + token.avatar

        this.subscription = claseService.meetDataHandler.subscribe(response => {
            this.buildMeetData(response)
        });


    }

    ngOnInit(): void {
        this.events1 = [
            {
                status: 'Ordered',
                date: '15/10/2020 10:30',
                icon: PrimeIcons.SHOPPING_CART,
                color: '#9C27B0',
                image: 'epn_logo.jpg'
            },
            {status: 'Processing', date: '15/10/2020 14:00', icon: PrimeIcons.COG, color: '#673AB7'},
            {status: 'Shipped', date: '15/10/2020 16:15', icon: PrimeIcons.ENVELOPE, color: '#FF9800'},
            {status: 'Delivered', date: '16/10/2020 10:00', icon: PrimeIcons.CHECK, color: '#607D8B'}
        ];

        this.ordenPor = [
            {name: 'Por Nombre', code: '1'},
            {name: 'Últimos Agregados', code: '2'},
            {name: 'Más Comentados', code: '3'}]
    }

    ngAfterViewInit() {
        this.join()
    }

    buildMeetData(item) {
        this.meetData = {...item}
        this.clase = this.meetData.clase
        this.materia = this.meetData.materia
    }

    join() {
        let meetingSDKElement = document.getElementById('meetingSDKElement');
        this.ngZone.runOutsideAngular(() => {
            this.client.init({
                zoomAppRoot: meetingSDKElement, language: 'en-US', customize: {
                    video: {
                        isResizable: true, defaultViewType: SuspensionViewType.Gallery,
                        viewSizes: {
                            default: {
                                width: 500,
                                height: 500
                            },
                            ribbon: {
                                width: 200,
                                height: 500
                            }
                        }
                    },
                }
            }).then(() => {
                this.signature = new SignatureDto()
                this.signature.meetingNumber = this.meetData.meetingNumber
                this.signature.role = this.meetData.tipo
                let sign = this.appService.generateSigantureMeetZoom(this.signature)
                console.log('signature', sign)
                console.log('key', this.sdkKey)

                this.client.join({
                    sdkKey: this.sdkKey.trim(),
                    signature: sign,
                    meetingNumber: this.meetData.meetingNumber.trim(),
                    password: this.meetData.password.trim(),
                    userName: this.meetData.userName.trim(),
                    zak: this.meetData.zakToken.trim()
                }).then(() => {
                    console.log('joined successfully')

                    if(this.client.getAttendeeslist().length > 2){
                        //this.updateGallery()
                    }

                }).catch((error) => {
                    console.log(error)
                    console.log('SIGN ERROR: ', sign)
                })
            }).catch((error) => {
                console.log(error)
                console.log('SIGN ERROR 2: ')
            })
        })
    }

    leaveMeet() {
        this.client.endMeeting().then(() => {
            this.routeService.navigate(['/pages/listado-clases']).then(() => {
                window.location.reload();
            });
        });
    }

    updateGallery() {
        const attendees = this.client.getAttendeeslist(); // Obtiene la lista de asistentes
        const containerDiv = document.querySelector('div.css-vv0cdr'); // Selecciona el DIV

        // Limpia los elementos existentes en el div para evitar duplicaciones
        containerDiv.innerHTML = '';

        // Itera sobre los asistentes y crea nuevos elementos <div> dinámicamente
        attendees.forEach((attendee) => {
            const divItem = document.createElement('div'); // Usa div en lugar de li
            divItem.className = 'zoom-MuiListItem-root zoom-MuiListItem-gutters zoom-MuiListItem-padding css-uoiue8';

            // Añadimos el nombre del participante al aria-label
            divItem.setAttribute('aria-label', `${attendee.userName}'s Avatar`);

            // Estilos de ancho y alto fijos con position estático
            divItem.style.width = '348px !important';
            divItem.style.height = '194px !important';
            divItem.style.position = 'static !important';

            const div = document.createElement('div');
            div.className = 'zoom-MuiBox-root css-5wkdi7';

            const p = document.createElement('p');
            p.className = 'zoom-MuiTypography-root zoom-MuiTypography-body1 zoom-MuiTypography-noWrap css-75vwmk';
            p.textContent = attendee.userName || 'Participante';

            div.appendChild(p);

            if (attendee.avatar && attendee.avatar !== '') {
                // Si el participante tiene imagen, muestra la imagen
                const img = document.createElement('img');
                img.className = 'zoom-MuiCardMedia-root zoom-MuiCardMedia-media zoom-MuiCardMedia-img css-yrszp2';
                img.src = attendee.avatar;
                img.alt = `avatar of ${attendee.userName}`;
                divItem.appendChild(div);
                divItem.appendChild(img);
            } else {
                // Si no tiene imagen, muestra el nombre en un <p>
                const nameP = document.createElement('p');
                nameP.className = 'zoom-MuiTypography-root zoom-MuiTypography-body1 zoom-MuiTypography-noWrap css-1pftrv5';
                nameP.textContent = attendee.userName || 'Participante';
                divItem.appendChild(nameP);
            }

            // Añadir el divItem al div contenedor
            containerDiv.appendChild(divItem);
        });
    }






    ngOnDestroy(): void {

        ZoomMtgEmbedded.destroyClient();

        //this.client.endMeeting()
        //ZoomMtgEmbedded.destroyClient()
        this.subscription.unsubscribe()

    }


}
