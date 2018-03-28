import { ElementRef, Injectable } from '@angular/core';
import { ConstantsService } from '../../../helpers/constants/constants.service';
import { ResizeService } from './resize.service';
import * as fromMap from '../models/core/map.model';

@Injectable()
export class ControllerService {

  private map: fromMap.Map; // map object
  private teamWithMove: string;

  public mouseButtonDown = false; // flag when user click a mouse button on chess board
  public rowClicked: number; // array cords when user click a mouse button on chess board
  public colClicked: number;
  public mouseMotionX: number; // coords when user drag a pawn
  public mouseMotionY: number;

  constructor(private constService: ConstantsService,
    private resizeService: ResizeService) {

    // initialize map object
    this.map = new fromMap.Map(
      this.constService.BOARD_WIDTH, // change it to value from server
      this.constService.BOARD_HEIGHT, // change it to value from server
      this.constService.API_HOST + '/public/files/game/images/board.jpg'
    );

    // initialize team with move - always white when init
    this.teamWithMove = 'white';

  }

  private countArrCordinates(pixelValue: number) {
    const fieldW = this.map.getMapDim().fieldW;
    let arrCord = Math.floor(pixelValue / fieldW);
    return arrCord = arrCord < 8 ? arrCord : 7;
  }


  public onMouseButtonClicked(clickedX: number, clickedY: number) {
    this.rowClicked = this.countArrCordinates(clickedY);
    this.colClicked = this.countArrCordinates(clickedX);

    console.log(`clicked -> [${ this.rowClicked }, ${ this.colClicked }]`);

  }

  // method invoked when board size is changing (screen resize e.g)
  public onChangeBoardDim(boardCont, gameCont) {
    const dimensions: fromMap.MapDimensions = this.resizeService.countBoardDim(boardCont, gameCont); // count dimensions from resize service

    // set dimensions in map object
    this.map.setMapDim(dimensions);

    return dimensions;
  }

  // method to get pawns arrangement array for view
  public getPawnsArrangement() {
    return this.convertPawnsArrangementCoord();

    // ZWRACAC DO WIDOKU TYLKO TABLICE PLASKA Z ELEMENTAMI KTORE WYSTEPUJA - same pionki do wyswietlenia i juz!

  }

  // return pawnsArrangement with pixels coordinates for view
  private convertPawnsArrangementCoord() {
    const viewPawnsArrangement = [];
    const pawnsArrangement = this.map.getPawnsArrangement();
    const fieldW = this.map.getMapDim().fieldW;
    for (let i = 0; i < 8; i++) {
      viewPawnsArrangement[i] = [];
      for (let j = 0; j < 8; j++) {
        if (pawnsArrangement[i][j]) {
          viewPawnsArrangement[i][j] = {
            ...pawnsArrangement[i][j],
            x_center: pawnsArrangement[i][j].col * fieldW + (fieldW / 2),
            y_center: pawnsArrangement[i][j].row * fieldW + (fieldW / 2)
          };
        }
      }
    }

    return viewPawnsArrangement;
  }

}
