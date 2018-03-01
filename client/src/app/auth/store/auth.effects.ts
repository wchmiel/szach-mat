import { Effect, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as AuthActions from './auth.actions';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { UserDatas } from '../../models/user-datas.model';

@Injectable()
export class AuthEffects {

  // the action will occurs when we try to signup
  @Effect({ dispatch: false })
  authSignup = this.actions$
    .ofType(AuthActions.TRY_SIGNUP)
    .map((action: AuthActions.TrySignup) => {
      return action.payload;
    })
    .map((userData: UserDatas) => {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });

      return this.http.post<any>('http://localhost:3000/api/task/signup', userData, {
        headers: headers
      });
    })
    .map((data) => {
      data.subscribe((response) => {
        console.log(response);
      });
    });

  constructor(private actions$: Actions, private http: HttpClient) {}
}
