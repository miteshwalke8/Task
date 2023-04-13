import { throwDialogContentAlreadyAttachedError } from '@angular/cdk/dialog';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private _http: HttpClient) {}

  addUsers(data:any) {
    return this._http.post(' http://localhost:3000/users', data);
  }

  UpdateUser(id: number,data:any) {
    return this._http.put(` http://localhost:3000/users/${id}`, data);
  }

  getUsers() {
    return this._http.get(' http://localhost:3000/users');
  }
}
