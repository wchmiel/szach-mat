import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import * as AccountActions from '../store/account.actions';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  private selectedImg: File = null;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {

  }

  onFileSelected(event) {
    this.selectedImg = <File>event.target.files[0];
  }

  onUpload() {
    this.store.dispatch(new AccountActions.TryUploadFile(this.selectedImg));
  }

}
