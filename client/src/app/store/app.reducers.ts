import { ActionReducerMap } from '@ngrx/store';
import * as fromAuth from '../auth/store/auth.reducers';

// the global App state interface - contains all app states
export interface AppState {
  auth: fromAuth.State;
}

// global app reducer - bind all app reducers
export const reducers: ActionReducerMap<AppState> = {
  auth: fromAuth.AuthReducer
};
