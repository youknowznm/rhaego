import {TOGGLE_DRAWER, OPEN_DRAWER, CLOSE_DRAWER} from './actionTypes'

const thisState = {
  drawerIsOpen: false
}

export default (state = thisState, action) => {
  switch (action.type) {
    case TOGGLE_DRAWER:
      return {...state, drawerIsOpen: !state.drawerIsOpen}
    case OPEN_DRAWER:
      return {...state, drawerIsOpen: true}
    case CLOSE_DRAWER:
      return {...state, drawerIsOpen: false}
    default:
      return state;
  }
}
