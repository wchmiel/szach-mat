import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import * as fromApp from '../../store/app.reducers';
import * as AccountActions from '../store/account.actions';
import { FlashMessagesService } from 'angular2-flash-messages';
import { FormGroup, FormControl } from '@angular/forms';
import { UserData } from '../../models/user.model';
import { AccountService } from '../account.service';
import { ConstantsService } from '../../helpers/constants/constants.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {

  private selectedImg: File = null;
  private accountServerErrSub: Subscription;
  private flashMessInit =  false; // false - before component initialization
  public settingsForm: FormGroup;
  public userData = new UserData;
  public apiUrl = this.constService.API_HOST;
  public photoPath = '';
  private userSubscription: Subscription;

  constructor(private store: Store<fromApp.AppState>,
    private accountService: AccountService,
    private constService: ConstantsService,
    private flashMessagesService: FlashMessagesService) { }

  ngOnInit() {

    this.userSubscription = this.accountService.userDataChanged.subscribe((data) => {
      this.userData = data;
      this.photoPath = this.apiUrl + '/public/files/account/images/' + this.userData.photo;
    });

    this.userData = this.accountService.userData;
    this.photoPath = this.apiUrl + '/public/files/account/images/' + this.userData.photo;

    this.settingsForm = new FormGroup({
      'name': new FormControl(null),
      'surname': new FormControl(null)
    });

    this.accountServerErrSub = this.store.select('account')
      .map(message => message.flash_message)
      .subscribe((res) => {
        if ( this.flashMessInit && res.message) {
          if (res.success) {
            this.flashMessagesService.show(res.message, { cssClass: 'sz-alert sz-alert-success' });
          } else {
            this.flashMessagesService.show(res.message, { cssClass: 'sz-alert sz-alert-error' });
          }
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

  onSubmit() {
    const name = this.settingsForm.value.name.replace(/<(?:.|\n)*?>/gm, '');
    const surname = this.settingsForm.value.surname.replace(/<(?:.|\n)*?>/gm, '');
    this.store.dispatch(new AccountActions.TryEditUserData({
      name: name,
      surname: surname
    }));
  }

  ngOnDestroy() {
    this.accountServerErrSub.unsubscribe();
    this.userSubscription.unsubscribe();
  }

}
