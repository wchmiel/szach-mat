import { Action } from '@ngrx/store';
import { UserDatas } from '../../models/user-datas.model';

export const TRY_SIGNUP = 'TRY_SIGNUP';
export const TRY_SIGNIN = 'TRY_SIGNIN';
export const SIGNUP = 'SIGNUP';
export const SIGNUP_ERR = 'SIGNUP_ERR';
export const SIGNUP_MESS_SHOWN = 'SIGNUP_MESS_SHOWN';
export const SIGNIN = 'SIGNIN';
export const SIGNIN_ERR = 'SIGNIN_ERR';
export const SIGNIN_MESS_SHOWN = 'SIGNIN_MESS_SHOWN';
// export const SET_TOKEN = 'SET_TOKEN';
// export const LOGOUT = 'LOGOUT';

export class TrySignup implements Action {
  readonly type = TRY_SIGNUP;
  constructor(public payload: UserDatas) {}
}

export class Signup implements Action {
  readonly type = SIGNUP;
}

export class SignupErr implements Action {
  readonly type = SIGNUP_ERR;
  constructor(public payload: {valid: boolean, error_type: string, error_mess: string, error: any}) {}
}

export class SignupMessShown implements Action {
  readonly type = SIGNUP_MESS_SHOWN;
}

export class TrySignin implements Action {
  readonly type = TRY_SIGNIN;
  constructor(public payload: {email: string, password: string}) {}
}

export class Signin implements Action {
  readonly type = SIGNIN;
}

export class SigninErr implements Action {
  readonly type = SIGNIN_ERR;
  constructor(public payload: {valid: boolean, error_type: string, error_mess: string, error: any}) {}
}

export class SigninMessShown implements Action {
  readonly type = SIGNIN_MESS_SHOWN;
}

export type AuthActions =
  TrySignup |
  Signup |
  SignupErr |
  SignupMessShown |
  TrySignin |
  Signin |
  SigninErr |
  SigninMessShown;
