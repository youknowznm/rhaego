import axios from 'axios'
import {
  UPDATE_LOGIN_FIELD,
  CHECK_LOGIN_FIELDS,
  TOGGLE_LOGIN_PASSWORD_VISIBILITY,
} from './actionTypes'

export const toggleVisible = () => ({
  type: TOGGLE_LOGIN_PASSWORD_VISIBILITY,
})

export const updateLoginField = (fieldName, fieldValue) => ({
  type: UPDATE_LOGIN_FIELD,
  fieldName,
  fieldValue,
})
export const checkLoginFields = () => ({
  type: CHECK_LOGIN_FIELDS,
})
