import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ClaseService {

    constructor(private http: HttpClient) {
    }

    itemsSource = new Subject<any>();
    itemsHandler = this.itemsSource.asObservable();

    meetData = new Subject<any>();
    meetDataHandler = this.meetData.asObservable();

    signature = new Subject<any>();
    signatureHandler = this.signature.asObservable();

    setItems(items: any) {
        this.itemsSource.next(items);
    }

    setMeetData(meetData: any) {
        this.meetData.next(meetData);
    }

    setSignature(signature: any) {
        this.signature.next(signature);
    }
}
