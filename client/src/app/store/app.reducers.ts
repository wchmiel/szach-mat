import { ActionReducerMap } from '@ngrx/store';
import * as fromAuth from '../auth/store/auth.reducers';
// import * as fromAccount from '../account/store/account.reducers';

// the global App state interface - contains all app states
export interface AppState {
  auth: fromAuth.State;
  // account: fromAccount.State;
}

// global app reducer - bind all app reducers
export const reducers: ActionReducerMap<AppState> = {
  auth: fromAuth.AuthReducer
  // account: fromAccount.AccountReducer
};
