import marked from 'marked'
import {formatDate, regexps} from '../../utils'
import {
  GET_ARTICLE_DETAIL,
  GET_ARTICLE_DETAIL_COMPLETED,
  GET_ARTICLE_DETAIL_FAILED,
} from './actionTypes'

const defaultState = {
  articleDetail: null,
  parsedHTMLContent: '',
  getArticleDetailRequestStatus: 'initial',
  getArticleDetailStatusMessage: '',
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case GET_ARTICLE_DETAIL:
      return {
        ...state,
        getArticleDetailRequestStatus: 'loading',
      }
    case GET_ARTICLE_DETAIL_FAILED:
      return {
        ...state,
        getArticleDetailRequestStatus: 'failed',
        getArticleDetailStatusMessage: '获取失败。请稍后重试。',
      }
    case GET_ARTICLE_DETAIL_COMPLETED:
      const articleObj = action.payload.data.article
      return {
        ...state,
        articleDetail: articleObj,
        parsedHTMLContent: articleObj === null ? '' : marked(articleObj.content),
        getArticleDetailRequestStatus: 'completed',
        getArticleDetailStatusMessage: articleObj === null ? '未找到目标文章。' : '',
      }

    default:
      return state;
  }
}
