import {
  CHECK_LOGIN_STATUS,
  CHECK_LOGIN_STATUS_INIT,
  CHECK_LOGIN_STATUS_START,
  CHECK_LOGIN_STATUS_DONE,
  CHECK_LOGIN_STATUS_FAIL,
} from './actionTypes'
import axios from 'axios'
import {checkLoginStatus as checkLoginStatusApi} from '../../api'

export const checkLoginStatus = () => ({
  type: CHECK_LOGIN_STATUS,
})
export const checkLoginStatusInit = () => ({
  type: CHECK_LOGIN_STATUS_INIT,
})
export const checkLoginStatusStart = () => ({
  type: CHECK_LOGIN_STATUS_START,
})
export const checkLoginStatusDone = (r) => ({
  type: CHECK_LOGIN_STATUS_DONE,
  r,
})
export const checkLoginStatusFail = (e) => ({
  type: CHECK_LOGIN_STATUS_FAIL,
  e,
})
export const checkLoginStatus = () => {
  return (dispatch) => {
    dispatch(checkLoginStatusStart())
    return axios
      .get(checkLoginStatusApi)
      .then((r) => {
        dispatch(checkLoginStatusDone(r))
      })
      .catch((e) => {
        dispatch(checkLoginStatusFail(e))
      })
  }
}
