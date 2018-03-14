import * as AccountActions from './account.actions';

export interface State {
  file_upload_mess: any;
}


const initialState: State = {
  file_upload_mess: null
};

export function AccountReducer(state = initialState, action: AccountActions.AccountActions) {
  // switch (action.type) {
  //   case
  // }
}
