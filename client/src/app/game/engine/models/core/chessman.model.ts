export abstract class Chessman {

  constructor(
    protected row: number,
    protected col: number,
    protected name: string,
    protected team: string,
    protected bgImg: string
  ) {}

  abstract checkPawnMove(): boolean; // method check pawn move and return the answer

  get getPawnName() {
    return this.name;
  }

  get getPawnTeam() {
    return this.team;
  }

  get getPawnArrangement() {
    return {
      row: this.row,
      col: this.col
    };
  }

  set setPawnPosition(rowMove: number, colMove: number) {
    this.row = rowMove;
    this.col = colMove;
  }
}
