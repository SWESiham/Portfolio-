import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IServices } from '../models/iservices';

@Injectable({
  providedIn: 'root'
})
export class Services {
  constructor(private _http: HttpClient) { };

  apiURL = "http://localhost:3000/api/services";
  _getService() {
    return this._http.get<IServices[]>(this.apiURL);
  }
  _addService(newService: FormData) {
    return this._http.post<IServices>(this.apiURL, newService);
  }
  _updateService(updatedService: FormData, id: string) {
    return this._http.put<IServices>(`${this.apiURL}/${id}`, updatedService);
  }
  _deleteService(id: string) {
    return this._http.delete<IServices>(`${this.apiURL}/${id}`);
  }




}
