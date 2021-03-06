import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/app.reducers';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthModule } from './auth/auth.module';
import { AccountModule } from './account/account.module';
import { GameModule } from './game/game.module';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth/store/auth.effects';
import { AccountEffects } from './account/store/account.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { environment } from './../environments/environment';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgMaterialModule } from './helpers/modules/ng-material/ng-material.module';
import { ImageCropperModule } from 'ngx-img-cropper';
import { AuthInterceptor } from './helpers/interceptors/auth.interceptor';

import { AppComponent } from './app.component';
import { HomeComponent } from './core/home/home.component';

import { ConstantsService } from './helpers/constants/constants.service';
import { AppService } from './app.service';
import { DialogComponent } from './core/dialog/dialog.component';
import { CropperComponent } from './core/cropper/cropper.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DialogComponent,
    CropperComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AuthModule,
    AccountModule,
    GameModule,
    AppRoutingModule, // the main routing module
    StoreModule.forRoot(reducers), // here we pass all our reducers bound to reducers obj
    EffectsModule.forRoot([AuthEffects, AccountEffects]),
    NgbModule.forRoot(),
    StoreRouterConnectingModule,
    BrowserAnimationsModule,
    NgMaterialModule,
    ImageCropperModule,
    FlashMessagesModule.forRoot(),
    // we will add it here only when environment is not production
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  entryComponents: [
    DialogComponent,
    CropperComponent
  ],
  providers: [
    ConstantsService,
    AppService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
