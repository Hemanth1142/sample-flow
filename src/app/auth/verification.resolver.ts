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
import { CoreService } from 'app/core/core.service';

@Injectable()
export class VerificationResolver implements Resolve<any> {
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
    if (route.params.code) {
      params = route.params.code;
    }
    return this.http.get(`${api}${params}`).pipe(
      map((res: any) => {
        return { res, code: params };
      })
    );
  }
}
