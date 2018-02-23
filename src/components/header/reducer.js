import {TOGGLE_DRAWER} from './actionTypes'

const defaultState = {
  drawerIsOpen: false
}

export default (state = defaultState, action) => {
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
