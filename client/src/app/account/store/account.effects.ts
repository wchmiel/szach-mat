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
import { Store } from '@ngrx/store';

@Injectable()
export class AccountEffects {

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
      return this.http.post('http://localhost:3000/api/tasks/uploadFile', fd, {
        observe: 'events'
      })
    .map((event) => {
      // if (event.type === HttpEventType.UploadProgress) {
      //   console.log('Upload Progress: ' + Math.round((event.loaded / event.total) * 100) + '%');
      // } else
      if (event.type === HttpEventType.Response) {
        if (event.body['success']) {

          this.store.dispatch(new AccountActions.UploadFile({
            success: event.body['success'],
            message: event.body['message']
          }));
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


  constructor(private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>) {}

}
