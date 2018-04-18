import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import * as fromApp from '../../store/app.reducers';
import * as fromAccount from '../store/account.reducers';
import * as AccountActions from '../store/account.actions';
import { FlashMessagesService } from 'angular2-flash-messages';
import { FormGroup, FormControl } from '@angular/forms';
import { UserData } from '../../models/user.model';
import { AccountService } from '../account.service';
import { ConstantsService } from '../../helpers/constants/constants.service';
// import { CropperSettings, Bounds, ImageCropperComponent } from 'ngx-img-cropper';
import { MatDialog } from '@angular/material';
import { CropperComponent } from '../../core/cropper/cropper.component';

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
  // public data: any;
  // public cropperSettings: CropperSettings;
  // public croppedWidth: number;
  // public croppedHeight: number;
  // public accountState: Observable<fromAccount.State>;
  public apiUrl = this.constService.API_HOST;
  public photoPath = '';
  private userSubscription: Subscription;

  // @ViewChild('cropper') cropper: ImageCropperComponent;

  constructor(private store: Store<fromApp.AppState>,
    private accountService: AccountService,
    private constService: ConstantsService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private flashMessagesService: FlashMessagesService) {

      // this.cropperSettings = new CropperSettings();
      // this.cropperSettings.width = 200;
      // this.cropperSettings.height = 200;
      //
      // this.cropperSettings.croppedWidth = 200;
      // this.cropperSettings.croppedHeight = 200;
      //
      // this.cropperSettings.canvasWidth = 300;
      // this.cropperSettings.canvasHeight = 300;
      //
      // this.cropperSettings.minWidth = 100;
      // this.cropperSettings.minHeight = 100;
      //
      // this.cropperSettings.rounded = false;
      // this.cropperSettings.keepAspect = true;
      //
      // this.cropperSettings.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
      // this.cropperSettings.cropperDrawSettings.strokeWidth = 2;
      // this.cropperSettings.noFileInput = true;
      //
      // this.data = {};
    }

  ngOnInit() {

    // console.log(this.route.data);

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

  // cropped(bounds: Bounds) {
  //   this.croppedHeight = bounds.bottom - bounds.top;
  //   this.croppedWidth = bounds.right - bounds.left;
  //   // console.log(this.data);
  // }

  // fileChangeListener($event) {
  //   console.log('changed', $event);
  //   const image: any = new Image();
  //   const file: File = $event.target.files[0];
  //   const myReader: FileReader = new FileReader();
  //   const that = this;
  //   myReader.onloadend = function(loadEvent: any) {
  //     image.src = loadEvent.target.result;
  //     that.cropper.setImage(image);
  //   };
  //
  //   myReader.readAsDataURL(file);
  // }

  // upload() {
  //   const imageData = this.data.image.split(',');
  //   const contentType = imageData[0].split(';')[0].substr(5);
  //   // const b64Data = imageData[1].substr(1);
  //   const b64Data = imageData[1];
  //
  //   const blob = this.b64toBlob(b64Data, contentType, 512);
  //
  //   // console.log(blob);
  //   this.store.dispatch(new AccountActions.TryUploadFile(blob));
  //
  //   // const uploadData = {
  //   //   image: this.data.image
  //   // };
  //   // this.store.dispatch(new AccountActions.TryUploadFile(uploadData));
  //   // const image = new Image();
  //   // image.src = this.data.image;
  //   // console.log(image);
  // }

  uploadUserPhoto(img) {
    // dodac wywolanie zmiany zdjec w calej apce dopiero jak zdjecie zostanie uploadowane z sukcesem
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

  // b64toBlob(b64Data, contentType, sliceSize) {
  //   contentType = contentType || '';
  //   sliceSize = sliceSize || 512;
  //
  //   const byteCharacters = atob(b64Data);
  //   const byteArrays = [];
  //
  //   for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
  //     const slice = byteCharacters.slice(offset, offset + sliceSize);
  //     const byteNumbers = new Array(slice.length);
  //     for (let i = 0; i < slice.length; i++) {
  //       byteNumbers[i] = slice.charCodeAt(i);
  //     }
  //     const byteArray = new Uint8Array(byteNumbers);
  //     byteArrays.push(byteArray);
  //   }
  //
  //   const blob = new Blob(byteArrays, {type: contentType});
  //   return blob;
  // }

  openCropper(event) {
    const dialogRef = this.dialog.open(CropperComponent, {
      width: '500px',
      data: {
        event: event,
        headline: 'Crop photo'
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res.result === 'confirm') {
        console.log(res);
        this.uploadUserPhoto(res.image);
      }
    });
  }

  ngOnDestroy() {
    this.accountServerErrSub.unsubscribe();
    this.userSubscription.unsubscribe();
  }

}
