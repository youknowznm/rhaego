import {
  // UPDATE_TITLE_FIELD,
  // UPDATE_SUMMARY_FIELD,
  // UPDATE_CONTENT_FIELD,
  // UPDATE_CREATED_DATE_FIELD,
  UPDATE_ARTICLE_FIELD,

  ADD_TAG,
  REMOVE_TAG,
  ADJUST_TAG_INPUT_INDENT,

  CHECK_ARTICLE_FIELDS,

  REQUEST_SAVE_ARTICLE,
  REQUEST_SAVE_ARTICLE_INIT,
} from './actionTypes'
import {createAsyncAction} from 'redux-action-tools'
import {article as saveArticleAPI} from '../../api'
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

export const updateArticleField = (fieldName, fieldValue) => ({
  type: UPDATE_ARTICLE_FIELD,
  fieldName,
  fieldValue,
})
// export const updateTitleField = (newValue) => ({
//   type: UPDATE_TITLE_FIELD,
//   newValue,
// })
// export const updateSummaryField = (newValue) => ({
//   type: UPDATE_SUMMARY_FIELD,
//   newValue,
// })
// export const updateCreatedDateField = (newValue) => ({
//   type: UPDATE_CREATED_DATE_FIELD,
//   newValue,
// })
// export const updateContentField = (newValue) => ({
//   type: UPDATE_CONTENT_FIELD,
//   newValue,
// })

export const checkArticleFields = () => ({
  type: CHECK_ARTICLE_FIELDS,
})
export const requestSaveArticleInit = () => ({
  type: REQUEST_SAVE_ARTICLE_INIT,
})
export const requestSaveArticle = createAsyncAction(
  REQUEST_SAVE_ARTICLE,
  (articleFields) => {
    return axios.post(saveArticleAPI, articleFields)
  }
)
