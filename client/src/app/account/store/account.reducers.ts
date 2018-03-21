import * as AccountActions from './account.actions';
import { UserData } from '../../models/user.model';

export interface State {
  flash_message: any;
  userData: UserData;
}


const initialState: State = {
  flash_message: {success: false, message: ''},
  userData: new UserData
};

export function AccountReducer(state = initialState, action: AccountActions.AccountActions) {
  switch (action.type) {
    case AccountActions.UPLOAD_FILE:
    case AccountActions.UPLOAD_FILE_ERR:
    case AccountActions.EDIT_USER_DATA:
    case AccountActions.EDIT_USER_DATA_ERR:
      return {
        ...state,
        flash_message: {success: action.payload.success, message: action.payload.message}
      };
    case AccountActions.SAVE_USER_DATA:
      return {
        ...state,
        userData: action.payload
      };
    default:
      return state;
  }
}
