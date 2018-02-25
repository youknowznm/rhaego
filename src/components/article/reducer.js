import marked from 'marked'
import {formatDate, regexps} from '../../utils'
import {
  GET_ARTICLE_DETAIL,
  GET_ARTICLE_DETAIL_COMPLETED,
  GET_ARTICLE_DETAIL_FAILED,

  CHECK_COMMENT_FIELDS,
  UPDATE_COMMENT_FIELD,

  REQUEST_COMMENT,
  REQUEST_COMMENT_COMPLETED,
  REQUEST_COMMENT_FAILED,

} from './actionTypes'

const defaultState = {
  articleDetail: null,
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
      console.log(fieldName,fieldValue);
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
      fieldsToCheck.title.error = authorEditor
      const emailEditor = !emailReg.test(fieldsToCheck.email.value)
      fieldsToCheck.summary.error = emailEditor
      const contentEditor = !contentReg.test(fieldsToCheck.content.value)
      fieldsToCheck.createdDate.error = contentEditor

      const fieldsValid = !authorEditor && !emailEditor && !contentEditor

      return {
        ...state,
        commentFields: fieldsToCheck,
        fieldsValid,
        saveArticleRequestStatus: fieldsValid ? 'loading' : 'initial',
      }


    default:
      return state;
  }
}
