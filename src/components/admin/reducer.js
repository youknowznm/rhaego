import {
  REQUEST_LOGOUT_INIT,
  REQUEST_LOGOUT,
  REQUEST_LOGOUT_COMPLETED,
  REQUEST_LOGOUT_FAILED,

  TOGGLE_LOGOUT_DIALOG,
} from './actionTypes'

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
        logoutResultMessage: '注销成功。',
      }

    case REQUEST_LOGOUT_FAILED:
      return {
        ...state,
        requestLogoutStatus: 'failed',
        logoutResultMessage: '未知错误。请稍后重试',
      }

    default:
      return state
  }
}
