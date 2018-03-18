import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotAuthGuard } from './not-auth-guard.service';

import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

// Routes declaration for Auth Module
const authRoutes: Routes = [
  { path: 'signin', canActivate: [NotAuthGuard], component: SigninComponent },
  { path: 'signup', canActivate: [NotAuthGuard], component: SignupComponent }
];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule]
})

export class AuthRoutingModule {}
