import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  userList(filterOptions: object): Observable<any> {
    return this.http.post('User/GetList', filterOptions);
  }

  updateStatus(data) {
    return this.http.post('User/UpdateStatus', data);
  }

  deleteUser(data) {
    return this.http.post('User/Delete', data);
  }
}
