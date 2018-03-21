import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth-guard.service';

import { GameComponent } from './game.component';
import { IndexComponent } from './index/index.component';

const gameRoutes: Routes = [
  { path: 'game', canActivate: [AuthGuard], component: GameComponent, children: [
    { path: '', component: IndexComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(gameRoutes)],
  exports: [RouterModule],
  providers: [
    AuthGuard
  ]
})

export class GameRoutingModule {}
