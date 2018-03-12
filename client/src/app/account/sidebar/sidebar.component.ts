import { Component, OnInit, ViewChild, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @ViewChild('sidebarCont') sidebarCont: ElementRef;

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    this.renderer.addClass(this.sidebarCont.nativeElement, 'sz-sidebar-cont-open');
  }

  onTogggleSidebar() {
    const sidebarContClassList = this.sidebarCont.nativeElement.classList.value.split(' '); // array of sidebar classess

    // toggling sidebarCont
    if ((sidebarContClassList.findIndex((elem) => elem === 'sz-sidebar-cont-open')) === -1) {
      this.renderer.removeClass(this.sidebarCont.nativeElement, 'sz-sidebar-cont-close');
      this.renderer.addClass(this.sidebarCont.nativeElement, 'sz-sidebar-cont-open');
    } else {
      this.renderer.removeClass(this.sidebarCont.nativeElement, 'sz-sidebar-cont-open');
      this.renderer.addClass(this.sidebarCont.nativeElement, 'sz-sidebar-cont-close');
    }
  }

}
