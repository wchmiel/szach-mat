import * as fromChessman from './chessman.model';

export class CheckMove {

  // method check if user make a move or not. If not return false.
  static moveOnTheSamePosition(move: fromChessman.FromOldToNewPositionMove): boolean {
    if ((move.rowOld === move.rowNew) && (move.colOld === move.colNew)) {
      return false;
    } else {
      return true;
    }
  }

  static teamMate(rowMove: number, colMove: number, team: string): boolean {
    return true;
  }

}
