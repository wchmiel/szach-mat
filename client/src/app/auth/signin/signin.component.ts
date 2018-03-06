import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import * as AuthActions from '../store/auth.actions';
import { FlashMessagesService } from 'angular2-flash-messages';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit, OnDestroy {
  signinForm: FormGroup;
  signinServerErr: Observable<any>;
  private signinServerErrSub: Subscription;

  constructor(private store: Store<fromApp.AppState>,
    private flashMessagesService: FlashMessagesService) { }

  ngOnInit() {

    // declaration of signin Form
    this.signinForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, Validators.required)
    });

    // when redirect from signup this observable occur
    this.store.select('auth')
      .take(1)
      .map(data => data.signup_mess_show)
      .subscribe((signup_mess_show) => {
        if (signup_mess_show) {
          this.store.dispatch(new AuthActions.SignupMessShown);
          this.flashMessagesService.show(
            'Your registration was succesfull. Now you can signin to your account!',
            { cssClass: 'sz-alert sz-alert-success' });
        }
      });

      // bind this.signinServerErr with signup error from auth store
      this.signinServerErr = this.store.select('auth').map(err => err.signin_err);

      // subscribe for the signinServerErr occur
      this.signinServerErrSub = this.signinServerErr.subscribe((err) => {
        if (!err.valid && err.error_mess !== '') {
          this.flashMessagesService.show(
            err.error_mess,
            { cssClass: 'sz-alert sz-alert-error' });
          this.store.dispatch(new AuthActions.SigninMessShown);
        }
      });
  }

  onSubmit() {
    const user = {
      email: this.signinForm.value['email'],
      password: this.signinForm.value['password']
    };
    this.store.dispatch(new AuthActions.TrySignin(user));
  }

  ngOnDestroy() {
    this.signinServerErrSub.unsubscribe();
  }

}
