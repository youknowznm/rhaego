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
import {auth as authApi} from '../../api'

export const togglePasswordVisibility = () => ({
  type: TOGGLE_PASSWORD_VISIBILITY,
})
export const updateAuthField = (fieldName, fieldValue) => ({
  type: UPDATE_AUTH_FIELD,
  fieldName,
  fieldValue,
})
export const checkAuthFields = () => ({
  type: CHECK_AUTH_FIELDS,
})
export const requestAuthInit = () => ({
  type: REQUEST_AUTH_INIT,
})
export const requestAuthStart = () => ({
  type: REQUEST_AUTH_START,
})
export const requestAuthDone = (r) => ({
  type: REQUEST_AUTH_DONE,
  r,
})
export const requestAuthFail = (e) => ({
  type: REQUEST_AUTH_FAIL,
  e,
})
export const requestAuth = (registerFields) => {
  return (dispatch) => {
    dispatch(requestAuthStart())
    return axios
      .post(authApi, registerFields)
      .then((r) => {
        if (r.status !== 200) {
          throw new Error('Fail to get response with status ' + r.status)
        }
        console.log('r',r);
        dispatch(requestAuthDone(r))
      })
      .catch((e) => {
        console.log('e', e);
        dispatch(requestAuthFail(e))
        setTimeout(() => {
          dispatch(requestAuthInit())
        }, 3000)
      })

  };
}
