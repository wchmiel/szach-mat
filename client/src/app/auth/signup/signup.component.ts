import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as AuthActions from '../store/auth.actions';
import * as fromApp from '../../store/app.reducers';
import { UserDatas } from '../../models/user-datas.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    // declaration of signup Form
    this.signupForm = new FormGroup({
      'nick': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'passFields': new FormGroup({
        'password': new FormControl(null, [Validators.required, this.passwordLengthValidator]),
        'conf_password': new FormControl(null, [Validators.required, this.passwordLengthValidator])
      }, this.passwordMatchValidator)
    });
  }

  onSubmit() {
    const newUser: UserDatas = {
      nick: this.signupForm.value['nick'],
      email: this.signupForm.value['email'],
      password: this.signupForm.value.passFields['password']
    };
    this.store.dispatch(new AuthActions.TrySignup(newUser));
  }

  passwordLengthValidator(control: FormControl): {[s: string]: boolean} {
    if (control.value && (control.value.length < 6)) {
      return {'passwordLength': true};
    }
    return null;
  }

  passwordMatchValidator(group: FormGroup): {[s: string]: boolean} {
    if (group.get('password').value !== group.get('conf_password').value) {
      return {'passwordMismatch': true};
    }
    return null;
  }

}
