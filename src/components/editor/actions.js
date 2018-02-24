import {
  UPDATE_ARTICLE_FIELD,
  ADD_TAG,
  REMOVE_TAG,
  ADJUST_TAG_INPUT_INDENT,
  CHECK_ARTICLE_FIELDS,
  REQUEST_SAVE_ARTICLE,
  REQUEST_SAVE_ARTICLE_INIT,
  GET_ARTICLE_BY_ID,
  GET_ARTICLE_BY_ID_COMPLETED,
} from './actionTypes'
import {createAsyncAction} from 'redux-action-tools'
import {article as articleAPI} from '../../api'
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

export const checkArticleFields = () => ({
  type: CHECK_ARTICLE_FIELDS,
})
export const requestSaveArticleInit = () => ({
  type: REQUEST_SAVE_ARTICLE_INIT,
})
export const requestSaveArticle = createAsyncAction(
  REQUEST_SAVE_ARTICLE,
  (articleFields) => {
    return axios.post(articleAPI, articleFields)
  }
)

export const getArticleById = createAsyncAction(
  GET_ARTICLE_BY_ID,
  (articleId) => {
    return axios.get(`${articleAPI}?articleId=${articleId}`)
  }
)
