import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { configData} from 'src/url-config';
import { Buffer } from 'buffer';
@Injectable({
  providedIn: 'root'
})
export class GeoserverService {

  constructor(private http:HttpClient) { }

 /* getPrivateList(){


    const token = Buffer.from(data.geo_user+`:`+data.geo_pass, 'utf8').toString('base64');

    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json; charset=utf-8')
    .set('Authorization', 'Basic ' + token);

    return this.http.get(data.geoserver_list_private, {headers:headers} );
  }*/
  /*async getPublicList(){
    const response = await fetch(data.geoserver_list_public);
    return response.ok ? (await response.json()) : null;
  }*/


}
