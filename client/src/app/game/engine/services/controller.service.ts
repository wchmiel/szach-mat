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

  // private countArrCordinates(pixelValue: number) {
  //
  // }

  // TUTAJ PRZELICZAC NA WSP TABLICOWE


  public onMouseButtonClicked(clickedX: number, clickedY: number) {
    console.log('mam to klik cords!');

    // WYSLAC I PRZELICZAC NA WSP TABLICOWE
  }

  // method invoked when board size is changing (screen resize e.g)
  public onChangeBoardDim(boardCont, gameCont) {
    const dimensions: fromMap.MapDimensions = this.resizeService.countBoardDim(boardCont, gameCont); // count dimensions from resize service

    // set dimensions in map object
    this.map.setMapDim(dimensions);

    return dimensions;
  }

}
