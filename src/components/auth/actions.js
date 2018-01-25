import axios from 'axios'
import {
  SWITCH_AUTH_TAB,

  UPDATE_REGISTER_FIELD,
  CHECK_REGISTER_FIELDS,

  UPDATE_LOGIN_FIELD,
  CHECK_LOGIN_FIELDS,

  REQUEST_REGISTER_START,
  REQUEST_REGISTER_FAIL,
  REQUEST_REGISTER_DONE,
} from './actionTypes'

export const switchAuthTab = (targetTabValue) => ({
  type: SWITCH_AUTH_TAB,
  targetTabValue,
})

export const updateRegisterField = (fieldName, fieldValue) => ({
  type: UPDATE_REGISTER_FIELD,
  fieldName,
  fieldValue,
})
export const checkRegisterFields = () => ({
  type: CHECK_REGISTER_FIELDS,
})

export const updateLoginField = (fieldName, fieldValue) => ({
  type: UPDATE_LOGIN_FIELD,
  fieldName,
  fieldValue,
})
export const checkLoginFields = () => ({
  type: CHECK_LOGIN_FIELDS,
})


export const requestRegisterStart = () => ({
  type: REQUEST_REGISTER_START
})
export const requestRegisterDone = (r) => ({
  type: REQUEST_REGISTER_DONE,
  r,
})
export const requestRegisterFail = (e) => ({
  type: REQUEST_REGISTER_FAIL,
  e,
})


export const requestRegister = (registerFields) => {
  return (dispatch) => {
    const apiurl = '/register'

    dispatch(requestRegisterStart())

    return axios
      .post(apiurl, registerFields)
      .then((r) => {
        console.log(r);
        dispatch(requestRegisterDone())
      })
      .catch((e) => {
        console.log(e);
        dispatch(requestRegisterFail())
      })
  };
}