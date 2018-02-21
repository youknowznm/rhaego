import marked from 'marked'
import {formatDate} from '../../utils'
import {
  UPDATE_TITLE_FIELD,
  UPDATE_SUMMARY_FIELD,
  UPDATE_CONTENT_FIELD,
  UPDATE_CREATED_DATE_FIELD,

  ADD_TAG,
  REMOVE_TAG,
  ADJUST_TAG_INPUT_INDENT,

  // CHECK_ARTICLE_FIELDS,
  // REQUEST_SAVE_ARTICLE,
} from './actionTypes'
import sample from './sample'

const defaultState = {
  articleFields: {
    id: '',
    title: {
      value: '1',
      error: false,
    },
    tags: {
      value: ['react', 'express'],
      // value: [],
      error: false,
    },
    summary: {
      value: '2',
      error: false,
    },
    createdDate: {
      value: formatDate(new Date()),
      error: false,
    },
    content: {
      // value: '',
      value: sample,
      error: false,
    },
  },
  tagsWidth: 0,
  parsedHTMLContent: '',

  requestUploadStatus: '',
  uploadResultMessage: '',

  requestSaveStatus: '',
  saveResultMessage: '',
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case UPDATE_TITLE_FIELD:
      let fields_1 = state.articleFields
      fields_1.title.value = action.newValue
      return {
        ...state,
        articleFields: fields_1,
      }
    case UPDATE_SUMMARY_FIELD:
      let fields_2 = state.articleFields
      fields_2.summary.value = action.newValue
      return {
        ...state,
        articleFields: fields_2,
      }
    case UPDATE_CREATED_DATE_FIELD:
      let fields_3 = state.articleFields
      fields_3.createdDate.value = action.newValue
      return {
        ...state,
        articleFields: fields_3,
      }
    case UPDATE_CONTENT_FIELD:
      let fields_4 = state.articleFields
      fields_4.content.value = action.newValue
      let parsedHTMLContent = marked(action.newValue)
      return {
        ...state,
        articleFields: fields_4,
        parsedHTMLContent,
      }

    case ADD_TAG:
      let tags_1 = state.articleFields.tags
      tags_1.value.push(action.tagContent)
      return {
        ...state,
        tags: tags_1,
      };
    case REMOVE_TAG:
      let tags_2 = state.articleFields.tags
      tags_2.value.splice(action.tagIndex, 1)
      return {
        ...state,
        tags: tags_2,
      };
    case ADJUST_TAG_INPUT_INDENT:
      let tagsWidth = getComputedStyle(document.querySelector('.tags-container')).width
      document.querySelector('.editor-tags-input > input').style['text-indent'] = tagsWidth
      return {
        ...state,
        tagsWidth,
      }

    // case CHECK_ARTICLE_FIELDS:

    default:
      return state;
  }
}
