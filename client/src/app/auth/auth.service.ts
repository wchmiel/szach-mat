import { Injectable } from '@angular/core';
import * as moment from 'moment';
import * as AuthActions from './store/auth.actions';
import * as fromApp from '../store/app.reducers';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthService {

  private idTokenKey = 'sz_id_token';
  private tokenExpiresAtKey = 'sz_expires_at';

  constructor(private store: Store<fromApp.AppState>) {}

  public login(tokenData: {idToken: string, expiresIn: number}) {
    return this.setSession(tokenData); // return true when token saved in localstorage
  }

  public logout() {
    this.destroySession();
  }

  private setSession(authResult: {idToken: string, expiresIn: number}) {
    try {
      const expiresAt = moment().add(authResult.expiresIn, 'second');

      // setting token to local storage
      localStorage.setItem(this.idTokenKey, authResult.idToken);
      localStorage.setItem(this.tokenExpiresAtKey, JSON.stringify(expiresAt.valueOf()));
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  private destroySession() {
    try {
      localStorage.removeItem(this.idTokenKey);
      localStorage.removeItem(this.tokenExpiresAtKey);
    } catch (error) {
      console.log(error);
    }
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  public isLoggedOut() {
     return !this.isLoggedIn();
  }

  private getExpiration() {
    const expiration = localStorage.getItem(this.tokenExpiresAtKey);
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  public getToken() {
    return localStorage.getItem(this.idTokenKey);
  }

  public isUserAuthenticated() {
    console.log('is user auth check from service!');
    this.store.dispatch(new AuthActions.CheckAuthentication());
    this.store.select('auth') // tutaj raczej nie mozna suskrybowac bo to bez sensu
      .subscribe((res) => {
        console.log('@@@@@@@@@@@@@@ res from sub @@@@@@@@@@');
        if (res.authenticated !== null) {
          if (res.authenticated) {
            return true;
          } else {
            return false;
          }
        }
      });
    // return new Promise((resolve, reject)
  }
}
