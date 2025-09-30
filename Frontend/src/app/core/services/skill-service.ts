import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISkill } from '../models/iskill';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  
  constructor(private _http: HttpClient) { };

  apiURL = "http://localhost:3000/api/skills";
  getSkills() {
    return this._http.get<ISkill[]>(this.apiURL);
  }

  _addNewSkills(newSkill:FormData) {
    return this._http.post<ISkill>(this.apiURL,newSkill);
  }
    _updateSkill(updatedSkill: FormData, id: string) {
      return this._http.put<ISkill>(`${this.apiURL}/${id}`, updatedSkill);
  }
  
    _deleteSkill(id: string) {
      return this._http.delete<ISkill>(`${this.apiURL}/${id}`);
    }
  
}
