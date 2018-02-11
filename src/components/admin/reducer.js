import {
  REQUEST_LOGOUT_INIT,
  REQUEST_LOGOUT,
  REQUEST_LOGOUT_COMPLETED,
  REQUEST_LOGOUT_FAILED,

  TOGGLE_LOGOUT_DIALOG,
} from './actionTypes'
import {createReducer} from 'redux-action-tools'

const defaultState = {
  dialogOpen: false,
  requestLogoutStatus: 'initial',
  logoutResultMessage: '',
}

export default (state = defaultState, action) => {
  switch (action.type) {

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
      localStorage.setItem('adminLoggedIn', 'false')
      return {
        ...state,
        requestLogoutStatus: 'completed',
        logoutResultMessage: 'Logout successful.',
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
