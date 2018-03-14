import { Action } from '@ngrx/store';

export const TRY_UPLOAD_FILE = 'TRY_UPLOAD_FILE';
export const UPLOAD_FILE = 'UPLOAD_FILE';
export const UPLOAD_FILE_ERR = 'UPLOAD_FILE_ERR';

export class TryUploadFile implements Action {
  readonly type = TRY_UPLOAD_FILE;
  constructor(public payload: File) {}
}

export type AccountActions = TryUploadFile;
