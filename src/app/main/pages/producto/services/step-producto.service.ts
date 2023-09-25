import {EventEmitter, Injectable, Output} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class StepProductoService {

    @Output() _methodToCall = new EventEmitter();

    data = {
        producto: null,
        clase: null,
        materia: null
    }

    orden = {
        carrito:null,
        factura:null,
        pago:null
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
        this.servicioSubjectComplete.next(this.data.producto);
    }
}
