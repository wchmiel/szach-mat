import { Effect, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';
import * as AccountActions from './account.actions';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AccountEffects {

  // the action will occur when we try to upload file
  @Effect() accountFileUpload$ = this.actions$
    .ofType(AccountActions.TRY_UPLOAD_FILE)
    .switchMap((action: AccountActions.TryUploadFile) => {
      const fd = new FormData();
      fd.append('avatar', action.payload, action.payload.name);
      return this.http.post('http://localhost:3000/api/tasks/uploadFile', fd, {
        reportProgress: true,
        observe: 'events'
    })
    .map((event) => {
      // if (event.type === HttpEventType.UploadProgress) {
      //   console.log('Upload Progress: ' + Math.round((event.loaded / event.total) * 100) + '%');
      // } else
      if (event.type === HttpEventType.Response) {
        if (event.body['success']) {
          // File uploaded succesfully
          return {
            type: AccountActions.UPLOAD_FILE,
            payload: {success: event.body['success'], message: event.body['message']}
          };
        } else {
          // Upload file error occur
          return {
            type: AccountActions.UPLOAD_FILE_ERR,
            payload: {success: event.body['success'], message: event.body['message']}
          };
        }
      } else if (event['statusText'] === 'Unauthorized') {

        // Unauthorized error occur
        return {
          type: AccountActions.UPLOAD_FILE_ERR,
          payload: {success: false, message: 'You are not authorized!'}
        };
      }
    });

    });


    // .subscribe((event) => {
    //   if (event.type === HttpEventType.UploadProgress) {
    //     console.log('Upload Progress: ' + Math.round((event.loaded / event.total) * 100) + '%');
    //   } else if (event.type === HttpEventType.Response) {
    //     console.log(event);
    //   }
    // });


  constructor(private actions$: Actions,
    private http: HttpClient) {}

}
