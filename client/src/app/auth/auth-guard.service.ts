import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean> | Promise<boolean> | boolean {
      // if (this.authService.isLoggedIn()) {
      //   this.authService.isUserAuthenticated();
      //   return true;
      // } else {
      //   this.router.navigate(['/signin']);
      // }
      if (this.authService.isUserAuthenticated()) {
      console.log(this.authService.isUserAuthenticated());
        return true;
      } else {
        console.log(this.authService.isUserAuthenticated());
        this.router.navigate(['/signin']);
      }
    }
}
