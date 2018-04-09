import { ElementRef, Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { ConstantsService } from '../../../helpers/constants/constants.service';
import { ResizeService } from './resize.service';
import * as fromMap from '../models/core/map.model';

@Injectable()
export class ControllerService {

  private map: fromMap.Map; // map object
  private teamWithMove: string;

  public mouseButtonDown = false; // flag when user click a mouse button on chess board
  public pawnClickedName = null; // name of clicked pawn
  public rowClicked: number; // array cords when user click a mouse button on chess board
  public colClicked: number;
  public mouseMotionX: number; // coords when user drag a pawn
  public mouseMotionY: number;
  public pawnsArrangementChangedEvent = new Subject();

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

  // method convert pixels to arrayCoordinates [row, col]
  private countArrCoordinates(pixelValue: number) {
    const fieldW = this.map.getMapDim().fieldW;
    let arrCord = Math.floor(pixelValue / fieldW);
    return arrCord = arrCord < 8 ? arrCord : 7;
  }

  // method convert arrayCoordinates [row, col] to pixels
  private countPixelCoordinates(arrValue: number) {
    const fieldW = this.map.getMapDim().fieldW;
    return arrValue * fieldW + (fieldW / 2);
  }


  public onMouseButtonClicked(clickedX: number, clickedY: number) {
    const pawns = this.map.getPawnsArrangement();
    this.rowClicked = this.countArrCoordinates(clickedY);
    this.colClicked = this.countArrCoordinates(clickedX);

    if (pawns[this.rowClicked][this.colClicked]) {
      this.mouseButtonDown = true;
      this.pawnClickedName = pawns[this.rowClicked][this.colClicked].name;
      console.log(`clicked -> [${ this.rowClicked }, ${ this.colClicked }]`);
    }

  }

  public onMouseButtonReleased(releasedX: number, releasedY: number) {
    if (this.mouseButtonDown) {
      this.mouseButtonDown = false;
      this.pawnClickedName = null;
      const releasedRow = this.countArrCoordinates(releasedY);
      const releasedCol = this.countArrCoordinates(releasedX);
      console.log(`released -> [${ releasedRow }, ${ releasedCol }]`);


      // AKTUALNIE TYLKO VALIDACJA RUCHU PO STRONIE KLIENTA! DOROBIC PO STRONIE SERWERA i dopiero wtedy akceptacja!
      const pawn = this.map.getPawnsArrangement()[this.rowClicked][this.colClicked];
      const movePermission = pawn.checkPawnMove({
        rowMove: releasedRow,
        colMove: releasedCol
      });
      console.log(movePermission);

      if (movePermission) {
        // set new pawn possition in map object
        this.map.setPawnsArrangement({
          rowOld: this.rowClicked,
          colOld: this.colClicked,
          rowNew: releasedRow,
          colNew: releasedCol
        });
      }

      this.pawnsArrangementChangedEvent.next();
    }
  }

  public onMouseLeave() {
    this.mouseButtonDown = false;
    this.pawnClickedName = null;
  }

  // method return original pawns coordinates in pixels before pawn moved
  public getOriginalPawnViewCoord() {
    return {
      x: this.countPixelCoordinates(this.colClicked),
      y: this.countPixelCoordinates(this.rowClicked)
    };
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
  }

  public getPawnsArrangementWithNamesKeys() {
    const pawnsArrWithNamesKeys = [];
    const pawnsArr = this.convertPawnsArrangementCoord();
    pawnsArr.forEach((pawn, index) => {
      pawnsArrWithNamesKeys[pawn.name] = pawn;
    });
    return pawnsArrWithNamesKeys;
  }

  // return pawnsArrangement with pixels coordinates for view to display
  private convertPawnsArrangementCoord() {
    const viewPawnsArrangement = [];
    const pawnsArrangement = this.map.getPawnsArrangement();
    const fieldW = this.map.getMapDim().fieldW;
    for (let i = 0; i < 8; i++) {
      // viewPawnsArrangement[i] = [];
      for (let j = 0; j < 8; j++) {
        if (pawnsArrangement[i][j]) {
          viewPawnsArrangement.push({
            ...pawnsArrangement[i][j],
            x_center: pawnsArrangement[i][j].col * fieldW + (fieldW / 2),
            y_center: pawnsArrangement[i][j].row * fieldW + (fieldW / 2)
          });
        }
      }
    }

    return viewPawnsArrangement;
  }

}
