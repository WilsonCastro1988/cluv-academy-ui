import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {MenuItem, MessageService} from 'primeng/api';
import {ZoomMeetingRequestDto} from "../main/pages/sensei/model/zoomMeetingRequestDto";

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(private http: HttpClient,  private messageService: MessageService,) {
    }

    url = `${environment.HOST}/`;
    endpoint: string;

    getAll(): Observable<any> {
        return this.http.get(this.url + this.endpoint);
    }

    getById(key): Observable<any> {
        return this.http.get(this.url + this.endpoint + key);
    }

    getByTwoId(key1, key2): Observable<any> {
        return this.http.get(this.url + this.endpoint + key1 + '/' + key2);
    }

    saveObject(obj): Observable<any> {
        return this.http.post(this.url + this.endpoint, obj);
    }

    editObject(obj): Observable<any> {
        return this.http.put(this.url + this.endpoint + obj.idUser, obj);
    }

    deleteObject(key): Observable<any> {
        return this.http.delete(this.url + this.endpoint + key);
    }


    createTokenService(key): Observable<any> {
        return this.http.post(this.url + this.endpoint + key, key);
    }





    createMeetingOpcion(key, dto: ZoomMeetingRequestDto):  Observable<any> {
        let headers = new HttpHeaders();
        headers.append('content-type', 'application/json');
        headers.append('accept', 'application/json');
        return this.http.post(this.url + this.endpoint + key , dto);
    }

    msgInfoDetail(severity: string, header: string, content: string) {
        this.messageService.add({severity, summary: header, detail: content});
    }
}
