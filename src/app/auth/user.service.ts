import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CoreService } from '../core/core.service';

import { User } from './user.model';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {
  userInfo: User = new User();
  inventory: { menus: any[] } = { menus: [] };

  constructor(private http: HttpClient, private coreService: CoreService) {
    if (
      typeof window !== 'undefined' &&
      localStorage.getItem('app_user') !== null
    ) {
      const user = JSON.parse(localStorage.getItem('app_user') || '');
      this.userInfo = user ? user : new User();

      if (!this.loggedIn()) {
        this.coreService.navigateTo('/login');
      }
    }
  }

  storeUserInfo(res: any): void {
    // this.userInfo = {
    //   userName: res.userName,
    //   displayUserName: res.displayUserName,
    //   companyName: res.companyName,
    //   isAdmin: res.isAdmin === 'True',
    //   cultureCode: res.cultureCode
    // };
    this.userInfo = res.user.user;
    localStorage.setItem('app_token', res.access_token);
    localStorage.setItem('app_user', JSON.stringify(this.userInfo));
  }

  loggedIn(): boolean {
    let isLoggedIn = false;

    if (typeof window !== 'undefined') {
      isLoggedIn = localStorage.getItem('app_token') !== null;
    }

    return isLoggedIn;
  }

  clearUserData(): void {
    localStorage.removeItem('app_token');
    localStorage.removeItem('app_user');
    this.userInfo = new User();
  }

  getCompanyInfoView(): Observable<any> {
    return this.http.post('/api/Accounts/GetCompanyInfoView', {});
  }

  saveEmailToken(body): Observable<any> {
    return this.http.post('/api/Accounts/SaveEmailToken', body);
  }

  saveCompanyInfo(body): Observable<any> {
    return this.http.post('/api/Accounts/SaveCompanyInfo', body);
  }
}
