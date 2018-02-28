import * as AuthActions from './auth.actions';

export interface State {
  token: string;
  authenticated: boolean;
}

const initialState: State = {
  token: null,
  authenticated: false
};

export function AuthReducer(state = initialState, action: AuthActions.AuthActions) {
  switch (action.type) {
    case AuthActions.TRY_SIGNUP:
      return state;
    default:
      return state;
  }
}
