import * as AuthActions from './auth.actions';

export interface State {
  token: string;
  authenticated: boolean;
  signup_err: any;
}

const initialState: State = {
  token: null,
  authenticated: false,
  signup_err: {
    valid: false,
    error_type: '',
    error_mess: '',
    error: ''
  }
};


export function AuthReducer(state = initialState, action: AuthActions.AuthActions) {
  switch (action.type) {
    case AuthActions.SIGNUP:
      return state;
    case AuthActions.SIGNUP_ERR:
      return {
        ...state,
        signup_err: {...action.payload}
      };
    default:
      return state;
  }
}
