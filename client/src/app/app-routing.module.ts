/*jshint esversion: 6 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { NotAuthGuard } from './auth/not-auth-guard.service';


const appRoutes: Routes = [
  { path: '', canActivate: [NotAuthGuard], component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [
    NotAuthGuard
  ]
})

export class AppRoutingModule {}
