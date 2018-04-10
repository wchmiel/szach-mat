import { Chessman } from '../core/chessman.model';
import { CheckMove } from '../core/checkmove.model';
import * as fromChessman from '../core/chessman.model';

export class Bishop extends Chessman {

  constructor(row: number, col: number, name: string, team: string, bgImg: string) {
    super(row, col, name, team, bgImg);
  }

  checkPawnMove(move: fromChessman.MoveDetails): boolean {
    // check if move is valid for rook (only move in row or in col)
    const diffRowMod = (move.rowMove - this.row) > 0 ? move.rowMove - this.row : this.row - move.rowMove;
    const diffColMod = (move.colMove - this.col) > 0 ? move.colMove - this.col : this.col - move.colMove;
    if (diffRowMod !== diffColMod) {
      console.log('---NOT VALID MOVE -> NOT BISHOP---');
      return false;
    }


    const opponentCollision = CheckMove.bishopCheckOpponentsCollision(
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
