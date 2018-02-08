import {
  CHECK_IF_LOGGEDIN,
  REQUEST_LOGOUT_INIT,
  REQUEST_LOGOUT,
  TOGGLE_LOGOUT_DIALOG,
} from './actionTypes'
import axios from 'axios'
import {
	checkLoginStatus as checkLoginStatusApi,
	logout as requestLogoutApi,
} from '../../api'
import {createAsyncAction} from 'redux-action-tools'

export const checkLoginStatus = createAsyncAction(CHECK_IF_LOGGEDIN, () => {
  return axios.get(checkLoginStatusApi)
})
export const requestLogout = createAsyncAction(REQUEST_LOGOUT, () => {
  return axios.post(requestLogoutApi)
})
export const requestLogoutInit = () => ({
  type: REQUEST_LOGOUT_INIT,
})
export const toggleLogoutDialog = (targetDialogStatus) => ({
  type: TOGGLE_LOGOUT_DIALOG,
  targetDialogStatus,
})
