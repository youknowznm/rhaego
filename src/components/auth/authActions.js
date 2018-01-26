import axios from 'axios'
import {
  TOGGLE_AUTH_TAB,
} from './actionTypes'

export const toggleAuthTab = (targetTabValue) => ({
  type: TOGGLE_AUTH_TAB,
  targetTabValue,
})
