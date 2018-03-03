import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as AuthActions from '../store/auth.actions';
import * as fromApp from '../../store/app.reducers';
import { UserDatas } from '../../models/user-datas.model';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {
  signupForm: FormGroup;
  signupServerErr: Observable<{signup_err}>;
  public serverErrMess = null;
  private signupServerErrSub: Subscription;

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

    // bind this.signupServerErr with signup error from auth store
    this.signupServerErr = this.store.select('auth').map(err => err.signup_err);

    // subscribe for the signupServerErr occur
    this.signupServerErrSub = this.signupServerErr.subscribe((err) => {
      this.serverErrMess = err;
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

  onInputFocus(inputType: string) {
    if (this.serverErrMess) {
      if (this.serverErrMess.error_type === inputType) {
        this.serverErrMess = null;
      }
    }
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

  ngOnDestroy() {
    this.signupServerErrSub.unsubscribe();
  }
}
