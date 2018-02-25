import React from 'react'
import {connect} from 'react-redux'

import {Card, IconButton, Button, Typography, Snackbar, TextField} from 'material-ui'
import {FormControl, FormHelperText} from 'material-ui/Form'
import Input, {InputLabel, InputAdornment} from 'material-ui/Input'

import {
  LoadingArea,
  getQueryObj,
  SplitToSpans,
  highlightAllPre,
  getOffsetToPage,
} from '../../../utils'
import {updateCommentField, checkCommentFields} from '../actions'
import {CircularProgress} from 'material-ui/Progress'

import './article.css'

class CommentEditor extends React.Component {
  onChangeValue = (field) => (evt) => {
    const fieldName = field
    const fieldValue = evt.target.value
    console.log(1,fieldName,fieldValue);
    this.props.thisUpdateCommentField(fieldName, fieldValue)
  }
  render() {
    const {
      emailError,
      emailValue,
      authorError,
      authorValue,
      contentError,
      contentValue,
    } = this.props
    return (
      <div>

        <Card className="comment-editor">
          <Typography type="caption" component="i">
            欢迎留下您的评论。
          </Typography>
          <div className="row">
            <FormControl className="comment-input" margin="normal">
              <InputLabel htmlFor="comment-author">
                称呼
              </InputLabel>
              <Input
                id="comment-author"
                type="text"
                value={authorValue}
                onChange={this.onChangeValue('author')}
                error={authorError}
              />
              <FormHelperText className={authorError ? 'error' : ''}>
                输入4至16个字作为称呼。
              </FormHelperText>
            </FormControl>

            <FormControl className="comment-input" margin="normal">
              <InputLabel htmlFor="comment-email">
                邮箱
              </InputLabel>
              <Input
                id="comment-email"
                type="text"
                onChange={this.onChangeValue('email')}
                error={emailError}
              />
              <FormHelperText className={emailError ? 'error' : ''}>
                输入常见的邮箱格式。
              </FormHelperText>
            </FormControl>
          </div>
          <div className="row">
            <TextField
              className="comment-content"
              label="内容"
              multiline
              value={contentValue}
              // rows="2"
              onChange={this.onChangeValue('content')}
              helperText="输入2至100个字作为评论内容。"
              margin="normal"
              error={contentError}
            />
            <Button className="submit-button"
              raised
              color="secondary"
            >
              提交
            </Button>
          </div>
        </Card>

      </div>
    );
  }
}


const mapState = (state) => {
  const {commentFields} = state.article
  return {
    articleDetail: state.article.articleDetail,
    authorError: commentFields.author.error,
    authorValue: commentFields.author.value,
    emailError: commentFields.email.error,
    emailValue: commentFields.email.value,
    contentError: commentFields.content.error,
    contentValue: commentFields.content.value,
  }
}

const mapDispatch = (dispatch) => ({
  thisUpdateCommentField: (fieldName, fieldValue) => {
    dispatch(updateCommentField(fieldName, fieldValue))
  },
  thisCheckCommentFields: () => {
    dispatch(checkCommentFields)
  },
})

export default connect(mapState, mapDispatch)(CommentEditor)


// new Fingerprint2(options).get(function(result) {
//   console.log(result)
// })
