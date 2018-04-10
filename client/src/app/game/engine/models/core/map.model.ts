import { ConstantsService } from '../../../../helpers/constants/constants.service';

import { Chessman } from './chessman.model';
import { Rook } from '../pawns/rook.model';
import { Bishop } from '../pawns/bishop.model';

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

    // black pawns
    this.pawnsArrangement[7][0] = new Rook(7, 0, 'black_rook1', 'black',
      ConstantsService.API_HOST_STATIC + '/public/files/game/images/br.png');
    this.pawnsArrangement[7][7] = new Rook(7, 7, 'black_rook2', 'black',
      ConstantsService.API_HOST_STATIC + '/public/files/game/images/br.png');
    this.pawnsArrangement[7][1] = new Bishop(7, 1, 'black_bishop1', 'black',
      ConstantsService.API_HOST_STATIC + '/public/files/game/images/bb.png');
    this.pawnsArrangement[7][6] = new Bishop(7, 6, 'black_bishop2', 'black',
      ConstantsService.API_HOST_STATIC + '/public/files/game/images/bb.png');
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
