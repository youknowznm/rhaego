import {SWITCH_AUTH_TAB} from './actionTypes'

export const switchAuthTab = (targetTabValue) => ({
  type: SWITCH_AUTH_TAB,
  targetTabValue,
})
