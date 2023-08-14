import {Injectable} from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HTTP_INTERCEPTORS, HttpErrorResponse, HttpParams
} from '@angular/common/http';
import {BehaviorSubject, Observable, switchMap, take, throwError} from 'rxjs';
import {catchError, filter} from 'rxjs/operators';
import {AppService} from '../_service/app.service';
import {TokenService} from '../_service/token.service';
import {EncryptDecryptService} from "../_service/encryptdecryptservice.service";

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class GeneralInterceptor implements HttpInterceptor {
    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(private tokenService: TokenService,
                private appService: AppService,
                private encryptDecryptService: EncryptDecryptService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let authReq = request;
        const token = this.tokenService.getToken();
        if (token != null) {
            authReq = this.addTokenHeader(request, token);
        }

        //TODO: descomentar para encriptacion

/*
                if (authReq.method == "GET") {
                    if (authReq.url.indexOf("?") > 0) {
                        let encriptURL = authReq.url.substr(0, authReq.url.indexOf("?") + 1) + this.encryptDecryptService.encryptUsingAES256(authReq.url.substr(authReq.url.indexOf("?") + 1, authReq.url.length));
                        const cloneReq = authReq.clone({
                            url: encriptURL
                        });

                        console.log('GET PARAMS', cloneReq)


                        return next.handle(cloneReq).pipe(catchError(error => {
                            if (error instanceof HttpErrorResponse && !authReq.url.includes('api/auth/signin') && error.status === 401) {
                                return this.handle401Error(authReq, next);
                            }
                            return throwError(error);
                        }));
                    }
                    return next.handle(authReq);
                } else if (authReq.method == "POST") {
                    if (authReq.body || authReq.body.length > 0) {
                        const cloneReq = authReq.clone({
                            body: this.encryptDecryptService.encryptUsingAES256(authReq.body)
                        });

                        console.log('POST BODY', cloneReq)

                        return next.handle(cloneReq).pipe(catchError(error => {
                            if (error instanceof HttpErrorResponse && !authReq.url.includes('api/auth/signin') && error.status === 401) {
                                return this.handle401Error(authReq, next);
                            }
                            return throwError(error);
                        }));
                    }
                    let data = authReq.body as FormData;
                    return next.handle(authReq).pipe(catchError(error => {
                        if (error instanceof HttpErrorResponse && !authReq.url.includes('api/auth/signin') && error.status === 401) {
                            return this.handle401Error(authReq, next);
                        }
                        return throwError(error);
                    }));
                }


*/



        return next.handle(authReq).pipe(catchError(error => {
            if (error instanceof HttpErrorResponse && !authReq.url.includes('api/auth/signin') && error.status === 401) {
                return this.handle401Error(authReq, next);
            }
            return throwError(error);
        }));
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

    private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);
            const token = this.tokenService.getRefreshToken();
            if (token) {
                return this.appService.refreshToken(token).pipe(
                    switchMap(({accessToken}: any) => {
                        this.isRefreshing = false;
                        this.tokenService.setToken(accessToken);
                        this.refreshTokenSubject.next(accessToken);
                        return next.handle(this.addTokenHeader(request, accessToken));
                    }),
                    catchError((err) => {
                        this.isRefreshing = false;
                        this.appService.logout();
                        return throwError(err);
                    })
                );
            }
        }
        return this.refreshTokenSubject.pipe(
            filter(token => token !== null),
            take(1),
            switchMap((token) => next.handle(this.addTokenHeader(request, token)))
        );
    }

    private addTokenHeader(request: HttpRequest<any>, token: string) {
        return request.clone({headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token)});
    }
}

export const generalInterceptor = [{provide: HTTP_INTERCEPTORS, useClass: GeneralInterceptor, multi: true}];
