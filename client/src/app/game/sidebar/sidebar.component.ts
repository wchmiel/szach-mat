import { Component, OnInit, ViewChild, Renderer2, ElementRef, HostListener, Input } from '@angular/core';

import { AppService } from '../../app.service';
import { GameService } from '../game.service';
import { ConstantsService } from '../../helpers/constants/constants.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() @ViewChild('sidebarCont') sidebarCont: ElementRef;

  constructor(private renderer: Renderer2,
    private appService: AppService,
    private gameService: GameService,
    private constService: ConstantsService) { }

  ngOnInit() {

    // if widnow width is greater than 768px
    if (window.screen.width > this.constService.SM_RES) {
      this.toggleSidebar('open');
    } else {
      this.toggleSidebar('close');
    }

    // window resize event from app component
    this.appService.windowResizeEvent.subscribe((windowWidth) => {
      if (windowWidth > this.constService.SM_RES) {
        this.toggleSidebar('open');
      } else {
        this.toggleSidebar('close');
      }
    });

  }

  onTogggleSidebar() {
    this.gameService.toggleSidebarEvent.next(); // emitting event to inform game component
    const sidebarContClassList = this.sidebarCont.nativeElement.classList.value.split(' '); // array of sidebar classess

    // toggling sidebarCont
    if ((sidebarContClassList.findIndex((elem) => elem === 'sz-sidebar-cont-open')) === -1) {
      this.toggleSidebar('open');
    } else {
      this.toggleSidebar('close');
    }
  }

  toggleSidebar(action: string) {
    if (action === 'open') {
      this.renderer.removeClass(this.sidebarCont.nativeElement, 'sz-sidebar-cont-close');
      this.renderer.addClass(this.sidebarCont.nativeElement, 'sz-sidebar-cont-open');
    } else if (action === 'close') {
      this.renderer.removeClass(this.sidebarCont.nativeElement, 'sz-sidebar-cont-open');
      this.renderer.addClass(this.sidebarCont.nativeElement, 'sz-sidebar-cont-close');
    }
  }

}
