import {formatDate, regexps} from '../../utils'
import {
  GET_ARTICLES,
  GET_ARTICLES_COMPLETED,
  GET_ARTICLES_FAILED,
} from './actionTypes'

const defaultState = {
  articlesArr: [],
  getArticlesRequestStatus: 'initial',
  getArticlesStatusMessage: '',
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case GET_ARTICLES:
      return {
        ...state,
        getArticlesRequestStatus: 'loading',
      }
    case GET_ARTICLES_FAILED:
      return {
        ...state,
        getArticlesRequestStatus: 'failed',
        getArticlesStatusMessage: '获取失败。请稍后重试。',
      }
    case GET_ARTICLES_COMPLETED:
      const articlesArr = action.payload.data.articles
      return {
        ...state,
        articlesArr,
        getArticlesRequestStatus: 'completed',
        getArticlesStatusMessage: articlesArr.length === 0 ? '尚未发表文章。' : '',
      }

    default:
      return state;
  }
}


// import {GET_ARTICLES} from './actionTypes'
// import {createReducer} from 'redux-action-tools'
//
// export default createReducer()
//   .when(GET_ARTICLES, (state, action) => {
//     return {
//       ...state,
//       status: 'loading',
//     }
//   })
//   .done((state, action) => {
//     const data = action.payload.data
//     let productsArr = data.sort((p1, p2) => {
//       return -(p1.stargazers_count - p2.stargazers_count)
//     })
//     return {
//       ...state,
//       status: 'completed',
//       statusMsg: '获取成功。',
//       productsArr,
//     }
//   })
//   .failed((state, action) => {
//     return {
//       ...state,
//       status: 'failed',
//       statusMsg: '获取失败。请稍后重试。',
//       productsArr: [],
//     }
//   })
//   .build({
//     status: 'initial',
//     productsArr: [],
//     statusMsg: '',
//   })
