import { Component, OnInit, ViewChild, ElementRef, Renderer2, HostListener } from '@angular/core';

import { AppService } from '../../app.service';
import { ConstantsService } from '../../helpers/constants/constants.service';
import { ControllerService } from '../engine/services/controller.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  public apiUrl = this.constService.API_HOST;

  @ViewChild('boardCont') boardCont: ElementRef;
  @ViewChild('gameCont') gameCont: ElementRef;
  // @HostListener('mousedown', ['$event']) mousedown(eventData: Event) {
  //   console.log(this.boardCont);
  // }

  constructor(private constService: ConstantsService,
    private renderer: Renderer2,
    private controllerService: ControllerService,
    private appService: AppService) { }

  ngOnInit() {

    const self = this;

    this.boardCont.nativeElement.onmousedown = function (event) {
      self.controllerService.onMouseButtonClicked(event['offsetX'], event['offsetY']);
    };
    //
    // this.boardCont.nativeElement.onmouseup = function () {
    //   console.log('onmouseup');
    // };
    // this.boardCont.nativeElement.ondrag = function () {
    //   console.log('ondrag');
    // };
    // this.boardCont.nativeElement.ondragstart = function () {
    //   console.log('ondragstart');
    // };
    // this.boardCont.nativeElement.ondragend = function () {
    //   console.log('ondragend');
    // };
    // this.boardCont.nativeElement.ondragenter = function () {
    //   console.log('ondragenter');
    // };
    // this.boardCont.nativeElement.ondragleave = function () {
    //   console.log('ondragleave');
    // };
    // this.boardCont.nativeElement.ondragover = function () {
    //   console.log('ondragover');
    // };

    this.setBoardDimensions();

    // widnow resize event from app component
    this.appService.windowResizeEvent.subscribe((windowWidth: number) => {
      this.setBoardDimensions();
    });

  }

  setBoardDimensions() {
    // const dimensions = this.resizeService.countBoardDim(this.boardCont, this.gameCont);
    const dimensions = this.controllerService.onChangeBoardDim(this.boardCont, this.gameCont);

    this.renderer.setStyle(this.boardCont.nativeElement.firstElementChild, 'height', dimensions.height + 'px');
    this.renderer.setStyle(this.boardCont.nativeElement.firstElementChild, 'width', dimensions.width + 'px');

    // console.log(dimensions);
  }

}
