import * as AccountActions from './account.actions';

export interface State {
  file_upload_mess: any;
}


const initialState: State = {
  file_upload_mess: {success: false, message: ''}
};

export function AccountReducer(state = initialState, action: AccountActions.AccountActions) {
  switch (action.type) {
    case AccountActions.UPLOAD_FILE:
      return {
        ...state,
        file_upload_mess: {success: action.payload.success, message: action.payload.message}
      };
    case AccountActions.UPLOAD_FILE_ERR:
      return {
        ...state,
        file_upload_mess: {success: action.payload.success, message: action.payload.message}
      };
    default:
      return state;
  }
}
