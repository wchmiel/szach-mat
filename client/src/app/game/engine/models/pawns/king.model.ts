import { Chessman } from '../core/chessman.model';
import { CheckMove } from '../core/checkmove.model';
import * as fromChessman from '../core/chessman.model';

export class King extends Chessman {

  constructor(row: number, col: number, name: string, team: string, bgImg: string) {
    super(row, col, name, team, bgImg);
  }

  checkPawnMove(move: fromChessman.MoveDetails): boolean {

    const diffRowMod = Math.abs(move.rowMove - this.row);
    const diffColMod = Math.abs(move.colMove - this.col);

    // check if move is valid for king
    if (!((diffRowMod === 1 || diffRowMod === 0) && (diffColMod === 1 || diffColMod === 0))) {
      console.log('---NOT VALID MOVE -> NOT KING---');
      return false;
    }

    return true;
  }

}
