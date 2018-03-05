import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/app.reducers';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthModule } from './auth/auth.module';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth/store/auth.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { environment } from './../environments/environment';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { Angular2PromiseButtonModule } from 'angular2-promise-buttons/dist';

import { AppComponent } from './app.component';
import { HomeComponent } from './core/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AuthModule,
    AppRoutingModule, // the main routing module
    StoreModule.forRoot(reducers), // here we pass all our reducers bound to reducers obj
    EffectsModule.forRoot([AuthEffects]),
    NgbModule.forRoot(),
    StoreRouterConnectingModule,
    FlashMessagesModule.forRoot(),
    Angular2PromiseButtonModule.forRoot({ // setting for spinner buttons
      spinnerTpl: '<span class="sz-btn-spinner"></span>',
      disableBtn: true,
      btnLoadingClass: 'sz-btn-is-loading',
    }),
    // we will add it here only when environment is not production
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
