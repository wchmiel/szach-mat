import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as moment from 'moment';

@Injectable()
export class AuthService {

  private idTokenKey = 'sz_id_token';
  private tokenExpiresAtKey = 'sz_expires_at';

  constructor(private http: HttpClient) {}

  public login(tokenData: {idToken: string, expiresIn: number}) {
    this.setSession(tokenData);
  }

  public logout() {
    this.destroySession();
  }

  private setSession(authResult: {idToken: string, expiresIn: number}) {
    try {
      const expiresAt = moment().add(authResult.expiresIn, 'second');

      // setting token to local storage
      localStorage.setItem(this.idTokenKey, authResult.idToken);
      localStorage.setItem(this.tokenExpiresAtKey, JSON.stringify(expiresAt.valueOf()) );
    } catch (error) {
      console.log(error);
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
}
