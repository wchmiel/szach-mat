export class Map {
  private mapW: number; // map board width
  private mapH: number; // map board height
  private fieldW: number; // map board filed width
  private fieldH: number; // map board filed height
  private bgImg: string; // map board image path

  constructor(mapWidth: number, mapHeight: number, fieldWidth: number, filedHeight: number, mapBgImage: string) {
    this.mapW = mapWidth;
    this.mapH = mapHeight;
    this.fieldW = fieldWidth;
    this.fieldH = filedHeight;
    this.bgImg = mapBgImage;
  }

  getMapDim() {
    return {
      mapW: this.mapW,
      mapH: this.mapH,
      fieldW: this.fieldW,
      fieldH: this.fieldH
    };
  }

  getMapBgImg() {
    return this.bgImg;
  }

  setMapDim(mapWidth: number, mapHeight: number) {
    this.mapW = mapWidth;
    this.mapH = mapHeight;
    this.fieldW = mapWidth / 8;
    this.fieldH = mapHeight / 8;
  }
}
