import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import {sdkZoomCredential} from '../../services/endpoints-student';

import { ZoomMtg } from '@zoomus/websdk';




ZoomMtg.setZoomJSLib('https://source.zoom.us/2.15.2/lib', '/av');

ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();
// loads language files, also passes any error messages to the ui
ZoomMtg.i18n.load('en-US');
ZoomMtg.i18n.reload('en-US');

@Component({
    selector: 'app-meeting-form',
    templateUrl: './meeting-form.component.html',
    styleUrls: ['./meeting-form.component.scss']
})
export class MeetingFormComponent implements OnInit {
    constructor(public httpClient: HttpClient, @Inject(DOCUMENT) document) {
    }


    ngOnInit() {

    }


    getMeetingSinga(){
        ZoomMtg.generateSDKSignature({
            meetingNumber: sdkZoomCredential.meetingNumber,
            role: sdkZoomCredential.role,
            sdkKey: sdkZoomCredential.sdkKey,
            sdkSecret: sdkZoomCredential.sdkSecret,

            success(signature: any){

                document.getElementById('zmmtg-root')!.style.display = 'block';
                ZoomMtg.init({
                    leaveUrl:sdkZoomCredential.leaveUrl,

                    success(data: any){
                        ZoomMtg.join({
                            meetingNumber: sdkZoomCredential.meetingNumber,
                            passWord: sdkZoomCredential.passWord,
                            sdkKey: sdkZoomCredential.sdkKey,
                            userName: sdkZoomCredential.userName,
                            userEmail: sdkZoomCredential.userEmail,
                            signature: signature.result,
                            tk: '',

                            success(data: any){
                                console.log(data);
                            },

                            error(error: any){
                                console.log('Error señalado', error);
                            },
                        });
                    }

                });

            }, error(error2: any) {
                console.log('Error señalado', error2);
                alert(error2);

            },


        });
    }
}



