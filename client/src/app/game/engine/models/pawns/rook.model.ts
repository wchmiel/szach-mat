import { Chessman } from '../core/chessman.model';
import { CheckMove } from '../core/checkmove.model';
import * as fromChessman from '../core/chessman.model';

export class Rook extends Chessman {

  constructor(row: number, col: number, name: string, team: string, bgImg: string) {
    super(row, col, name, team, bgImg);
  }

  checkPawnMove(move: fromChessman.MoveDetails): boolean {
    if (!CheckMove.moveOnTheSamePosition({rowOld: this.row, colOld: this.col, rowNew: move.rowMove, colNew: move.colMove})) {
      return false;
    }

    if ((move.rowMove !== this.row) && (move.colMove !== this.col)) { return false; }
    return true;
  }

}
