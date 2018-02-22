import {TOGGLE_THEME_TYPE} from './actionTypes'

const defaultState = {
  type: 'light',
  // palette: {
  //   text: {
  //     secondary: 'green',
  //   }
  // }
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case TOGGLE_THEME_TYPE:
      const targetType = state.type === 'dark' ? 'light' : 'dark'
      return {
        ...state,
        type: targetType,
      }
    default:
      return state
  }
}
