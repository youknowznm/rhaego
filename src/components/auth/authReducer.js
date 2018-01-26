import {
  TOGGLE_AUTH_TAB,
} from './actionTypes'

const thisState = {
  activeTabValue: 1,
}

export default (state = thisState, action) => {
  switch (action.type) {
    case TOGGLE_AUTH_TAB:
      return {
        ...state,
        activeTabValue: action.targetTabValue
      }
    default:
      return state
  }
}
