import { Chessman } from '../core/chessman.model';
import { CheckMove } from '../core/checkmove.model';
import * as fromChessman from '../core/chessman.model';

export class Queen extends Chessman {

  constructor(row: number, col: number, name: string, team: string, bgImg: string) {
    super(row, col, name, team, bgImg);
  }

  checkPawnMove(move: fromChessman.MoveDetails): boolean {
    const diffRowMod = Math.abs(move.rowMove - this.row);
    const diffColMod = Math.abs(move.colMove - this.col);

    // check if move is valid for queen
    if (!((diffRowMod === diffColMod) || (move.rowMove === this.row) || (move.colMove === this.col))) {
      console.log('---NOT VALID MOVE -> NOT QUEEN---');
      return false;
    }


    let moveWithoutCollision = true;

    // check opponents collision
    if (diffRowMod === diffColMod) { // move as bishop
      moveWithoutCollision = CheckMove.bishopCheckOpponentsCollision(
        {rowOld: this.row, colOld: this.col, rowNew: move.rowMove, colNew: move.colMove},
        move.pawnsArrangement
      );
    } else if (diffRowMod === 0 || diffColMod === 0) { // move as rook
      moveWithoutCollision = CheckMove.rookCheckOpponentsCollision(
        {rowOld: this.row, colOld: this.col, rowNew: move.rowMove, colNew: move.colMove},
        move.pawnsArrangement
      );
    }

    if (!moveWithoutCollision) {
      console.log('---NOT VALID MOVE -> PAWN COLLISION---');
      return false;
    }

    return true;
  }

}
