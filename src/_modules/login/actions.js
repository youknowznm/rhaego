import axios from 'axios'
import {
  UPDATE_LOGIN_FIELD,
  CHECK_LOGIN_FIELDS,
  TOGGLE_PASSWORD_VISIBILITY,
  REQUEST_LOGIN,
  REQUEST_LOGIN_INIT,
} from './actionTypes'
import {login as loginAPI} from '../../api'
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
export const requestLoginInit = () => ({
  type: REQUEST_LOGIN_INIT,
})
export const requestLogin = createAsyncAction(
  REQUEST_LOGIN,
  (loginFields) => {
    return axios.post(loginAPI, loginFields)
  }
)
