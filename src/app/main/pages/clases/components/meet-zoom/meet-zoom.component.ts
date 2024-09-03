import {AfterViewInit, Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import ZoomMtgEmbedded from '@zoom/meetingsdk/embedded'
//import ZoomMtgEmbedded from "@zoomus/websdk/embedded"
/*import { ZoomMtg } from '@zoom/meetingsdk';
ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();
 */

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
                        isResizable: true,
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
                    }
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

    /*
        startMeeting() {

            document.getElementById('zmmtg-root').style.display = 'block'
            let signature = this.appService.generateSigantureMeetZoom(this.signature)

            ZoomMtg.init({
                debug: true,
                leaveUrl: "http://localhost:4200", //redirect url after meeting end
                isSupportAV: true,
                isSupportChat: true,
                sharingMode: 'both',
                screenShare: true,
                videoHeader: true,
                success: (success) => {
                    console.log(success)

                    ZoomMtg.join({
                        sdkKey: 'WM9nngfDRJuk8Ar9FpvhTQ',
                        signature: signature,
                        meetingNumber: '74753630064',
                        passWord: 'EX3qui',
                        userName: 'PAGINA WILL 5 horas + 1 Coronita',// password optional; set by Host
                        success: (success) => {
                            console.log(success)
                        },
                        error: (error) => {
                            console.log(error)
                        }
                    })

                },
                error: (error) => {
                    console.log(error)
                }
            })
        }
    */

    leaveMeet() {
        this.client.endMeeting().then(() => {
            this.routeService.navigate(['/pages/dashboard'])
        })
    }

    ngOnDestroy(): void {
        //this.client.endMeeting()
        //ZoomMtgEmbedded.destroyClient()
        this.subscription.unsubscribe()
    }


}
