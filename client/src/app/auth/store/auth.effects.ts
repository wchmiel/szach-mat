import { Effect, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as AuthActions from './auth.actions';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/shareReplay';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { UserDatas } from '../../models/user-datas.model';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthEffects {

  // the action will occurs when we try to signup
  @Effect() authSignup$ = this.actions$
    .ofType(AuthActions.TRY_SIGNUP)
    .switchMap((action: AuthActions.TrySignup) => {
      const headers = new HttpHeaders({'Content-Type': 'application/json'});
      return this.http.post<any>('http://localhost:3000/api/auth/signup', action.payload, {headers: headers});
    })
    .map((res) => {
      if (res.valid) {
        this.router.navigate(['/signin', { srm: true}]);
        return {
          type: AuthActions.SIGNUP
        };
      } else {
        return {
          type: AuthActions.SIGNUP_ERR,
          payload: res
        };
      }
    });

  constructor(private actions$: Actions, private http: HttpClient, private router: Router) {}
}
