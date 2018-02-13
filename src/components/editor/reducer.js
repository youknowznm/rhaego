import {
  ADD_TAG,
  REMOVE_TAG,
  ADJUST_TAG_INPUT_INDENT,
} from './actionTypes'

const defaultState = {
  articleDetail: {
    id: '',
    title: '',
    tags: ['react', 'express'],
    // tags: [],
    summary: '',
    created: new Date(),
    content: '',
  },
  tagsWidth: 0,
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case ADD_TAG:
      let tags_1 = state.articleDetail.tags
      tags_1.push(action.tagContent)
      return {
        ...state,
        tags: tags_1,
      };
    case REMOVE_TAG:
      let tags_2 = state.articleDetail.tags
      tags_2 = tags_2.splice(action.tagIndex, 1)
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
    default:
      return state;
  }
}
