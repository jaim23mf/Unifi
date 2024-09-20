import { Injectable } from '@angular/core';
import { Workspaces } from '../models/worksapce_model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { configData } from 'src/url-config';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {

  constructor(private http:HttpClient) { }
  getWorkspaces():Observable<Workspaces>{
    return this.http.get<Workspaces>(configData.api_swagger+"/workspaces");
  }

}
