import { Injectable } from '@angular/core';
import {
  Resolve,
  Router,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CoreService } from '../core/core.service';

@Injectable()
export class AppDataResolver implements Resolve<any> {
  constructor(
    private router: Router,
    private http: HttpClient,
    private coreService: CoreService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    let params = '';
    const api = route.data.detailApi;
    if (route.params.id) {
      params = route.params.id;
    }
    return this.http.get(`${api}${params}`).pipe(
      map((res: any) => {
        if (res && res.status) {
          return res.data;
        } else {
          this.coreService.showSnackbar(res.message, '', 'fail');
          this.coreService.navigateTo(route.data.redirectTo);
          return null;
        }
      })
    );
    return null;
  }
}
