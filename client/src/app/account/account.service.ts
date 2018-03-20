import { Subject } from 'rxjs/Subject';
import { UserData } from '../models/user.model';

export class AccountService {
  public userData = new UserData;
  public toggleSidebarEvent = new Subject<any>();
  public userDataChanged = new Subject<any>();

  public saveUserData(data) {
    this.userData = data;
    this.userDataChanged.next(this.userData);
  }

  public setUserData(userDataFromDb) {
    this.userData = userDataFromDb;
  }

}
