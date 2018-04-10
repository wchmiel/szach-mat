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

  static bishopCheckOpponentsCollision(move: fromChessman.FromOldToNewPositionMove, pawnsArr): boolean {
    const diffRow = move.rowNew - move.rowOld;
    const diffCol = move.colNew - move.colOld;
    const diffRowMod = (move.rowNew - move.rowOld) > 0 ? move.rowNew - move.rowOld : move.rowOld - move.rowNew;
    for (let i = 1; i < diffRowMod; i++) {
      let rowTemp, colTemp;
      if (diffRow > 1 && diffCol > 1) {
        rowTemp = move.rowOld + i; colTemp = move.colOld + i;
      } else if (diffRow < -1 && diffCol < -1) {
        rowTemp = move.rowOld - i; colTemp = move.colOld - i;
      } else if (diffRow > 1 && diffCol < -1) {
        rowTemp = move.rowOld + i; colTemp = move.colOld - i;
      } else if (diffRow < -1 && diffCol > 1) {
        rowTemp = move.rowOld - i; colTemp = move.colOld + i;
      }

      if (pawnsArr[rowTemp][colTemp]) {
        return false;
      }
      console.log('check position: [' + rowTemp + ', ' + colTemp + ']');
    }

    return true;
  }

}
