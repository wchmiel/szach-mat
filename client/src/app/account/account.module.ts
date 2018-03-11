import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing.module';

import { AccountComponent } from './account.component';
import { IndexComponent } from './index/index.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [
    AccountComponent,
    IndexComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AccountRoutingModule
  ]
})

export class AccountModule {}
