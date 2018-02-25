import React from 'react'
import {connect} from 'react-redux'

import {Card, IconButton, Button, Typography, Snackbar} from 'material-ui'
import {FormControl, FormHelperText} from 'material-ui/Form'
import Input, {InputLabel, InputAdornment} from 'material-ui/Input'

import {
  LoadingArea,
  getQueryObj,
  SplitToSpans,
  highlightAllPre,
  getOffsetToPage,
} from '../../../utils'
import {getArticleDetail} from '../actions'
import {CircularProgress} from 'material-ui/Progress'

import './article.css'

class ArticleComments extends React.Component {
  render() {
    return (
      <div>

        <ul className="comments-list">
          <li className="comments-list-item">

          </li>
        </ul>
      </div>
    );
  }
}


const mapState = (state) => {
  return {
    articleDetail: state.article.articleDetail,

  }
}

const mapDispatch = (dispatch) => ({

})

export default connect(mapState, mapDispatch)(ArticleComments)
