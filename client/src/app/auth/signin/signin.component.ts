import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import * as AuthActions from '../store/auth.actions';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  constructor(private store: Store<fromApp.AppState>,
    private flashMessagesService: FlashMessagesService) { }

  ngOnInit() {

    // when redirect from signup this observable occur
    this.store.select('auth')
      .take(1)
      .map(data => data.signup_mess_show)
      .subscribe((signup_mess_show) => {
        if (signup_mess_show) {
          this.store.dispatch(new AuthActions.SignupMessShown);
          this.flashMessagesService.show('Your registration was succesfull. Now you can signin to your account!');
        }
      });
  }

  onSignin(form) {
    console.log('signup');
  }

}
