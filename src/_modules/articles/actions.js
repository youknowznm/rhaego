import {GET_ARTICLES} from './actionTypes'
import axios from 'axios'
import {articles as articlesAPI} from '../../api'

import {createAsyncAction} from 'redux-action-tools'

export const getArticles = createAsyncAction(
  GET_ARTICLES,
  (targetTag) => {
    return axios.get(`${articlesAPI}?tag=${targetTag}`)
  }
)
