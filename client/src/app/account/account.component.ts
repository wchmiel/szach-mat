import { Component, OnInit, OnDestroy, ViewChild, Renderer2, ElementRef, HostListener } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AccountService } from './account.service';
import { AppService } from '../app.service';
import { ConstantsService } from '../helpers/constants/constants.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducers';
import * as AccountActions from './store/account.actions';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit, OnDestroy {

  @ViewChild('szAccountFlexCont') szAccountFlexCont: ElementRef;
  private userSubscription: Subscription;

  constructor(private renderer: Renderer2,
    private accountService: AccountService,
    private store: Store<fromApp.AppState>,
    private appService: AppService,
    private constService: ConstantsService) { }

  ngOnInit() {

    // when init accout component invoke actions to get user data from db
    this.store.dispatch(new AccountActions.GetUserData());

    // subscription for user Data from db
    this.userSubscription = this.accountService.userDataChanged.subscribe((data) => {
      console.log('HIDE PRELOADER!');
    });

    this.renderer.addClass(this.szAccountFlexCont.nativeElement, 'sz-account-flex-cont-tight');

    // if widnow width is greater than 768px
    if (window.screen.width > this.constService.SM_RES) {
      this.toggleSidebar('open');
    } else {
      this.toggleSidebar('close');
    }

    // event from sidebar component
    this.accountService.toggleSidebarEvent.subscribe(() => {
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

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

}
