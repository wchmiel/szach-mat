import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing.module';
import { CountryPickerModule } from 'ngx-country-picker';
import { HttpClientModule } from '@angular/common/http';

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
    CountryPickerModule.forRoot()
  ],
  providers: [
    AccountService,
    ConstantsService,
    CountryPickerService
  ]
})

export class AccountModule {}
