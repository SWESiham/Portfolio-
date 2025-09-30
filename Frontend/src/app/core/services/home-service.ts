import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IHome } from '../models/ihome';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private _http: HttpClient) { };

  apiURl = "http://localhost:3000/api/dashboard";

  _getInfoService() {
   return this._http.get<IHome>(this.apiURl);
  }
  _addInfoService(infoData:FormData) {
  return  this._http.post<IHome>(this.apiURl,infoData);
  }
  _updateInfoService(infoData:FormData,id:string) {
  return  this._http.put<IHome>(`${this.apiURl}/${id}`,infoData);
  }
  _deleteInfoService(id:number) {
  return  this._http.delete<IHome>(`${this.apiURl}/${id}`);
  }


}
