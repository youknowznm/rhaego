import marked from 'marked'
import {formatDate, regexps} from '../../utils'
import {
  GET_ARTICLE_DETAIL,
  GET_ARTICLE_DETAIL_COMPLETED,
  GET_ARTICLE_DETAIL_FAILED,

  CHECK_COMMENT_FIELDS,
  UPDATE_COMMENT_FIELD,

  REQUEST_COMMENT_INIT,
  REQUEST_COMMENT_COMPLETED,
  REQUEST_COMMENT_FAILED,

  REQUEST_LIKE_INIT,
  REQUEST_LIKE_COMPLETED,
  REQUEST_LIKE_FAILED,

  REQUEST_DELETE_COMMENT_INIT,
  REQUEST_DELETE_COMMENT,
  REQUEST_DELETE_COMMENT_COMPLETED,
  REQUEST_DELETE_COMMENT_FAILED,
} from './actionTypes'

const defaultState = {
  articleDetail: {
    _id: '',
    summary: '',
    tags: [],
    content: '',
    createdDate: '',
    comments: [],
    liked: [],
  },
  parsedHTMLContent: '',
  getArticleDetailRequestStatus: 'initial',
  getArticleDetailStatusMessage: '',

  commentFields: {
    author: {
      value: '',
      error: false,
    },
    email: {
      value: '',
      error: false,
    },
    content: {
      value: '',
      error: false,
    },
  },
  commentFieldsValid: true,
  commentRequestStatus: 'initial',
  commentResultMessage: '',

  likeRequestStatus: 'initial',
  likeResultMessage: '',

  deleteCommentRequestStatus: 'initial',
  deleteCommentResultMessage: '',
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
      const originArticleDetail = state.articleDetail
      return {
        ...state,
        // 根据 id 未查到文章时，使用旧的空文章对象
        articleDetail: articleObj || originArticleDetail,
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

    case REQUEST_COMMENT_INIT:
      return {
        ...state,
        commentRequestStatus: 'initial',
      }
    case REQUEST_COMMENT_COMPLETED:
      const commentResultData = action.payload.data
      return {
        ...state,
        commentRequestStatus: 'completed',
        commentResultMessage: commentResultData.msg,
      }
    case REQUEST_COMMENT_FAILED:
      const commentErrorData = action.payload.response.data
      return {
        ...state,
        commentRequestStatus: 'failed',
        commentResultMessage: typeof commentErrorData === 'string'
          ? commentErrorData
          : commentErrorData.msg,
      }

    case REQUEST_LIKE_INIT:
      return {
        ...state,
        likeRequestStatus: 'initial',
      }
    case REQUEST_LIKE_COMPLETED:
      const likeResultData = action.payload.data
      return {
        ...state,
        likeRequestStatus: 'completed',
        likeResultMessage: likeResultData.msg,
      }
    case REQUEST_LIKE_FAILED:
      const likeErrorData = action.payload.response.data
      return {
        ...state,
        likeRequestStatus: 'failed',
        likeResultMessage: typeof likeErrorData === 'string'
          ? likeErrorData
          : likeErrorData.msg,
      }

    case REQUEST_DELETE_COMMENT_INIT:
      return {
        ...state,
        deleteCommentRequestStatus: 'initial',
      }
    case REQUEST_DELETE_COMMENT_COMPLETED:
      const deleteCommentResultData = action.payload.data
      return {
        ...state,
        deleteCommentRequestStatus: 'completed',
        deleteCommentResultMessage: deleteCommentResultData.msg,
      }
    case REQUEST_DELETE_COMMENT_FAILED:
      const deleteCommentErrorData = action.payload.response.data
      return {
        ...state,
        deleteCommentRequestStatus: 'failed',
        deleteCommentResultMessage: typeof deleteCommentErrorData === 'string'
          ? deleteCommentErrorData
          : deleteCommentErrorData.msg,
      }

    default:
      return state
  }
}
