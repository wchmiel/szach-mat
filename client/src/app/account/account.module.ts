import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing.module';
import { CountryPickerModule } from 'ngx-country-picker';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgMaterialModule } from '../helpers/modules/ng-material/ng-material.module';

import { AccountComponent } from './account.component';
import { IndexComponent } from './index/index.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SettingsComponent } from './settings/settings.component';

import { AccountService } from './account.service';
import { ConstantsService } from '../helpers/constants/constants.service';
import { CountryPickerService } from 'ngx-country-picker';

@NgModule({
  declarations: [
    AccountComponent,
    IndexComponent,
    SidebarComponent,
    SettingsComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AccountRoutingModule,
    BrowserAnimationsModule,
    NgMaterialModule,
    CountryPickerModule.forRoot()
  ],
  providers: [
    AccountService,
    ConstantsService,
    CountryPickerService
  ]
})

export class AccountModule {}
