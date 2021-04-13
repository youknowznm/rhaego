import {
  REQUEST_LOGOUT_INIT,
  REQUEST_LOGOUT,
  TOGGLE_LOGOUT_DIALOG,
} from './actionTypes'
import axios from 'axios'
import {
	logout as requestLogoutAPI,
} from '../../api'
import {createAsyncAction} from 'redux-action-tools'

export const requestLogout = createAsyncAction(
  REQUEST_LOGOUT,
  () => {
    return axios.post(requestLogoutAPI)
  }
)
export const requestLogoutInit = () => ({
  type: REQUEST_LOGOUT_INIT,
})
export const toggleLogoutDialog = (targetDialogStatus) => ({
  type: TOGGLE_LOGOUT_DIALOG,
  targetDialogStatus,
})
