import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgMaterialModule } from '../helpers/modules/ng-material/ng-material.module';
import { GameRoutingModule } from './game-routing.module';

import { GameComponent } from './game.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { IndexComponent } from './index/index.component';

import { ConstantsService } from '../helpers/constants/constants.service';
import { GameService } from './game.service';
import { ResizeService } from './engine/services/resize.service';

@NgModule({
  declarations: [
    GameComponent,
    SidebarComponent,
    IndexComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    GameRoutingModule,
    BrowserAnimationsModule,
    NgMaterialModule
  ],
  providers: [
    ConstantsService,
    GameService,
    ResizeService
  ]
})

export class GameModule {}
