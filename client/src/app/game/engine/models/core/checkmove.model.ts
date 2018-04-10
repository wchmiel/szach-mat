import * as fromChessman from './chessman.model';

export class CheckMove {

  static rookCheckOpponentsCollision(move: fromChessman.FromOldToNewPositionMove, pawnsArr): boolean {
    if (move.colNew > (move.colOld + 1)) {
      for (let i = (move.colOld + 1); i < move.colNew; i++) {
        console.log('check position: [' + move.rowOld + ', ' + i + ']');
        if (pawnsArr[move.rowOld][i]) {
          return false;
        }
      }
    } else if (move.colNew < (move.colOld - 1)) {
      for (let i = (move.colOld - 1); i > move.colNew; i--) {
        console.log('check position: [' + move.rowOld + ', ' + i + ']');
        if (pawnsArr[move.rowOld][i]) {
          return false;
        }
      }
    } else if (move.rowNew > (move.rowOld + 1)) {
      for (let i = (move.rowOld + 1); i < move.rowNew; i++) {
        console.log('check position: [' + i + ', ' + move.colOld + ']');
        if (pawnsArr[i][move.colOld]) {
          return false;
        }
      }
    } else if (move.rowNew < (move.rowOld - 1)) {
      for (let i = (move.rowOld - 1); i > move.rowNew; i--) {
        console.log('check position: [' + i + ', ' + move.colOld + ']');
        if (pawnsArr[i][move.colOld]) {
          return false;
        }
      }
    }

    return true;
  }

}
