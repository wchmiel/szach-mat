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
    const diffRowMod = Math.abs(move.rowNew - move.rowOld);
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

  static whitePawn(move: fromChessman.FromOldToNewPositionMove, pawnsArr): boolean {
    if (move.rowNew <= move.rowOld) {
      return false;
    } else if (move.rowOld === 1 && (move.rowNew === move.rowOld + 2) && move.colNew === move.colOld) { // when white pawn is on the 1 line
      if (pawnsArr[move.rowOld + 1][move.colOld] || pawnsArr[move.rowOld + 2][move.colOld]) {
        return false;
      } else {
        return true;
      }
    } else {
      if (move.rowNew === (move.rowOld + 1) && move.colNew === move.colOld && (!pawnsArr[move.rowNew][move.colNew])) {
        return true;
      }
      if (move.rowNew === (move.rowOld + 1) && (move.colNew === (move.colOld + 1) || move.colNew === (move.colOld - 1))) {
        if (pawnsArr[move.rowNew][move.colNew] && (pawnsArr[move.rowNew][move.colNew].getPawnTeam() === 'black')) {
          return true;
        }
      }
    }
    return false;
  }

  static blackPawn(move: fromChessman.FromOldToNewPositionMove, pawnsArr): boolean {
    if (move.rowNew >= move.rowOld) {
      return false;
    } else if (move.rowOld === 6 && (move.rowNew === move.rowOld - 2) && move.colNew === move.colOld) { // when pawn on 6 line
      if (pawnsArr[move.rowOld - 1][move.colOld] || pawnsArr[move.rowOld - 2][move.colOld]) {
        return false;
      } else {
        return true;
      }
    } else {
      if (move.rowNew === (move.rowOld - 1) && move.colNew === move.colOld && (!pawnsArr[move.rowNew][move.colNew])) {
        return true;
      }
      if (move.rowNew === (move.rowOld - 1) && (move.colNew === (move.colOld + 1) || move.colNew === (move.colOld - 1))) {
        if (pawnsArr[move.rowNew][move.colNew] && (pawnsArr[move.rowNew][move.colNew].getPawnTeam() === 'white')) {
          return true;
        }
      }
    }
    return false;
  }

}
