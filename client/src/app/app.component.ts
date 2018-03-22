import { Component, HostListener } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('fleshAlertState', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0px)'
      })),

      // when alert shows
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-50px)'
        }),
        animate(300)
      ]),

      // when alert disappear
      transition('* => void', [
        animate(300, style({
          transform: 'translateX(50px)',
          opacity: 0
        }))
      ])
    ])
  ]
})
export class AppComponent {
  title = 'app';

  // WINDOW RESIZE EVENT
  @HostListener('window:resize', ['$event']) windowResize(event) {
    this.appService.windowResizeEvent.next(event.target['innerWidth']);
  }

  constructor(private appService: AppService) {}

}
