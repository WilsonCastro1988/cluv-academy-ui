import {EventEmitter, Injectable, Output} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class SenseiAuxService {

    @Output() _methodToCall = new EventEmitter();

    servicioData = {
        usuarioDto: null,
    }


    constructor() {
    }


    private servicioSubjectComplete = new Subject<any>();

    servicioSubjectComplete$ = this.servicioSubjectComplete.asObservable();

    setMethodToCall(value) {
        this._methodToCall.emit(value);
    }

    getMethodToCall() {
        return this._methodToCall;
    }

    complete() {
        this.servicioSubjectComplete.next(this.servicioData.usuarioDto);
    }
}
