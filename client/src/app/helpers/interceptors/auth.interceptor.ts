import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../auth/auth.service';

// INTERCEPTOR WITH TOKEN
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor (private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const idToken = this.authService.getToken(); // getting token from localStorage
    console.log('idToken: ' + idToken);

    if (idToken) {
      const copiedReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + idToken)
      });
      console.log('copiedReq:');
      console.log(copiedReq);
      return next.handle(copiedReq);
    } else {
      console.log('req:');
      console.log(req);
      return next.handle(req);
    }
  }
}
