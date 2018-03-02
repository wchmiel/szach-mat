import { Effect, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as AuthActions from './auth.actions';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/shareReplay';
import 'rxjs/add/operator/do';
import { UserDatas } from '../../models/user-datas.model';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {

  // the action will occurs when we try to signup
  @Effect({dispatch: true})
  authSignup = this.actions$
    .ofType(AuthActions.TRY_SIGNUP)
    .map((action: AuthActions.TrySignup) => {
      return action.payload;
    })
    .map((userData: UserDatas) => {
      const headers = new HttpHeaders({'Content-Type': 'application/json'});
      return this.http.post<any>('http://localhost:3000/api/auth/signup', userData, {
        headers: headers
      }).shareReplay();
    })
    .map((data) => {
      data.subscribe((response) => {
        if (response.valid) {
          this.router.navigate(['/signin']);
          return {
            type: AuthActions.SIGNUP
          };
        } else {
            console.log(response);
          return {
            type: AuthActions.SIGNUP_ERR,
            payload: {...response}
          };
        }
        // if (response.valid) {
        //   console.log('valid!');
        // } else {
        //   console.log('invalid!');
        // }
      });
    });

  constructor(private actions$: Actions, private http: HttpClient, private router: Router) {}
}
