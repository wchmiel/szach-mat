import { Subject } from 'rxjs/Subject';

export class AccountService {
  public toggleSidebarEvent = new Subject<any>();
  public windowResizeEvent = new Subject<number>();
}
