import { Subject } from 'rxjs/Subject';

export class AppService {
  public windowResizeEvent = new Subject<number>();
}
