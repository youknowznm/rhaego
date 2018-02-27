import {
  UPDATE_ARTICLE_FIELD,
  ADD_TAG,
  REMOVE_TAG,
  ADJUST_TAG_INPUT_INDENT,
  CHECK_ARTICLE_FIELDS,
  REQUEST_SAVE_ARTICLE,
  REQUEST_SAVE_ARTICLE_INIT,
  GET_ARTICLE_TO_EDIT,
  GET_ARTICLE_TO_EDIT_COMPLETED,
  REQUEST_DELETE_ARTICLE,
  REQUEST_DELETE_ARTICLE_INIT,
  REQUEST_DELETE_ARTICLE_COMPLETED,
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

export const getArticleToEdit = createAsyncAction(
  GET_ARTICLE_TO_EDIT,
  (articleId) => {
    return axios.get(`${articleAPI}?articleId=${articleId}`)
  }
)

export const requestDeleteArticleInit = () => ({
  type: REQUEST_DELETE_ARTICLE_INIT,
})
export const requestDeleteArticle = createAsyncAction(
  REQUEST_DELETE_ARTICLE,
  (articleId) => {
    return axios.delete(`${articleAPI}?articleId=${articleId}`)
  }
)
