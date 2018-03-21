import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';
import * as AccountActions from './account.actions';
import * as fromApp from '../../store/app.reducers';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ConstantsService } from '../../helpers/constants/constants.service';
import { Store } from '@ngrx/store';
import { AccountService } from '../account.service';
import { AuthService } from '../../auth/auth.service';

@Injectable()
export class AccountEffects {

  private apiUrl = this.constantsService.API_HOST;

  // the action will occur when we try to upload file
  @Effect({dispatch: false})
    accountFileUpload$ = this.actions$
    .ofType(AccountActions.TRY_UPLOAD_FILE)
    .switchMap((action: AccountActions.TryUploadFile) => {
      const fd = new FormData();
      fd.append('avatar', action.payload, action.payload.name);
      // return this.http.post('http://localhost:3000/api/tasks/uploadFile', fd, {
      //   reportProgress: true,
      //   observe: 'events'
      // })
      return this.http.post(this.apiUrl + '/api/tasks/uploadFile', fd, {
        observe: 'events'
      })
    .map((event) => {
      // if (event.type === HttpEventType.UploadProgress) {
      //   console.log('Upload Progress: ' + Math.round((event.loaded / event.total) * 100) + '%');
      // } else
      if (event.type === HttpEventType.Response) {
        if (event.body['success']) {

          // successfully uplaoded file
          this.store.dispatch(new AccountActions.UploadFile({
            success: event.body['success'],
            message: event.body['message']
          }));

          // dispatch action to fetch new data
          this.store.dispatch(new AccountActions.GetUserData());
        } else {

          // Upload file error occur
          this.store.dispatch(new AccountActions.UploadFileErr({
            success: event.body['success'],
            message: event.body['message']
          }));
        }
      } else if (event['statusText'] === 'Unauthorized') {

        // Unauthorized error occur
        this.store.dispatch(new AccountActions.UploadFileErr({
          success: false,
          message: 'You are not authorized!'
        }));
      }
    });

    });

  @Effect({dispatch: false})
    accountEditUserData$ = this.actions$
    .ofType(AccountActions.TRY_EDIT_USER_DATA)
    .switchMap((action: AccountActions.TryEditUserData) => {
      return this.http.post(this.apiUrl + '/api/tasks/account/update/userdata', action.payload);
    })
    .map((res) => {
      if (res['success']) {
        // User data saved successfully
        this.store.dispatch(new AccountActions.EditUserData(res));

        // dispatch action to fetch new data
        this.store.dispatch(new AccountActions.GetUserData());
      } else {
        // Error when saving user data occur
        this.store.dispatch(new AccountActions.EditUserDataErr(res));
      }
    });

  @Effect({dispatch: false})
    accountGetUserData$ = this.actions$
    .ofType(AccountActions.GET_USER_DATA)
    .switchMap((action: AccountActions.GetUserData) => {
      return this.http.get(this.apiUrl + '/api/tasks/account/get/userdata');
    })
    .map((res) => {
      if (res['success']) {
        this.accountService.saveUserData(res['userData']);
        this.store.dispatch(new AccountActions.SaveUserData(res['userData']));
      } else {
        // when error from db when fetching user data logout user
        this.authService.logout();
      }
    });


  constructor(private actions$: Actions,
    private http: HttpClient,
    private constantsService: ConstantsService,
    private accountService: AccountService,
    private authService: AuthService,
    private store: Store<fromApp.AppState>) {}
}
