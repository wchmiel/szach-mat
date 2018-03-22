import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @ViewChild('hamburger') hamburger: ElementRef;
  @ViewChild('menuComponent') menuComponent: ElementRef;
  public menuActive = true;

  constructor(private renderer: Renderer2,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {

    // detect router events to hide menu inside account and game routes
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe((event) => {
        if (event['url'] === '/' || event['url'] === '/signin' || event['url'] === '/signup') {
          this.menuActive = true;
        } else {
          this.menuActive = false;
        }
      });
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

}
