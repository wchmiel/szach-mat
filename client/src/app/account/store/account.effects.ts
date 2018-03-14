import { Effect, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as AccountActions from './account.actions';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AccountEffects {

  // the action will occur when we try to upload file
  @Effect({dispatch: false}) accountFileUpload$ = this.actions$
    .ofType(AccountActions.TRY_UPLOAD_FILE)
    .map((action: AccountActions.TryUploadFile) => {
      console.log('----------------- from store -----------');
      console.log(action.payload);
      const fd = new FormData();
      fd.append('avatar', action.payload, action.payload.name);
      this.http.post('http://localhost:3000/api/tasks/uploadFile', fd)
        .subscribe((res) => {
          console.log(res);
        });
    });


  constructor(private actions$: Actions,
    private http: HttpClient) {}

}
