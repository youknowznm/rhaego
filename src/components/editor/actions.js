import {
  UPDATE_TITLE_FIELD,
  UPDATE_SUMMARY_FIELD,
  UPDATE_CONTENT_FIELD,
  UPDATE_CREATED_DATE_FIELD,

  ADD_TAG,
  REMOVE_TAG,
  ADJUST_TAG_INPUT_INDENT,
  PREVIEW_CONTENT,
} from './actionTypes'

export const addTag = (tagContent) => ({
  type: ADD_TAG,
  tagContent,
})
export const removeTag = (tagIndex) => ({
  type: REMOVE_TAG,
  tagIndex,
})
export const previewContent = () => ({
  type: PREVIEW_CONTENT,
})
export const adjustTagInputIndent = () => ({
  type: ADJUST_TAG_INPUT_INDENT,
})

export const updateTitleField = (newValue) => ({
  type: UPDATE_TITLE_FIELD,
  newValue,
})
export const updateSummaryField = (newValue) => ({
  type: UPDATE_SUMMARY_FIELD,
  newValue,
})
export const updateCreatedDateField = (newValue) => ({
  type: UPDATE_CREATED_DATE_FIELD,
  newValue,
})
export const updateContentField = (newValue) => ({
  type: UPDATE_CONTENT_FIELD,
  newValue,
})
