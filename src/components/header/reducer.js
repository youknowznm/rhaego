import {TOGGLE_DRAWER} from './actionTypes.js'

const thisState = {
  drawerIsOpen: false
}

export default (state = thisState, action) => {
  switch (action.type) {
    case TOGGLE_DRAWER:
      return {
        drawerIsOpen: !state.drawerIsOpen,
      }
    default:
      return state;
  }
}
