import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @ViewChild('hamburger') hamburger: ElementRef;
  @ViewChild('menuComponent') menuComponent: ElementRef;

  constructor(private renderer: Renderer2, private authService: AuthService) { }

  ngOnInit() {
  }

  toggleMenu() {
    const hamClassList = this.hamburger.nativeElement.classList.value.split(' '); // array of hamburger classess

    // toggling hamburger button
    if ((hamClassList.findIndex((elem) => elem === 'icon-bar-eff-end')) === -1) {
      this.renderer.addClass(this.hamburger.nativeElement, 'icon-bar-eff-end');
      this.renderer.addClass(this.menuComponent.nativeElement, 'sz-menu-active');
    } else {
      this.renderer.removeClass(this.hamburger.nativeElement, 'icon-bar-eff-end');
      this.renderer.removeClass(this.menuComponent.nativeElement, 'sz-menu-active');
    }
  }

  logout() {
    this.authService.logout();
  }

}
