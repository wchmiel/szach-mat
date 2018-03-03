import * as AuthActions from './auth.actions';

export interface State {
  token: string;
  authenticated: boolean;
  signup_err: any;
  signup_mess_show: boolean; // when true app will flafh message in /signin route
}

const initialState: State = {
  token: null,
  authenticated: false,
  signup_err: {
    valid: false,
    error_type: '',
    error_mess: '',
    error: ''
  },
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
    default:
      return state;
  }
}
