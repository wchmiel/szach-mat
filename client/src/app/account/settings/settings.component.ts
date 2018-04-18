import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import * as fromApp from '../../store/app.reducers';
import * as fromAccount from '../store/account.reducers';
import * as AccountActions from '../store/account.actions';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AppService } from '../../app.service';
import { FormGroup, FormControl } from '@angular/forms';
import { UserData } from '../../models/user.model';
import { AccountService } from '../account.service';
import { ConstantsService } from '../../helpers/constants/constants.service';
import { MatDialog } from '@angular/material';
import { CropperComponent } from '../../core/cropper/cropper.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {

  public settingsForm: FormGroup;
  public userData = new UserData;
  public apiUrl = this.constService.API_HOST;
  public photoPath = '';
  private selectedImg: File = null;
  private accountServerErrSub: Subscription;
  private flashMessInit =  false; // false - before component initialization
  private userSubscription: Subscription;
  private appServiceSubscription: Subscription;
  private cropperSettings: {
    width: number,
    canvasWidth: number,
    canvasHeight: number
  };

  constructor(private store: Store<fromApp.AppState>,
    private accountService: AccountService,
    private appService: AppService,
    private constService: ConstantsService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private flashMessagesService: FlashMessagesService) {
      this.setCropperConfigs(window.innerWidth);
    }

  ngOnInit() {

    this.settingsForm = new FormGroup({
      'name': new FormControl(null),
      'surname': new FormControl(null)
    });

    this.userSubscription = this.accountService.userDataChanged
      .subscribe((data) => {
        this.userData = data;
        this.photoPath = this.apiUrl + '/public/files/account/images/' + this.userData.photo;
        this.settingsForm.setValue({
          name: this.userData.name,
          surname: this.userData.surname
        });
      });

    this.appServiceSubscription = this.appService.windowResizeEvent
      .subscribe((screenWidth) => {
        this.setCropperConfigs(screenWidth);
      });

    this.userData = this.accountService.userData;
    if (this.userData.name) {
      this.settingsForm.setValue({
        name: this.userData.name,
        surname: this.userData.surname
      });
    }
    this.photoPath = this.userData.photo ? this.apiUrl + '/public/files/account/images/' + this.userData.photo : '';

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
    if (this.selectedImg) {
      this.openCropper(event);
    }
  }

  uploadUserPhoto(img) {
    this.store.dispatch(new AccountActions.TryUploadFile(img));
  }

  onSubmit() {
    const name = this.settingsForm.value.name.replace(/<(?:.|\n)*?>/gm, '');
    const surname = this.settingsForm.value.surname.replace(/<(?:.|\n)*?>/gm, '');
    this.store.dispatch(new AccountActions.TryEditUserData({
      name: name,
      surname: surname
    }));
  }

  openCropper(event) {
    const self = this;
    const dialogRef = this.dialog.open(CropperComponent, {
      width: self.cropperSettings.width + 'px',
      data: {
        event: event,
        canvasWidth: self.cropperSettings.canvasWidth,
        canvasHeight: self.cropperSettings.canvasHeight,
        headline: 'Crop your photo'
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res.result === 'confirm') {
        this.uploadUserPhoto(res.image);
      }
    });
  }

  setCropperConfigs(screenWidth: number): void {
    if (screenWidth < 550) {
      this.cropperSettings = { width: 280, canvasWidth: 230, canvasHeight: 230 };
    } else {
      this.cropperSettings = { width: 400, canvasWidth: 350, canvasHeight: 350 };
    }
  }

  ngOnDestroy() {
    this.accountServerErrSub.unsubscribe();
    this.userSubscription.unsubscribe();
    this.appServiceSubscription.unsubscribe();
  }

}
