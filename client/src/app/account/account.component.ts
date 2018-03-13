import { Component, OnInit, ViewChild, Renderer2, ElementRef, HostListener } from '@angular/core';
import { AccountService } from './account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  @ViewChild('szAccountFlexCont') szAccountFlexCont: ElementRef;



  // PRZEROBIC ZEBY TO BYLO GLOBALNE - WYSYLANE Z APP COMPONENT EVENT Z APP SERVICE!
  @HostListener('window:resize', ['$event']) windowResize(event) {
    this.accountService.windowResizeEvent.next(event.target['innerWidth']);
  }

  constructor(private renderer: Renderer2, private accountService: AccountService) { }

  ngOnInit() {
    this.renderer.addClass(this.szAccountFlexCont.nativeElement, 'sz-account-flex-cont-tight');

    // event from sidebar component
    this.accountService.toggleSidebarEvent.subscribe(() => {
      this.onToggleSidebar();
    });

    // DOROBIC SUBSKRYPCJE NA RESIZE Z APP SERVICE - sprawdxac width jesli mobile
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
