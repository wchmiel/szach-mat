import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Renderer2, HostListener } from '@angular/core';

import { AppService } from '../../app.service';
import { ConstantsService } from '../../helpers/constants/constants.service';
import { ControllerService } from '../engine/services/controller.service';
import { GameService } from '../game.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, AfterViewInit {

  public apiUrl = this.constService.API_HOST;
  public initPawnsArrangement = []; // array of pawns to initialize html
  private pawnsArrangement = []; // array of pawns arrangement for view
  private clickedPawnElemRef = null; // clicked pawn elementRef to drag particular pawn when clicked
  private boardScale = 1;
  private pawnsWidth = null;
  private pawnsHeight = null;

  @ViewChild('boardCont') boardCont: ElementRef;
  @ViewChild('gameCont') gameCont: ElementRef;
  @ViewChild('pawnsCont') pawnsCont: ElementRef;
  @ViewChild('clickArea') clickArea: ElementRef;

  constructor(private constService: ConstantsService,
    private renderer: Renderer2,
    private gameService: GameService,
    private controllerService: ControllerService,
    private appService: AppService) { }

  ngOnInit() {

    const self = this;

    // CLICK ON PAWN
    this.boardCont.nativeElement.onmousedown = function (event) {
      document.body.style.cursor = 'move';
      self.controllerService.onMouseButtonClicked(event['offsetX'], event['offsetY']);

      const pawnsElemRef = Array.from(self.pawnsCont.nativeElement.children); // array with all pawns ElementRef
      pawnsElemRef.forEach((pawn, index) => {
        if (pawn['name'] === self.controllerService.pawnClickedName) {
          self.clickedPawnElemRef = pawn; // set clicked pawn elementRef
        }
      });

      if (self.clickedPawnElemRef !== null) {
        self.renderer.addClass(self.clickedPawnElemRef, 'dragStarted'); // add css class to change cursor
      }
    };

    // RELEASED PAWN
    this.boardCont.nativeElement.onmouseup = function (event) {
      if (self.controllerService.mouseButtonDown) {
        document.body.style.cursor = 'default';
        self.controllerService.onMouseButtonReleased(event['offsetX'], event['offsetY']);

        if (self.clickedPawnElemRef !== null) {
          self.renderer.removeClass(self.clickedPawnElemRef, 'dragStarted'); // remove css class to change cursor
          self.clickedPawnElemRef = null; // reset clicked pawn elementRef
        }
      }
    };

    this.boardCont.nativeElement.onmouseleave = function () {
      if (self.controllerService.mouseButtonDown) {
        document.body.style.cursor = 'default';
        const originalPawnCoord = self.controllerService.getOriginalPawnViewCoord();
        const top = originalPawnCoord.y - (self.pawnsHeight / 2);
        const left = originalPawnCoord.x - (self.pawnsWidth / 2);
        // console.log(top + ' , ' + left);
        self.renderer.setStyle(self.clickedPawnElemRef, 'top', top + 'px');
        self.renderer.setStyle(self.clickedPawnElemRef, 'left', left + 'px');

        self.controllerService.onMouseLeave();
        self.renderer.removeClass(self.clickedPawnElemRef, 'dragStarted'); // remove css class to change cursor
        // self.clickedPawnElemRef = null; // reset clicked pawn elementRef
      }
    };

    this.boardCont.nativeElement.onmousemove = function (event) {
      if (self.controllerService.mouseButtonDown) {
        const top = event['offsetY'] - (self.pawnsHeight / 2);
        const left = event['offsetX'] - (self.pawnsWidth / 2);
        self.renderer.setStyle(self.clickedPawnElemRef, 'top', top + 'px');
        self.renderer.setStyle(self.clickedPawnElemRef, 'left', left + 'px');
      }
    };

    console.log(this.boardCont);
    // this.boardCont.nativeElement.ondrag = function () {
    //   console.log('ondrag');
    // };
    this.boardCont.nativeElement.ondragstart = function (event) {
      event.preventDefault();
    };
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


    this.initPawnsArrangement = this.controllerService.getPawnsArrangement();
    this.pawnsArrangement = this.controllerService.getPawnsArrangementWithNamesKeys();
    // console.log(this.pawnsArrangement);



    // widnow resize event from app component
    this.appService.windowResizeEvent.subscribe((windowWidth: number) => {
      this.setBoardDimensions();
      this.pawnsArrangement = this.controllerService.getPawnsArrangementWithNamesKeys();
      this.setPawnsDimAndPos();
    });

    // event from sidebar component
    this.gameService.toggleSidebarEvent.subscribe(() => {
      this.setBoardDimensions();
      this.pawnsArrangement = this.controllerService.getPawnsArrangementWithNamesKeys();
      this.setPawnsDimAndPos();
    });

    // event from controller when pawnsArrangement will change
    this.controllerService.pawnsArrangementChangedEvent.subscribe(() => {

      this.pawnsArrangement = this.controllerService.getPawnsArrangementWithNamesKeys();
      this.setPawnsDimAndPos();
    });

    // const arr = this.pawnsCont.nativeElement.children;
    //
    //     console.log(arr.length);
    // setTimeout(function() {
    //   console.log(arr.length);
    // }, 1000);

  }

  ngAfterViewInit() {
    this.setPawnsDimAndPos();
  }

  setBoardDimensions() {

    const dimensions = this.controllerService.onChangeBoardDim(this.boardCont, this.gameCont);

    this.renderer.setStyle(this.boardCont.nativeElement.firstElementChild, 'height', dimensions.height + 'px');
    this.renderer.setStyle(this.boardCont.nativeElement.firstElementChild, 'width', dimensions.width + 'px');

    // console.log(dimensions);
  }

  // method to set pawns dimensions and position on board. Also responsible for removing pawns from view!
  setPawnsDimAndPos() {
    const pawnsElemRef = Array.from(this.pawnsCont.nativeElement.children); // array with all pawns ElementRef
    this.boardScale = this.boardCont.nativeElement.clientWidth / this.constService.BOARD_WIDTH;
    this.pawnsWidth = this.constService.PAWN_INIT_WIDTH * this.boardScale;
    this.pawnsHeight = this.constService.PAWN_INIT_HEIGHT * this.boardScale;

    // console.log(pawnsElemRef);
    // console.log(this.pawnsArrangement);

    pawnsElemRef.forEach((pawn, index) => {

      // console.log(this.pawnsArrangement[pawn['name']]);
      // console.log(pawn);

      // change pawn arrangement when pawn still in game
      if (this.pawnsArrangement[pawn['name']]) {
        const top = this.pawnsArrangement[pawn['name']].y_center - (this.pawnsHeight / 2);
        const left = this.pawnsArrangement[pawn['name']].x_center - (this.pawnsWidth / 2);

        this.renderer.setStyle(pawn, 'width', this.pawnsWidth + 'px');
        this.renderer.setStyle(pawn, 'height', this.pawnsHeight + 'px');
        this.renderer.setStyle(pawn, 'top', top + 'px');
        this.renderer.setStyle(pawn, 'left', left + 'px');
      } else { // remove pawn when it doesn't exist in pawnsArrangement array
        console.log('------ REMOVE PAWN -> ' + pawn['name'] + ' --------');
        this.removePawnFromView(pawn, pawnsElemRef);
      }
    });
  }

  removePawnFromView(pawn, pawnsElemRef) {
    this.renderer.removeChild(pawnsElemRef, pawn);
  }

}
