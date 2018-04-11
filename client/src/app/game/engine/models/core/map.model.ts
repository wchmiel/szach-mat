import { ConstantsService } from '../../../../helpers/constants/constants.service';

import { Chessman } from './chessman.model';
import { Rook } from '../pawns/rook.model';
import { Bishop } from '../pawns/bishop.model';
import { Knight } from '../pawns/knight.model';
import { Queen } from '../pawns/queen.model';
import { King } from '../pawns/king.model';
import { Pawn } from '../pawns/pawn.model';

export interface MapDimensions {
  width: number;
  height: number;
}

export interface MovePawnDetails {
  rowOld: number;
  colOld: number;
  rowNew: number;
  colNew: number;
}

export class Map {
  private mapW: number; // map board width
  private mapH: number; // map board height
  private fieldW: number; // map board filed width
  private fieldH: number; // map board filed height
  private bgImg: string; // map board image path
  private pawnsArrangement = []; // main array to store pawns arrangement on board

  constructor(mapWidth: number, mapHeight: number, mapBgImage: string) {
    this.mapW = mapWidth;
    this.mapH = mapHeight;
    this.fieldW = mapWidth / 8;
    this.fieldH = mapHeight / 8;
    this.bgImg = mapBgImage;

    // initialize pawnsArrangement
    this.initPawnsArrangement();

    // populate pawnsArrangement with pawns
    this.populatePawnsArrangement();
  }

  private initPawnsArrangement(): void {
    for (let i = 0; i < 8; i++) {
      this.pawnsArrangement[i] = new Array<Chessman>();
    }
  }

