import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import {configData } from 'src/url-config';
import { Styles } from '../models/style_model';
import { Buffer } from 'buffer';

@Injectable({
  providedIn: 'root'
})
export class StyleService {

  constructor(private http:HttpClient) { }

  getStyles():Observable<Styles>{
    return this.http.get<Styles>(configData.api_swagger+"/styles");
  }

  getStyleInfo(url:string):Observable<any>{

    const token = Buffer.from(configData.geo_user+`:`+configData.geo_pass, 'utf8').toString('base64');

    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json; charset=utf-8')
    .set('Access-Control-Allow-Origin','*')
    .set('Accept','*/*')
    .set('Access-Control-Max-Age','600')
    .set('Authorization', 'Basic ' + token);
    //SOLO PARA DEBUG
      url= url.replace("http://geoserverdi.ettsolutions.adm","http://10.0.0.64:12092");
      console.log(url);
      //
    return this.http.get(url,{headers:headers} ).pipe(
      catchError(this.handleError('getHeroes', []))
    );
  }


  setStyle(file:File):Observable<any>{
    const formData = new FormData();

    formData.append("fileRequest", file);
    return this.http.post<Styles>(configData.api_swagger+"/styles/file",formData).pipe(catchError(this.handleError('style error',"error")));

  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
   
      console.error(error.message); 

      return of(error.message as T);
    };
  }
}
 