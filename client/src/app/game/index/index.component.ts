import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';

import { AppService } from '../../app.service';
import { ConstantsService } from '../../helpers/constants/constants.service';
import { ResizeService } from '../engine/services/resize.service';

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
    private resizeService: ResizeService,
    private appService: AppService) { }

  ngOnInit() {

    this.setBoardDimensions();

    // widnow resize event from app component
    this.appService.windowResizeEvent.subscribe((windowWidth: number) => {
      this.setBoardDimensions();
    });

  }

  setBoardDimensions() {
    const dimensions = this.resizeService.countBoardDim(this.boardCont, this.gameCont);

    this.renderer.setStyle(this.boardCont.nativeElement.firstElementChild, 'height', dimensions.height + 'px');
    this.renderer.setStyle(this.boardCont.nativeElement.firstElementChild, 'width', dimensions.width + 'px');

    // console.log(dimensions);
  }

}
