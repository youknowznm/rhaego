import {
  GET_ARTICLE_DETAIL,

  CHECK_COMMENT_FIELDS,
  UPDATE_COMMENT_FIELD,

  REQUEST_COMMENT,
} from './actionTypes'
import {createAsyncAction} from 'redux-action-tools'
import {article as articleAPI, comment as commentAPI} from '../../api'
import axios from 'axios'

export const getArticleDetail = createAsyncAction(
  GET_ARTICLE_DETAIL,
  (articleId) => {
    return axios.get(`${articleAPI}?articleId=${articleId}`)
  }
)

export const checkCommentFields = () => ({
  type: CHECK_COMMENT_FIELDS,
})

export const updateCommentField = (fieldName, fieldValue) => ({
  type: UPDATE_COMMENT_FIELD,
  fieldName,
  fieldValue,
})

export const requestComment = createAsyncAction(
  REQUEST_COMMENT,
  (commentObj) => {
    return axios.post(`${commentAPI}`, commentObj)
  }
)
