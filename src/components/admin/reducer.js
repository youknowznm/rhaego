import {
  CHECK_IF_LOGGEDIN,
  CHECK_IF_LOGGEDIN_COMPLETED,
  CHECK_IF_LOGGEDIN_FAILED,

  REQUEST_LOGOUT_INIT,
  REQUEST_LOGOUT,
  REQUEST_LOGOUT_COMPLETED,
  REQUEST_LOGOUT_FAILED,

  TOGGLE_LOGOUT_DIALOG,
} from './actionTypes'
import {createReducer} from 'redux-action-tools'

const defaultState = {
  checkLoginStatus: 'initial',
  adminLoggedIn: null,

  dialogOpen: false,
  requestLogoutStatus: 'initial',
  logoutResultMessage: '',
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case CHECK_IF_LOGGEDIN:
      return {
        ...state,
        checkLoginStatus: 'loading',
        adminLoggedIn: null,
      }
    case CHECK_IF_LOGGEDIN_COMPLETED:
      return {
        ...state,
        checkLoginStatus: 'completed',
        adminLoggedIn: true,
      }
    case CHECK_IF_LOGGEDIN_FAILED:
      return {
        ...state,
        checkLoginStatus: 'failed',
        adminLoggedIn: false,
      }

    case TOGGLE_LOGOUT_DIALOG:
      return {
        ...state,
        dialogOpen: action.targetDialogStatus,
      }


    case REQUEST_LOGOUT_INIT:
      return {
        ...state,
        requestLogoutStatus: 'initial',
        logoutResultMessage: '',
      }
    case REQUEST_LOGOUT:
      return {
        ...state,
        requestLogoutStatus: 'loading',
      }
    case REQUEST_LOGOUT_COMPLETED:
      return {
        ...state,
        requestLogoutStatus: 'completed',
        logoutResultMessage: 'Logout successful. Redirecting to homepage.',
      }

    case REQUEST_LOGOUT_FAILED:
      return {
        ...state,
        requestLogoutStatus: 'failed',
        logoutResultMessage: 'An error occurred. Please try again later.',
      }

    default:
      return state
  }
}
