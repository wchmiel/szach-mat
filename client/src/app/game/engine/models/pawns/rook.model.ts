import { Chessman } from '../core/chessman.model';

interface MoveDetails {
  rowMove: number;
  colMove: number;
}

export class Rook extends Chessman {

  constructor(row: number, col: number, name: string, team: string, bgImg: string) {
    super(row, col, name, team, bgImg);
  }

  checkPawnMove(moveDetails: MoveDetails): boolean {
    if ((moveDetails.rowMove !== this.row) && (moveDetails.colMove !== this.col)) { return false; }
    return true;
  }

}
