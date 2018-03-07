import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
// import { Angular2PromiseButtonModule } from 'angular2-promise-buttons/dist';

import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';

@NgModule({
  declarations: [
    SignupComponent,
    SigninComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule, // routes for auth module
    FormsModule,
    // Angular2PromiseButtonModule.forRoot({ // setting for spinner buttons
    //   spinnerTpl: '<span class="sz-btn-spinner"></span>',
    //   disableBtn: true,
    //   btnLoadingClass: 'sz-btn-is-loading',
    // })
  ],
  providers: [
    AuthService
  ]
})

export class AuthModule {}
