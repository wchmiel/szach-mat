import { Component, OnInit, OnDestroy, ViewChild, Renderer2, ElementRef, HostListener, Input } from '@angular/core';

import { AppService } from '../app.service';
import { GameService } from './game.service';
import { ConstantsService } from '../helpers/constants/constants.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  @ViewChild('szAccountFlexCont') szAccountFlexCont: ElementRef;

  constructor(private renderer: Renderer2,
    private appService: AppService,
    private gameService: GameService,
    private constService: ConstantsService) { }

  ngOnInit() {

    this.renderer.addClass(this.szAccountFlexCont.nativeElement, 'sz-account-flex-cont-tight');

    // if widnow width is greater than 768px
    if (window.screen.width > this.constService.SM_RES) {
      this.toggleSidebar('open');
    } else {
      this.toggleSidebar('close');
    }

    // event from sidebar component
    this.gameService.toggleSidebarEvent.subscribe(() => {
      this.onToggleSidebar();
    });

    // widnow resize event from app component
    this.appService.windowResizeEvent.subscribe((windowWidth: number) => {
      if (windowWidth > this.constService.SM_RES) {
        this.toggleSidebar('open');
      } else {
        this.toggleSidebar('close');
      }
    });

  }

  onToggleSidebar() {
    // array of szAccountFlexCont classess
    const szAccountFlexContClassList = this.szAccountFlexCont.nativeElement.classList.value.split(' ');

    // toggling szAccountFlexCont
    if ((szAccountFlexContClassList.findIndex((elem) => elem === 'sz-account-flex-cont-full')) === -1) {
      this.toggleSidebar('close');
    } else {
      this.toggleSidebar('open');
    }
  }

  toggleSidebar(action: string) {
    if (action === 'open') {
      this.renderer.removeClass(this.szAccountFlexCont.nativeElement, 'sz-account-flex-cont-full');
      this.renderer.addClass(this.szAccountFlexCont.nativeElement, 'sz-account-flex-cont-tight');
    } else if (action === 'close') {
      this.renderer.removeClass(this.szAccountFlexCont.nativeElement, 'sz-account-flex-cont-tight');
      this.renderer.addClass(this.szAccountFlexCont.nativeElement, 'sz-account-flex-cont-full');
    }
  }

}
