import { environment } from '../../../environments/environment';

export class ConstantsService {

  public static API_HOST_STATIC = environment.production ? 'https://' + window.location.host : 'http://localhost:3000';
  public API_HOST = environment.production ? 'https://' + window.location.host : 'http://localhost:3000';
  public XS_RES = 576;
  public SM_RES = 768;
  public MD_RES = 992;
  public LG_RES = 1200;
  public BOARD_WIDTH = 800;
  public BOARD_HEIGHT = 800;
  public PAWN_INIT_WIDTH = 80;
  public PAWN_INIT_HEIGHT = 80;

}
