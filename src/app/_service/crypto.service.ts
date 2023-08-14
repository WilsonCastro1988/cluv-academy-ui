import {Injectable} from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { RSA, RSAKeyPair } from 'crypto-js';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class CryptoService {
    private keyPair: RSAKeyPair;

    private pem: string;
    //importedPublicKey: CryptoJS.AES.Key;
    importedPrivateKey: CryptoJS.AES.Key;
    importedPublicKey: RSA.Key;


    constructor(private http: HttpClient) {


    }

    encrypt(data: any) {
        //var encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), environment.publicpem);
        var encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), environment.publicpem).toString();

        console.log('encrypt data', encryptedData)

        const decrypted = CryptoJS.AES.decrypt(encryptedData, environment.publicpem);
        const decriptedOriginal = decrypted.toString(CryptoJS.enc.Utf8);

        console.log('desencryt data', decriptedOriginal)
        return encryptedData
    }

    decrypt(encryptedData: string) {
        return JSON.parse(CryptoJS.AES.decrypt(encryptedData, environment.privatepem).toString());
    }

}
