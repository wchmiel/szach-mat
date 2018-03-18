import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import * as fromApp from '../../store/app.reducers';
import * as AccountActions from '../store/account.actions';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {

  private selectedImg: File = null;
  private accountServerErrSub: Subscription;
  private flashMessInit =  false; // false - before component initialization

  constructor(private store: Store<fromApp.AppState>,
    private flashMessagesService: FlashMessagesService) { }

  ngOnInit() {

    this.accountServerErrSub = this.store.select('account')
      .map(err => err.file_upload_mess)
      .subscribe((res) => {
        if ( this.flashMessInit && res.message) {
          console.log('init');
          if (res.success) {
            this.flashMessagesService.show(res.message, { cssClass: 'sz-alert sz-alert-success' });
          } else {
            this.flashMessagesService.show('Uploading failed. ' + res.message, { cssClass: 'sz-alert sz-alert-error' });
          }
        } else {
          console.log('not init');
        }
      });

    this.flashMessInit = true;
  }

  onFileSelected(event) {
    this.selectedImg = <File>event.target.files[0];
  }

  onUpload() {
    this.store.dispatch(new AccountActions.TryUploadFile(this.selectedImg));
  }

  ngOnDestroy() {
    this.accountServerErrSub.unsubscribe();
  }

}
