import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppService} from '../app.service';
import {environment} from '../../../environments/environment';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  constructor(private http: HttpClient, public appService: AppService,
              private sanitizer: DomSanitizer) {
  }

  url = `${environment.HOST}/`;
  endpoint = 'private/files';

  // Metodo que envia los archivos al endpoint /upload
  uploadSingleFile(file: any, proceso: string, nombre: string): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file, nombre);

    const req = new HttpRequest('POST', this.url + this.endpoint + '/uploadIndirect', formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  uploadManyFiles(fileMany: any, proceso: string): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    for (const file of fileMany) {
      formData.append('file', file, file.name);
    }


    const req = new HttpRequest('POST', this.url + this.endpoint + '/uploadIndirect', formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  // metodo para descargar por nombre
  getFileByName(fileName: string, proceso: string) {
    this.http.get(this.url + this.endpoint + '/fileByName/' + fileName + '/' + proceso, {responseType: 'blob'}).subscribe(data => {
      console.log('DATA RESPONSE: ' + JSON.stringify(data));
      const downloadURL = window.URL.createObjectURL(data);
      console.log('DATA : ' + JSON.stringify(downloadURL));
      const link = document.createElement('a');
      link.href = downloadURL;

      console.log('link.href : ' + JSON.stringify(link.href));

      link.download = fileName;
      link.click();
    }), error => {
      console.log(error);
    };
  }

    getFileByNameAsBlob(fileName: string, proceso: string):Observable<any> {
        return this.http.get(this.url + this.endpoint + '/fileByName/' + fileName + '/' + proceso, {responseType: 'blob'});
    }

  getFileByNameView(fileName: string, proceso: string): any{
    this.http.get(this.url + this.endpoint + '/fileByNameView/' + fileName + '/' + proceso, {responseType: 'blob'}).subscribe(data => {
      console.log('DATA RESPONSE: ' + JSON.stringify(data));
      const fileURL = window.URL.createObjectURL(data);

      console.log('DATA :: ', data);
      console.log(fileURL);
      return fileURL;
    }), error => {
      console.log(error);
    };
  }

  // Metodo para Obtener los archivos
  getFiles() {
    return this.http.get(this.url + this.endpoint + '/files');
  }

  // Metodo para borrar los archivos
  deleteFile(filename: string) {
    return this.http.get(this.url + this.endpoint + '/delete/' + filename);
  }

}
