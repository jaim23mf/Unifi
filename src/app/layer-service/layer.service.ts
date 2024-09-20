import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError,Observable ,of } from 'rxjs';
import { configData } from 'src/url-config';
import { LayerJson, Layers } from '../models/layer_model';

@Injectable({
  providedIn: 'root'
})
export class LayerService {

  constructor(private http:HttpClient) { }

  getAll():Observable<Layers>{
    return this.http.get<Layers>(configData.api_swagger+"/layer/all");
  }

  getLayerInfo(name:string):Observable<any>{
    return this.http.get(configData.api_swagger+"/layer/resource?layerName="+name);
  }

  postDataStore(file:File,info:LayerJson):Observable<any>{
    const formData = new FormData();
    formData.append('DataStoreFile', file);
    //formData.append("CoverageStoreInfo",JSON.stringify(info));
    formData.append('DataStoreInfo.WorkspaceName',info.workspace);
    formData.append('DataStoreInfo.Store',info.name);
    formData.append('DataStoreInfo.LayerNewTitle',info.title);
    formData.append('DataStoreInfo.LayerNewAbstract',info.description);
  
    if(info.styles.length>0){
      info.styles.forEach(s=>{
        formData.append('DataStoreInfo.Styles','{"href":"'+s.href+'","name":"'+s.name+'"}');
      });

      formData.append('DataStoreInfo.DefaultStyle.Name',info.styles[0].name);
      formData.append('DataStoreInfo.DefaultStyle.Href',info.styles[0].href);
    }
    else{
      formData.append('DataStoreInfo.DefaultStyle.Name','');
      formData.append('DataStoreInfo.DefaultStyle.Href','');
    }
    return this.http.post<Layers>(configData.api_swagger+"/datastore",formData).pipe(catchError(this.handleError('style error',"error")));;
  }
  postCoverageStore(file:File,info:LayerJson):Observable<any>{


    const formData = new FormData();
    formData.append('CoverageStoreLayerFile', file);
    //formData.append("CoverageStoreInfo",JSON.stringify(info));
    formData.append('CoverageStoreInfo.WorkspaceName',info.workspace);
    formData.append('CoverageStoreInfo.Store',info.name);
    formData.append('CoverageStoreInfo.LayerNewTitle',info.title);
    formData.append('CoverageStoreInfo.LayerNewAbstract',info.description);
    
    if(info.styles.length>0){
      info.styles.forEach(s=>{
        formData.append('CoverageStoreInfo.Styles','{"href":"'+s.href+'","name":"'+s.name+'"}');
      });
      formData.append('CoverageStoreInfo.DefaultStyle.Name',info.styles[0].name);
      formData.append('CoverageStoreInfo.DefaultStyle.Href',info.styles[0].href);
    }
    else{
      formData.append('CoverageStoreInfo.DefaultStyle.Name','');
      formData.append('CoverageStoreInfo.DefaultStyle.Href','');
    }
    return this.http.post<Layers>(configData.api_swagger+"/coveragestore",formData).pipe(catchError(this.handleError('style error',"error")));;
  }


  /*setStyle(file:File):Observable<any>{
    const formData = new FormData();

    formData.append("fileRequest", file);
    return this.http.post<Styles>(api_swagger+"/styles/file",formData).pipe(catchError(this.handleError('style error',"error")));

  }*/

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
   
      console.error(error.message); 

      return of(error.message as T);
    };
  }
}
