import axios from 'axios'
import {
  UPDATE_AUTH_FIELD,
  CHECK_AUTH_FIELDS,
  TOGGLE_PASSWORD_VISIBILITY,
  REQUEST_AUTH_INIT,
  REQUEST_AUTH_START,
  REQUEST_AUTH_DONE,
  REQUEST_AUTH_FAIL,
} from './actionTypes'
import {login as loginApi} from '../../api'

export const togglePasswordVisibility = () => ({
  type: TOGGLE_PASSWORD_VISIBILITY,
})
export const updateLoginField = (fieldName, fieldValue) => ({
  type: UPDATE_AUTH_FIELD,
  fieldName,
  fieldValue,
})
export const checkLoginFields = () => ({
  type: CHECK_AUTH_FIELDS,
})
export const requestLoginInit = () => ({
  type: REQUEST_AUTH_INIT,
})
export const requestLoginStart = () => ({
  type: REQUEST_AUTH_START,
})
export const requestLoginDone = (r) => ({
  type: REQUEST_AUTH_DONE,
  r,
})
export const requestLoginFail = (e) => ({
  type: REQUEST_AUTH_FAIL,
  e,
})
export const requestLogin = (registerFields) => {
  return (dispatch) => {
    dispatch(requestLoginStart())
    return axios
      .post(loginApi, registerFields)
      .then((r) => {
        dispatch(requestLoginDone(r))
      })
      .catch((e) => {
        const msg = e.response.data.msg
        const error = (msg !== undefined ? msg : e)
        dispatch(requestLoginFail(error))
        setTimeout(() => {
          dispatch(requestLoginInit())
        }, 3000)
      })

  };
}
