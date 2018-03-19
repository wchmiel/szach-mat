import { Action } from '@ngrx/store';

export const TRY_UPLOAD_FILE = 'TRY_UPLOAD_FILE';
export const UPLOAD_FILE = 'UPLOAD_FILE';
export const UPLOAD_FILE_ERR = 'UPLOAD_FILE_ERR';
export const TRY_EDIT_USER_DATA = 'TRY_EDIT_USER_DATA';

export class TryUploadFile implements Action {
  readonly type = TRY_UPLOAD_FILE;
  constructor(public payload: File) {}
}

export class UploadFile implements Action {
  readonly type = UPLOAD_FILE;
  // constructor(public payload: {success: boolean, message: string}) {}
  constructor(public payload) {}
}

export class UploadFileErr implements Action {
  readonly type = UPLOAD_FILE_ERR;
  // constructor(public payload: {success: boolean, message: string}) {}
  constructor(public payload) {}
}

export class TryEditUserDatas implements Action {
  readonly type = TRY_EDIT_USER_DATA;
  // constructor(public payload: {success: boolean, message: string}) {}
  constructor(public payload) {}
}

export type AccountActions = TryUploadFile | UploadFile | UploadFileErr | TryEditUserDatas;
