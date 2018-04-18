import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MatDialogRef } from '@angular/material';
import { CropperSettings, Bounds, ImageCropperComponent } from 'ngx-img-cropper';

@Component({
  selector: 'app-cropper',
  templateUrl: './cropper.component.html',
  styleUrls: ['./cropper.component.scss']
})

export class CropperComponent implements OnInit {

  public cropperData: any;
  public cropperSettings: CropperSettings;
  public croppedWidth: number;
  public croppedHeight: number;

  @ViewChild('cropper') cropper: ImageCropperComponent;

  constructor(
    public thisDialogRef: MatDialogRef< CropperComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.width = this.data['width'] || 200;
    this.cropperSettings.height = this.data['height'] || 200;
    this.cropperSettings.croppedWidth = this.data['croppedWidth'] || 200;
    this.cropperSettings.croppedHeight = this.data['croppedHeight'] || 200;
    this.cropperSettings.canvasWidth = this.data['canvasWidth'] || 300;
    this.cropperSettings.canvasHeight = this.data['canvasHeight'] || 300;
    this.cropperSettings.minWidth = this.data['minWidth'] || 100;
    this.cropperSettings.minHeight = this.data['minHeight'] || 100;
    this.cropperSettings.rounded = this.data['rounded'] || false;
    this.cropperSettings.keepAspect = this.data['keepAspect'] || true;
    this.cropperSettings.cropperDrawSettings.strokeColor = this.data['strokeColor'] || 'rgba(255,255,255,1)';
    this.cropperSettings.cropperDrawSettings.strokeWidth = this.data['strokeWidth'] || 2;
    this.cropperSettings.noFileInput = this.data['noFileInput'] || true;
    this.cropperData = {};
  }

  ngOnInit() {
    this.fileChangeListener(this.data['event']);
  }

  onCloseConfirm() {
    const imageData = this.cropperData.image.split(',');
    const contentType = imageData[0].split(';')[0].substr(5);
    const b64Data = imageData[1];
    const blob = this.b64toBlob(b64Data, contentType, 512);

    this.thisDialogRef.close({
      result: 'confirm',
      image: blob
    });
  }

  onCloseCancel() {
    this.thisDialogRef.close({
      result: 'cancel'
    });
  }

  fileChangeListener($event) {
    const image: any = new Image();
    const file: File = $event.target.files[0];
    const myReader: FileReader = new FileReader();
    const that = this;
    myReader.onloadend = function(loadEvent: any) {
      image.src = loadEvent.target.result;
      that.cropper.setImage(image);
    };

    myReader.readAsDataURL(file);
  }

  cropped(bounds: Bounds) {
    this.croppedHeight = bounds.bottom - bounds.top;
    this.croppedWidth = bounds.right - bounds.left;
  }

  b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, {type: contentType});
    return blob;
  }
}
