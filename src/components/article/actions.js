import {
  GET_ARTICLE_DETAIL,
  GET_ARTICLE_DETAIL_COMPLETED,
} from './actionTypes'
import {createAsyncAction} from 'redux-action-tools'
import {article as articleAPI} from '../../api'
import axios from 'axios'

export const getArticleDetail = createAsyncAction(
  GET_ARTICLE_DETAIL,
  (articleId) => {
    return axios.get(`${articleAPI}?articleId=${articleId}`)
  }
)
