import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProject } from '../models/iproject';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor(private _http: HttpClient) { };

  apiURL = "http://localhost:3000/api/projects";
  _retreiveProject(){

   return this._http.get<IProject>(this.apiURL);
  }

   _addNewProject(newProject:FormData) {
      return this._http.post<IProject>(this.apiURL,newProject);
  }
  
      _updateProject(updatedProject: FormData, id: string) {
        return this._http.put<IProject>(`${this.apiURL}/${id}`, updatedProject);
    }
      _deleteProject(id: string) {
        return this._http.delete<IProject>(`${this.apiURL}/${id}`);
      }
    
  
}
