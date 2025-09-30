import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';
import { IAbout } from '../models/iabout';

@Injectable({
  providedIn: 'root'
})
export class AboutService {
  constructor(private _http: HttpClient) { };
  
  apiExperience = "http://localhost:3000/api/experience";
  apiAbout = "http://localhost:3000/api/about";
  _retrieveData() {

    return forkJoin({
      experience: this._http.get<IAbout["experience"]>(this.apiExperience),
      about: this._http.get<IAbout["about"]>(this.apiAbout)
    });
  }  

  _retrieveAboutData() {
    return this._http.get<IAbout["about"]>(this.apiAbout);
  }  
  _retrieveExperienceData() {
    return  this._http.get<IAbout["experience"]>(this.apiExperience)
  }  

  addAboutData(newAbout:IAbout['about']) {
    return this._http.post<IAbout["about"]>(this.apiAbout, newAbout);
  }

  addExperienceData(newExperience:FormData) {
    return this._http.post<IAbout["experience"]>(this.apiExperience, newExperience);
  }

  addData(newAbout:IAbout) {
    return forkJoin({
      experience: this._http.post<IAbout["experience"]>(this.apiExperience,newAbout['experience']),
      about: this._http.post<IAbout["about"]>(this.apiAbout, newAbout['about'])
    });
  }
  UpdateAboutData(newAbout:FormData,id:string) {
    return this._http.put<IAbout["about"]>(this.apiAbout, newAbout);
  }

  UpdateExperienceData(updatedExperience:FormData,id:string) {
    return this._http.put<IAbout["experience"]>(`${this.apiExperience}/${id}`, updatedExperience);
  }
  deleteData(id:string) {
    return forkJoin({
      experience: this._http.delete<IAbout["experience"]>(`${this.apiExperience}/${id}`),
      about: this._http.delete<IAbout["about"]>(`${this.apiAbout}/${id}`)
    });
  }
  deleteExperienceData(id:string) {
    return this._http.delete<IAbout["experience"]>(`${this.apiExperience}/${id}`);

  }
}
