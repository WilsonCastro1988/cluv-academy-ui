import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import * as CryptoJS from 'crypto-js';


const MENU = 'menuJsonApp';
const MENULAB = 'menuJsonLab';

@Injectable({
    providedIn: 'root'
})
export class MenuLightService {
    constructor(private http: HttpClient) {
    }

    url = `${environment.HOST}/`;
    endpoint: string = 'private';

    findByUsername(username): Observable<any> {
        return this.http.get(this.url + this.endpoint + '/findMenuItems/' + username);
    }

    public getMenusJson(): string {
        return sessionStorage.getItem(MENU);


    }

    public setMenusJson(menusjson): void {
        sessionStorage.setItem(MENU, JSON.stringify(menusjson));

    }

    public getMenusJsonLab(): string {
        try {
            //var menuJsonDesncrypt = this.desencrypt(sessionStorage.getItem(MENULAB))
            var menuJsonDesncrypt = sessionStorage.getItem(MENULAB)

            return sessionStorage.getItem(menuJsonDesncrypt);

        } catch (e) {
            return null;
        }
    }

    public setMenusJsonLab(menusjsonlab): void {
        try {
//            var menuJsonEncrypt = this.encrypt(menusjsonlab)
            var menuJsonEncrypt = menusjsonlab

            sessionStorage.setItem(MENULAB, menuJsonEncrypt);
        } catch (e) {
            //console.log('ERROR GETJSON', e)
        }
    }

    encrypt(data) {
        var cryptoOut = CryptoJS.AES.encrypt(JSON.stringify(data), 'epn2022**').toString();
        return cryptoOut;
    }

    desencrypt(data) {
        var bytes = CryptoJS.AES.decrypt(
            data,
            "epn2022**"
        );
        var originalText = bytes.toString(CryptoJS.enc.Utf8);
        return originalText;
    }

}