  private populatePawnsArrangement(): void {
    // white pawns
    this.pawnsArrangement[0][0] = new Rook(0, 0, 'white_rook1', 'white',
      ConstantsService.API_HOST_STATIC + '/public/files/game/images/wr.png');
    this.pawnsArrangement[0][7] = new Rook(0, 7, 'white_rook2', 'white',
      ConstantsService.API_HOST_STATIC + '/public/files/game/images/wr.png');
    this.pawnsArrangement[0][1] = new Bishop(0, 1, 'white_bishop1', 'white',
      ConstantsService.API_HOST_STATIC + '/public/files/game/images/wb.png');
    this.pawnsArrangement[0][6] = new Bishop(0, 6, 'white_bishop2', 'white',
      ConstantsService.API_HOST_STATIC + '/public/files/game/images/wb.png');
    this.pawnsArrangement[0][2] = new Knight(0, 2, 'white_knight1', 'white',
      ConstantsService.API_HOST_STATIC + '/public/files/game/images/wn.png');
    this.pawnsArrangement[0][5] = new Knight(0, 5, 'white_knight2', 'white',
      ConstantsService.API_HOST_STATIC + '/public/files/game/images/wn.png');
    this.pawnsArrangement[0][3] = new Queen(0, 3, 'white_queen', 'white',
      ConstantsService.API_HOST_STATIC + '/public/files/game/images/wq.png');
    this.pawnsArrangement[0][4] = new King(0, 4, 'white_king', 'white',
      ConstantsService.API_HOST_STATIC + '/public/files/game/images/wk.png');
    this.pawnsArrangement[1][0] = new Pawn(1, 0, 'white_pawn1', 'white',
      ConstantsService.API_HOST_STATIC + '/public/files/game/images/wp.png');
    this.pawnsArrangement[1][1] = new Pawn(1, 1, 'white_pawn2', 'white',
      ConstantsService.API_HOST_STATIC + '/public/files/game/images/wp.png');
    this.pawnsArrangement[1][2] = new Pawn(1, 2, 'white_pawn3', 'white',
      ConstantsService.API_HOST_STATIC + '/public/files/game/images/wp.png');
    this.pawnsArrangement[1][3] = new Pawn(1, 3, 'white_pawn4', 'white',
      ConstantsService.API_HOST_STATIC + '/public/files/game/images/wp.png');
    this.pawnsArrangement[1][4] = new Pawn(1, 4, 'white_pawn5', 'white',
      ConstantsService.API_HOST_STATIC + '/public/files/game/images/wp.png');
    this.pawnsArrangement[1][5] = new Pawn(1, 5, 'white_pawn6', 'white',
      ConstantsService.API_HOST_STATIC + '/public/files/game/images/wp.png');
    this.pawnsArrangement[1][6] = new Pawn(1, 6, 'white_pawn7', 'white',
      ConstantsService.API_HOST_STATIC + '/public/files/game/images/wp.png');
    this.pawnsArrangement[1][7] = new Pawn(1, 7, 'white_pawn8', 'white',
      ConstantsService.API_HOST_STATIC + '/public/files/game/images/wp.png');

    // black pawns
    this.pawnsArrangement[7][0] = new Rook(7, 0, 'black_rook1', 'black',
      ConstantsService.API_HOST_STATIC + '/public/files/game/images/br.png');
    this.pawnsArrangement[7][7] = new Rook(7, 7, 'black_rook2', 'black',
      ConstantsService.API_HOST_STATIC + '/public/files/game/images/br.png');
    this.pawnsArrangement[7][1] = new Bishop(7, 1, 'black_bishop1', 'black',
      ConstantsService.API_HOST_STATIC + '/public/files/game/images/bb.png');
    this.pawnsArrangement[7][6] = new Bishop(7, 6, 'black_bishop2', 'black',
      ConstantsService.API_HOST_STATIC + '/public/files/game/images/bb.png');
    this.pawnsArrangement[7][2] = new Knight(7, 2, 'black_knight1', 'black',
      ConstantsService.API_HOST_STATIC + '/public/files/game/images/bn.png');
    this.pawnsArrangement[7][5] = new Knight(7, 5, 'black_knight2', 'black',
      ConstantsService.API_HOST_STATIC + '/public/files/game/images/bn.png');
    this.pawnsArrangement[7][3] = new Queen(7, 3, 'black_queen', 'black',
      ConstantsService.API_HOST_STATIC + '/public/files/game/images/bq.png');
    this.pawnsArrangement[7][4] = new King(7, 4, 'black_king', 'black',
      ConstantsService.API_HOST_STATIC + '/public/files/game/images/bk.png');
    this.pawnsArrangement[6][0] = new Pawn(6, 0, 'black_pawn1', 'black',
      ConstantsService.API_HOST_STATIC + '/public/files/game/images/bp.png');
    this.pawnsArrangement[6][1] = new Pawn(6, 1, 'black_pawn2', 'black',
      ConstantsService.API_HOST_STATIC + '/public/files/game/images/bp.png');
    this.pawnsArrangement[6][2] = new Pawn(6, 2, 'black_pawn3', 'black',
      ConstantsService.API_HOST_STATIC + '/public/files/game/images/bp.png');
    this.pawnsArrangement[6][3] = new Pawn(6, 3, 'black_pawn4', 'black',
      ConstantsService.API_HOST_STATIC + '/public/files/game/images/bp.png');
    this.pawnsArrangement[6][4] = new Pawn(6, 4, 'black_pawn5', 'black',
      ConstantsService.API_HOST_STATIC + '/public/files/game/images/bp.png');
    this.pawnsArrangement[6][5] = new Pawn(6, 5, 'black_pawn6', 'black',
      ConstantsService.API_HOST_STATIC + '/public/files/game/images/bp.png');
    this.pawnsArrangement[6][6] = new Pawn(6, 6, 'black_pawn7', 'black',
      ConstantsService.API_HOST_STATIC + '/public/files/game/images/bp.png');
    this.pawnsArrangement[6][7] = new Pawn(6, 7, 'black_pawn8', 'black',
      ConstantsService.API_HOST_STATIC + '/public/files/game/images/bp.png');
  }

  public getMapDim() {
    return {
      mapW: this.mapW,
      mapH: this.mapH,
      fieldW: this.fieldW,
      fieldH: this.fieldH
    };
  }

  public getMapBgImg() {
    return this.bgImg;
  }

  public getPawnsArrangement() {
    return this.pawnsArrangement;
  }

  public setPawnsArrangement(moveDetails: MovePawnDetails): void {
    const pawnToMove = this.pawnsArrangement[moveDetails.rowOld][moveDetails.colOld];

    // changes in pawns objects
    pawnToMove.setPawnPosition({
      rowMove: moveDetails.rowNew,
      colMove: moveDetails.colNew
    });

    // changes in pawnsArrangement array
    this.pawnsArrangement[moveDetails.rowNew][moveDetails.colNew] = this.pawnsArrangement[moveDetails.rowOld][moveDetails.colOld];
    this.pawnsArrangement[moveDetails.rowOld][moveDetails.colOld] = null;

    console.log(this.pawnsArrangement);
  }

  public setMapDim(mapDim: MapDimensions): void {
    this.mapW = mapDim.width;
    this.mapH = mapDim.height;
    this.fieldW = mapDim.width / 8;
    this.fieldH = mapDim.height / 8;
  }

}
