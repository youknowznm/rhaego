import {
  REMOVE_TAG,
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
    case REMOVE_TAG:
      let {tags} = state.articleDetail
      tags = tags.splice(action.tagIndex, 1)
      console.log(213,tags);
      return {
        ...state,
        tags
      };
    default:
      return state;
  }
}
