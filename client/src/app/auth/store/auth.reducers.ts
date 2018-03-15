import * as AuthActions from './auth.actions';

export interface State {
  token: string;
  authenticated: boolean;
  expiresIn: number;
  signup_err: any;
  signin_err: any;
  signup_mess_show: boolean; // when true app will flafh message in /signin route
}

const initialState: State = {
  token: null,
  authenticated: null,
  expiresIn: null,
  signup_err: { valid: false, error_type: '', error_mess: '', error: '' },
  signin_err: { valid: false, error_type: '', error_mess: '', error: '' },
  signup_mess_show: false
};


export function AuthReducer(state = initialState, action: AuthActions.AuthActions) {
  switch (action.type) {
    case AuthActions.SIGNUP:
      return {
        ...state,
        signup_mess_show: true
      };
    case AuthActions.SIGNUP_ERR:
      return {
        ...state,
        signup_err: {...action.payload}
      };
    case AuthActions.SIGNUP_MESS_SHOWN:
      return {
        ...state,
        signup_mess_show: false
      };
    case AuthActions.SIGNIN:
      return {
        ...state,
        authenticated: true,
        token: action.payload.idToken,
        expiresIn: action.payload.expiresIn
      };
    case AuthActions.SIGNIN_ERR:
      return {
        ...state,
        signin_err: {...action.payload}
      };
    case AuthActions.SIGNIN_MESS_SHOWN:
      return {
        ...state,
        signin_err: { valid: false, error_type: '', error_mess: '', error: '' }
      };
    case AuthActions.USER_AUTHORIZED:
    case AuthActions.USER_UNAUTHORIZED:
      return {
        ...state,
        authenticated: action.payload.success
      };
    default:
      return state;
  }
}
