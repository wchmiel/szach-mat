import { Chessman } from '../core/chessman.model';
import { CheckMove } from '../core/checkmove.model';
import * as fromChessman from '../core/chessman.model';

export class Knight extends Chessman {

  constructor(row: number, col: number, name: string, team: string, bgImg: string) {
    super(row, col, name, team, bgImg);
  }

  checkPawnMove(move: fromChessman.MoveDetails): boolean {
    // check if move is valid for knight
    const diffRowMod = Math.abs(move.rowMove - this.row); // value always positive
    const diffColMod = Math.abs(move.colMove - this.col); // value always positive

    if (!((diffRowMod === 1 && diffColMod === 2) || (diffRowMod === 2 && diffColMod === 1))) {
      console.log('---NOT VALID MOVE -> NOT KNIGHT---');
      return false;
    }

    return true;
  }

}
