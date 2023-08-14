import {Injectable} from "@angular/core";
import {
    HTTP_INTERCEPTORS,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpParams,
    HttpRequest
} from "@angular/common/http";
import {Observable} from "rxjs";
import * as CryptoJS from 'crypto-js';
import {GeneralInterceptor} from "./general.interceptor";
import {EncryptDecryptService} from "../_service/encryptdecryptservice.service";


@Injectable()
export class EncryptionInterceptor implements HttpInterceptor {
    private dateRegex: RegExp = /^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)$/;

    constructor(private readonly encryptDecryptService: EncryptDecryptService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.method === 'POST') {
            const encryptedData = this.encryptDecryptService.encryptUsingAES256(this.convertDates(req.body))
            const modifiedReq = req.clone({body: {data: encryptedData}});
            return next.handle(modifiedReq);
        } else if (req.method === 'GET') {
            // Encriptar los parámetros en la URL antes de enviar la solicitud GET
            const url = new URL(req.url);

            // Obtener los valores después de la URL
            const pathSegments = url.pathname.split('/');
            const values = pathSegments.slice(1); // Ignorar el primer segmento que es vacío

            let encryptedValues = values.map(value => this.encryptDecryptService.encryptUsingAES256(value).replaceAll('/', 'DSIEPN'));

            const modifiedUrl = url.origin + '/' + encryptedValues.join('/');

            const modifiedReq = req.clone({ url: modifiedUrl });
            return next.handle(modifiedReq);
        } else {
            return next.handle(req);
        }
    }

    private convertDates(object: Object) {
        if (object instanceof Object) {
            let dateRegex = this.dateRegex;

            return JSON.parse(JSON.stringify(object), function(key, value) {
                if (typeof value === 'string' && dateRegex.test(value)) {
                    return new Date(value);
                }

                return value;
            });
        }
    }

    encryptParams(params: HttpParams): HttpParams {
        let encryptedParams = new HttpParams();
        params.keys().forEach(key => {
            const value = params.get(key);
            const encryptedValue = this.encryptDecryptService.encryptUsingAES256(value);
            encryptedParams = encryptedParams.set(key, encryptedValue);
        });
        return encryptedParams;
    }
}

export const encryptionInterceptor = [{provide: HTTP_INTERCEPTORS, useClass: EncryptionInterceptor, multi: true}];

