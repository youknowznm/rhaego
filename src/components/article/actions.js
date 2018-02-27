import {
  GET_ARTICLE_DETAIL,

  CHECK_COMMENT_FIELDS,
  UPDATE_COMMENT_FIELD,

  REQUEST_COMMENT,
  REQUEST_COMMENT_INIT,

  REQUEST_LIKE,
  REQUEST_LIKE_INIT,
} from './actionTypes'
import {createAsyncAction} from 'redux-action-tools'
import {
  article as articleAPI,
  comment as commentAPI,
  like as likeAPI,
} from '../../api'
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

export const requestCommentInit = () => ({
  type: REQUEST_COMMENT_INIT,
})
export const requestComment = createAsyncAction(
  REQUEST_COMMENT,
  (commentObj) => {
    return axios.post(`${commentAPI}`, commentObj)
  }
)

export const requestLikeInit = () => ({
  type: REQUEST_LIKE_INIT,
})
export const requestLike = createAsyncAction(
  REQUEST_LIKE,
  (likeObj) => {
    return axios.post(`${likeAPI}`, likeObj)
  }
)
