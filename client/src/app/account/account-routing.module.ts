import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountComponent } from './account.component';
import { IndexComponent } from './index/index.component';
import { SettingsComponent } from './settings/settings.component';

// Routes declaration for Account Module
const accountRoutes: Routes = [
  { path: 'account', component: AccountComponent, children: [
    { path: '', component: IndexComponent },
    { path: 'settings', component: SettingsComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(accountRoutes)],
  exports: [RouterModule]
})

export class AccountRoutingModule {}
