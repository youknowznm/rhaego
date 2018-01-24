import {SWITCH_AUTH_TAB, CHECK_LOGIN_FIELDS} from './actionTypes'

export const switchAuthTab = (targetTabValue) => ({
  type: SWITCH_AUTH_TAB,
  targetTabValue,
})


export const checkLoginFields = (loginFields) => ({
  type: CHECK_LOGIN_FIELDS,
  loginFields,
})
