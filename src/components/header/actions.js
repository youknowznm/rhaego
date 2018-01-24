import {TOGGLE_DRAWER, OPEN_DRAWER, CLOSE_DRAWER} from './actionTypes'

export const toggleDrawer = (targetStatus) => ({
  type: TOGGLE_DRAWER,
  targetStatus,
})


export const openDrawer = () => ({
  type: CLOSE_DRAWER,
})


export const closeDrawer = () => ({
  type: CLOSE_DRAWER,
})
