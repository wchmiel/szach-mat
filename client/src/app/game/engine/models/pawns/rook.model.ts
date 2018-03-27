import { Chessman } from '../core/chessman.model';

export class Rook extends Chessman {

  constructor(row: number, col: number, name: string, team: string, bgImg: string) {
    super(row, col, name, team, bgImg);
  }

  checkPawnMove(): boolean {
    return true;
  }

}
