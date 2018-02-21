import {
  UPDATE_TITLE_FIELD,
  UPDATE_SUMMARY_FIELD,
  UPDATE_CONTENT_FIELD,
  UPDATE_CREATED_DATE_FIELD,

  ADD_TAG,
  REMOVE_TAG,
  ADJUST_TAG_INPUT_INDENT,

  UPLOAD_PICTURE,
} from './actionTypes'
import {createAsyncAction} from 'redux-action-tools'
import {uploadPicture as uploadPictureAPI} from '../../api'
import axios from 'axios'

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

export const uploadPicture = createAsyncAction(UPLOAD_PICTURE, (pictureFile) => {
  const form = new FormData()
  form.append('pictureFile', pictureFile)
  return axios.post(
    uploadPictureAPI,
    form,
    {
      headers: {'Content-Type': 'multipart/form-data'},
    }
  )
})
