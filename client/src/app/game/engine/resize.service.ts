import { ElementRef, Injectable } from '@angular/core';
import { ConstantsService } from '../../helpers/constants/constants.service';

@Injectable()
export class ResizeService {

  private boardImgWidth;
  private boardImgHeight;

  constructor(private constService: ConstantsService) {}

  // method count board img dimensions
  public countBoardDim(boardCont: ElementRef, gameCont: ElementRef) {

    const boardContHeight = boardCont.nativeElement.clientHeight;
    const boardContWidth = boardCont.nativeElement.clientWidth;
    const gameContHeight = gameCont.nativeElement.clientHeight;
    const gameContWidth = gameCont.nativeElement.clientWidth;
    console.log(boardCont);
    console.log('boardContWidth -> ' + boardContWidth);
    console.log('gameContWidth -> ' + gameContWidth);

    let height = boardContHeight;
    let width = height;

    if (gameContWidth < this.constService.BOARD_WIDTH) {
      width = height = gameContWidth;
    }
    if (gameContHeight < this.constService.BOARD_HEIGHT) {
      width = height = gameContHeight;
    }

    this.boardImgHeight = height;
    this.boardImgWidth = width;

    return {
      height: height,
      width: width
    };
  }
}
