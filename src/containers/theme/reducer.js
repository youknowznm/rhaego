import Cookies from 'js-cookie'
import {TOGGLE_THEME_TYPE} from './actionTypes'

const defaultState = {
  type: Cookies.get('theme') || 'light',
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case TOGGLE_THEME_TYPE:
      const targetType = state.type === 'dark' ? 'light' : 'dark'
      Cookies.set('theme', targetType)
      return {
        ...state,
        type: targetType,
      }
    default:
      return state
  }
}
