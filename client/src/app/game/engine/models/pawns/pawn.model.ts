import { Chessman } from '../core/chessman.model';
import { CheckMove } from '../core/checkmove.model';
import * as fromChessman from '../core/chessman.model';

export class Pawn extends Chessman {

  constructor(row: number, col: number, name: string, team: string, bgImg: string) {
    super(row, col, name, team, bgImg);
  }

  checkPawnMove(move: fromChessman.MoveDetails): boolean {

    const diffRowMod = Math.abs(move.rowMove - this.row);
    const diffColMod = Math.abs(move.colMove - this.col);

    // check if move is valid for pawn
    let moveCorrect = false;
    if (this.team === 'white') {
      moveCorrect = CheckMove.whitePawn(
        {rowOld: this.row, colOld: this.col, rowNew: move.rowMove, colNew: move.colMove},
        move.pawnsArrangement
      );
    } else {
      moveCorrect = CheckMove.blackPawn(
        {rowOld: this.row, colOld: this.col, rowNew: move.rowMove, colNew: move.colMove},
        move.pawnsArrangement
      );
    }

    if (!moveCorrect) {
      console.log('---NOT VALID MOVE -> NOT PAWN---');
      return false;
    }

    return true;
  }

}
