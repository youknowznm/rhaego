import {TOGGLE_DRAWER} from './actionTypes'

const thisState = {
  drawerIsOpen: false
}

export default (state = thisState, action) => {
  switch (action.type) {
    case TOGGLE_DRAWER:
      const status =
        typeof action.status === 'boolean'
        ? action.status
        : !state.drawerIsOpen
      return {...state, drawerIsOpen: status}
    default:
      return state;
  }
}
