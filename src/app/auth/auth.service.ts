import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { CoreService } from '../core/core.service';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  constructor(
    private http: HttpClient,
    private coreService: CoreService,
    private userService: UserService
  ) { }

  login(body: any): Observable<any> {
    const options = {
      headers: new HttpHeaders().set(
        'Content-Type',
        'application/x-www-form-urlencoded'
      )
    };
    return this.http.post('/token', body, options);
  }

  getRegisterLookupList(): Observable<any> {
    return this.http.get('/api/Account/GetRegisterLookupList');
  }

  register(body: any): Observable<any> {
    return this.http.post('/api/Account/Register', body);
  }

  changePassword(body: any): Observable<any> {
    return this.http.post('/api/Account/ChangePassword', body);
  }

  resetPassword(email: string): Observable<any> {
    return this.http.post(`/api/Account/ResetPassword?email=${email}`, {});
  }

  setNewPassword(body: any): Observable<any> {
    return this.http.post('/api/Account/NewPassword', body);
  }

  logout(): void {
    this.userService.clearUserData();
    this.coreService.navigateTo('/login');
  }
}
