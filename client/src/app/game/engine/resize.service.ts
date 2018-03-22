import { ElementRef, Injectable } from '@angular/core';
import { ConstantsService } from '../../helpers/constants/constants.service';

@Injectable()
export class ResizeService {

  constructor(private constService: ConstantsService) {}

  // method count board img dimensions
  public countBoardDim(boardCont: ElementRef, gameCont: ElementRef) {

    let height, width;

    // board container - container for board img
    const boardContHeight = boardCont.nativeElement.clientHeight;
    const boardContWidth = boardCont.nativeElement.clientWidth;

    // game container - max space for board
    const gameContHeight = gameCont.nativeElement.clientHeight;
    const gameContWidth = gameCont.nativeElement.clientWidth;

    if (gameContWidth > gameContHeight) {
      width = height = gameContHeight;
    } else {
      width = height = gameContWidth;
    }

    return { height: height, width: width };
  }
}
