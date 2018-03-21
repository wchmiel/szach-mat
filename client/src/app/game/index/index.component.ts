import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';

import { AppService } from '../../app.service';
import { ConstantsService } from '../../helpers/constants/constants.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  @ViewChild('boardCont') boardCont: ElementRef;
  @ViewChild('gameCont') gameCont: ElementRef;

  public apiUrl = this.constService.API_HOST;

  constructor(private constService: ConstantsService,
    private renderer: Renderer2,
    private appService: AppService) { }

  ngOnInit() {

    this.setBoardDimensions();

    // widnow resize event from app component
    this.appService.windowResizeEvent.subscribe((windowWidth: number) => {
      this.setBoardDimensions();
    });

  }

  setBoardDimensions() {
    const boardContHeight = this.boardCont.nativeElement.clientHeight;
    const boardContWidth = this.boardCont.nativeElement.clientWidth;
    const gameContWidth = this.gameCont.nativeElement.clientWidth;
    console.log('boardContWidth -> ' + boardContWidth);
    console.log('gameContWidth -> ' + gameContWidth);
    this.renderer.setStyle(this.boardCont.nativeElement.firstElementChild, 'height', boardContHeight + 'px');

    if (gameContWidth < boardContWidth) {
      this.renderer.setStyle(this.boardCont.nativeElement.firstElementChild, 'width', gameContWidth + 'px');
    }
  }

}
