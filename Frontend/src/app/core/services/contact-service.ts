import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IContact } from '../models/icontact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor(private _http: HttpClient) { };
  apiURL = "http://localhost:3000/api/contact";
  retrieveContact() {
      return this._http.get<IContact[]>(this.apiURL);
  }
  _addContact(newContact: IContact) {
      return this._http.post<IContact>(this.apiURL, newContact);
    }
    _updateContact(updatedContact: IContact, id: string) {
      return this._http.put<IContact>(`${this.apiURL}/${id}`, updatedContact);
    }
    _deleteContact(id: string) {
      return this._http.delete<IContact>(`${this.apiURL}/${id}`);
    }
}
