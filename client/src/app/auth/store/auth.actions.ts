import { Action } from '@ngrx/store';
import { UserDatas } from '../../models/user-datas.model';

export const TRY_SIGNUP = 'TRY_SIGNUP';
export const TRY_SIGNIN = 'TRY_SIGNIN';
export const SIGNUP = 'SIGNUP';
export const SIGNIN = 'SIGNIN';
export const SET_TOKEN = 'SET_TOKEN';
export const LOGOUT = 'LOGOUT';

export class TrySignup implements Action {
  readonly type = TRY_SIGNUP;
  constructor(public payload: UserDatas) {}
}

export class Signup implements Action {
  readonly type = SIGNUP;
}

export type AuthActions = TrySignup | Signup;
