import * as AccountActions from './account.actions';

export interface State {
  flash_message: any;
}


const initialState: State = {
  flash_message: {success: false, message: ''}
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
    default:
      return state;
  }
}
