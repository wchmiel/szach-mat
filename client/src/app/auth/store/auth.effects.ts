import { Effect, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as AuthActions from './auth.actions';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { UserDatas } from '../../models/user-datas.model';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../auth.service';

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
        this.router.navigate(['/signin']);
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

    @Effect() authSignin$ = this.actions$
      .ofType(AuthActions.TRY_SIGNIN)
      .switchMap((action: AuthActions.TrySignin) => {
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.post<any>('http://localhost:3000/api/auth/signin', action.payload, {headers: headers});
      })
      .map((res) => {
        if (res.valid) {
          console.log('signin before: ' + this.authService.isLoggedIn());
          this.authService.login({ idToken: res.idToken, expiresIn: res.expiresIn });
          console.log('signin after: ' + this.authService.isLoggedIn());
          this.router.navigate(['/']);
          return {
            type: AuthActions.SIGNIN,
            payload: { idToken: res.idToken, expiresIn: res.expiresIn }
          };
        } else {
          return {
            type: AuthActions.SIGNIN_ERR,
            payload: res
          };
        }
      });

  constructor(private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService) {}
}
