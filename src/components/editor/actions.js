import {
  REMOVE_TAG,
} from './actionTypes'

export const removeTag = (tagIndex) => ({
  type: REMOVE_TAG,
  tagIndex,
})
