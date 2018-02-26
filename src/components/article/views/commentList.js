import React from 'react'
import {connect} from 'react-redux'

import {IconButton, Button, Typography, Snackbar} from 'material-ui'
import Card, { CardActions, CardContent } from 'material-ui/Card';
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

class CommentList extends React.Component {
  render() {
    return (
      <div></div>
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

export default connect(mapState, mapDispatch)(CommentList)
