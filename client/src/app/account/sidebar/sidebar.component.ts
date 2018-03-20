import { Component, OnInit, OnDestroy, ViewChild, Renderer2, ElementRef, HostListener, Input } from '@angular/core';
import { AccountService } from '../account.service';
import { AppService } from '../../app.service';
import { ConstantsService } from '../../helpers/constants/constants.service';
import { AuthService } from '../../auth/auth.service';
import { UserData } from '../../models/user.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  @Input() @ViewChild('sidebarCont') sidebarCont: ElementRef;
  public userData = new UserData;
  public apiUrl = this.constService.API_HOST;
  public avatarPath = '';
  private userSubscription: Subscription;

  constructor(private renderer: Renderer2,
    private accountService: AccountService,
    private appService: AppService,
    private constService: ConstantsService,
    private authService: AuthService) { }

  ngOnInit() {
    this.userSubscription = this.accountService.userDataChanged.subscribe((data) => {
      this.userData = data;
      this.avatarPath = this.apiUrl + '/public/files/account/images/' + this.userData.photo;
    });

    this.userData = this.accountService.userData;
    this.avatarPath = this.apiUrl + '/public/files/account/images/' + this.userData.photo;

    // if widnow width is greater than 768px
    if (window.screen.width > this.constService.SM_RES) {
      this.toggleSidebar('open');
    } else {
      this.toggleSidebar('close');
    }

    // window resize event from account component
    this.appService.windowResizeEvent.subscribe((windowWidth) => {
      if (windowWidth > this.constService.SM_RES) {
        this.toggleSidebar('open');
      } else {
        this.toggleSidebar('close');
      }
    });
  }

  onTogggleSidebar() {
    this.accountService.toggleSidebarEvent.next(); // emitting event to inform account component
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

  logout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

}
