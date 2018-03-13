import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing.module';

import { AccountComponent } from './account.component';
import { IndexComponent } from './index/index.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SettingsComponent } from './settings/settings.component';

import { AccountService } from './account.service';
import { ConstantsService } from '../helpers/constants/constants.service';

@NgModule({
  declarations: [
    AccountComponent,
    IndexComponent,
    SidebarComponent,
    SettingsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AccountRoutingModule
  ],
  providers: [
    AccountService,
    ConstantsService
  ]
})

export class AccountModule {}
