import axios from 'axios'
import {
  UPDATE_LOGIN_FIELD,
  CHECK_LOGIN_FIELDS,
  TOGGLE_PASSWORD_VISIBILITY,
  REQUEST_LOGIN,

  REQUEST_LOGIN_INIT,
  // REQUEST_LOGIN_START,
  // REQUEST_LOGIN_DONE,
  // REQUEST_LOGIN_FAIL,
} from './actionTypes'
import {login as loginApi} from '../../api'
import {createAsyncAction} from 'redux-action-tools'

export const togglePasswordVisibility = () => ({
  type: TOGGLE_PASSWORD_VISIBILITY,
})
export const updateLoginField = (fieldName, fieldValue) => ({
  type: UPDATE_LOGIN_FIELD,
  fieldName,
  fieldValue,
})
export const checkLoginFields = () => ({
  type: CHECK_LOGIN_FIELDS,
})
export const requestLogin = createAsyncAction(REQUEST_LOGIN, (loginFields) => {
  return axios.post(loginApi, loginFields)
})

export const requestLoginInit = () => ({
  type: REQUEST_LOGIN_INIT,
})

// export const requestLoginStart = () => ({
//   type: REQUEST_LOGIN_START,
// })
// export const requestLoginDone = (r) => ({
//   type: REQUEST_LOGIN_DONE,
//   r,
// })
// export const requestLoginFail = (e) => ({
//   type: REQUEST_LOGIN_FAIL,
//   e,
// })
// export const requestLogin = (registerFields) => {
//   return (dispatch) => {
//     dispatch(requestLoginStart())
//     return axios
//       .post(loginApi, registerFields)
//       .then((r) => {
//         dispatch(requestLoginDone(r))
//         setTimeout(() => {
//           window.location.assign('/admin')
//         }, 2000)
//       })
//       .catch((e) => {
//         const msg = e.response.data.msg
//         const error = (msg !== undefined ? msg : e)
//         dispatch(requestLoginFail(error))
//         setTimeout(() => {
//           dispatch(requestLoginInit())
//         }, 3000)
//       })
//
//   };
// }
