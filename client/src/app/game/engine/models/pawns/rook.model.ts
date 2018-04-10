import { Chessman } from '../core/chessman.model';
import { CheckMove } from '../core/checkmove.model';
import * as fromChessman from '../core/chessman.model';

export class Rook extends Chessman {

  constructor(row: number, col: number, name: string, team: string, bgImg: string) {
    super(row, col, name, team, bgImg);
  }

  checkPawnMove(move: fromChessman.MoveDetails): boolean {
    // check if move is valid for rook (only move in row or in col)
    if ((move.rowMove !== this.row) && (move.colMove !== this.col)) {
      console.log('---NOT VALID MOVE -> NOT ROOK---');
      return false;
    }

    const opponentCollision = CheckMove.rookCheckOpponentsCollision(
      {rowOld: this.row, colOld: this.col, rowNew: move.rowMove, colNew: move.colMove},
      move.pawnsArrangement
    );

    if (!opponentCollision) {
      console.log('---NOT VALID MOVE -> PAWN COLLISION---');
      return false;
    }

    return true;
  }

}
