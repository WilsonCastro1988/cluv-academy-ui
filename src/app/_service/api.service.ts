import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(private http: HttpClient) {
    }

    url = `${environment.HOST}/`;
    endpoint: string;

    getAll(): Observable<any> {
        return this.http.get(this.url + this.endpoint);
    }

    getById(key): Observable<any> {
        return this.http.get(this.url + this.endpoint + key);
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
}
