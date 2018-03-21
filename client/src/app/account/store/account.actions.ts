import { Action } from '@ngrx/store';

export const TRY_UPLOAD_FILE = 'TRY_UPLOAD_FILE';
export const UPLOAD_FILE = 'UPLOAD_FILE';
export const UPLOAD_FILE_ERR = 'UPLOAD_FILE_ERR';
export const TRY_EDIT_USER_DATA = 'TRY_EDIT_USER_DATA';
export const EDIT_USER_DATA = 'EDIT_USER_DATA';
export const EDIT_USER_DATA_ERR = 'EDIT_USER_DATA_ERR';
export const GET_USER_DATA = 'GET_USER_DATA';
export const SAVE_USER_DATA = 'SAVE_USER_DATA';

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

export class TryEditUserData implements Action {
  readonly type = TRY_EDIT_USER_DATA;
  // constructor(public payload: {success: boolean, message: string}) {}
  constructor(public payload) {}
}

export class EditUserData implements Action {
  readonly type = EDIT_USER_DATA;
  constructor(public payload) {}
}

export class EditUserDataErr implements Action {
  readonly type = EDIT_USER_DATA_ERR;
  constructor(public payload) {}
}

export class GetUserData implements Action {
  readonly type = GET_USER_DATA;
}

export class SaveUserData implements Action {
  readonly type = SAVE_USER_DATA;
  constructor(public payload) {}
}

export type AccountActions =
TryUploadFile |
UploadFile |
UploadFileErr |
TryEditUserData |
EditUserData |
EditUserDataErr |
GetUserData |
SaveUserData;
