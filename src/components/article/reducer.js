import marked from 'marked'
import {formatDate, regexps} from '../../utils'
import {
  GET_ARTICLE_DETAIL,
  GET_ARTICLE_DETAIL_COMPLETED,
  GET_ARTICLE_DETAIL_FAILED,

  CHECK_COMMENT_FIELDS,
  UPDATE_COMMENT_FIELD,

  REQUEST_COMMENT_INIT,
  REQUEST_COMMENT,
  REQUEST_COMMENT_COMPLETED,
  REQUEST_COMMENT_FAILED,

} from './actionTypes'

const defaultState = {
  articleDetail: {
    _id: '',
    summary: '',
    tags: [],
    content: '',
    createdDate: '',
    comments: [],
  },
  parsedHTMLContent: '',
  getArticleDetailRequestStatus: 'initial',
  getArticleDetailStatusMessage: '',

  commentFields: {
    author: {
      value: 'znm92',
      error: false,
    },
    email: {
      value: 'znm92@icloud.com',
      error: false,
    },
    content: {
      value: 'commentRequestStatus, commentRequestStatus.',
      error: false,
    },
  },
  commentFieldsValid: true,
  commentRequestStatus: 'initial',
  commentResultMessage: '',
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

    case UPDATE_COMMENT_FIELD:
      const {fieldName, fieldValue} = action
      const newfields = state.commentFields
      newfields[fieldName].value = fieldValue
      return {
        ...state,
        articleFields: newfields,
      }

    case CHECK_COMMENT_FIELDS:
      const {
        authorReg,
        emailReg,
        contentReg,
      } = regexps.comment
      const fieldsToCheck = state.commentFields
      const authorEditor = !authorReg.test(fieldsToCheck.author.value)
      fieldsToCheck.author.error = authorEditor
      const emailEditor = !emailReg.test(fieldsToCheck.email.value)
      fieldsToCheck.email.error = emailEditor
      const contentEditor = !contentReg.test(fieldsToCheck.content.value)
      fieldsToCheck.content.error = contentEditor
      const commentFieldsValid = !authorEditor && !emailEditor && !contentEditor
      return {
        ...state,
        commentFields: fieldsToCheck,
        commentFieldsValid,
        commentRequestStatus: commentFieldsValid ? 'loading' : 'initial',
      }

    case REQUEST_COMMENT:
      return state;
    case REQUEST_COMMENT_INIT:
      return {
        ...state,
        commentRequestStatus: 'initial',
      }
    case REQUEST_COMMENT_COMPLETED:
      const resultData = action.payload.data
      return {
        ...state,
        commentRequestStatus: 'completed',
        commentResultMessage: resultData.msg,
      }
    case REQUEST_COMMENT_FAILED:
      const errorData = action.payload.response.data
      console.log(3,errorData);
      return {
        ...state,
        commentRequestStatus: 'failed',
        commentResultMessage: typeof errorData === 'string' ? errorData : errorData.msg,
      }

    default:
      return state;
  }
}
