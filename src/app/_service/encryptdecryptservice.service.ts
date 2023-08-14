import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class EncryptDecryptService {
    private key = 'desarrollo2023**';
    private iv = '1203199320052021';
    constructor() {}
    // Methods for the encrypt and decrypt Using AES
    encryptUsingAES256(text): any {
        let dataJson = JSON.stringify(text);
        var encryptedData = CryptoJS.AES.encrypt(dataJson, this.key).toString();

        return encryptedData;
    }
    decryptUsingAES256(decString) {
        var key = CryptoJS.enc.Utf8.parse(this.key);
        var iv = CryptoJS.enc.Utf8.parse(this.iv);


        /*-- Decryption --*/
        var decrypted = CryptoJS.AES.decrypt(decString, key, {
            keySize: 128 / 8,
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });

        return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
    }

}
