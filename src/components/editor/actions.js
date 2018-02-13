import {
  ADD_TAG,
  REMOVE_TAG,
  ADJUST_TAG_INPUT_INDENT,
} from './actionTypes'

export const addTag = (tagContent) => ({
  type: ADD_TAG,
  tagContent,
})
export const removeTag = (tagIndex) => ({
  type: REMOVE_TAG,
  tagIndex,
})
export const adjustTagInputIndent = () => ({
  type: ADJUST_TAG_INPUT_INDENT,
})
