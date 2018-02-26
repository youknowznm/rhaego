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
  getFingerprint,
  AsyncButton,
} from '../../../utils'
import {
  updateCommentField,
  checkCommentFields,
  requestComment,
  requestCommentInit,
} from '../actions'
import {CircularProgress} from 'material-ui/Progress'

import './article.css'

class CommentEditor extends React.Component {
  componentWillUpdate(nextProps) {
    console.log(1, nextProps);
    console.log(nextProps.commentResultMessage);
    switch (nextProps.commentRequestStatus) {
      case 'loading':
        if (nextProps.fieldsValid === true) {
          const commentFields = {
            author: this.props.authorValue,
            email: this.props.emailValue,
            content: this.props.contentValue,
            articleId: this.props.articleId,
          }
          let that = this
          getFingerprint((fingerprint) => {
            commentFields.clientId = fingerprint
            that.props.thisRequestComment(commentFields)
          })
        }
        break;
      case 'failed':
        setTimeout(() => {
          this.props.thisRequestCommentInit()
        }, 2000)
        break
      case 'completed':
        const {articleId} = nextProps
        setTimeout(() => {
          this.props.thisRequestCommentInit()
          setTimeout(() => {
            // window.location.assign(`/article?id=${articleId}`)
          }, 400)
        }, 2000)
        break
      default:
        break
    }
  }
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
      thisCheckCommentFields,
      commentRequestStatus,
      commentResultMessage,
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
                maxLength="16"
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
                value={emailValue}
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
              value={contentValue}
              onChange={this.onChangeValue('content')}
              helperText="输入4至120个字作为评论内容。"
              margin="normal"
              maxLength="120"
              error={contentError}
            />
            <AsyncButton
              raised
              className="submit-button"
              asyncStatus={commentRequestStatus}
              asyncResultMessage={commentResultMessage}
              onClick={thisCheckCommentFields}
              color="primary"
            >
              提交
            </AsyncButton>
          </div>
        </Card>

      </div>
    );
  }
}

const mapState = (state) => {
  const {commentFields} = state.article
  return {
    articleId: state.article.articleDetail._id,
    authorError: commentFields.author.error,
    authorValue: commentFields.author.value,
    emailError: commentFields.email.error,
    emailValue: commentFields.email.value,
    contentError: commentFields.content.error,
    contentValue: commentFields.content.value,

    fieldsValid: state.article.commentFieldsValid,

    commentRequestStatus: state.article.commentRequestStatus,
    commentResultMessage: state.article.commentResultMessage,
  }
}

const mapDispatch = (dispatch) => ({
  thisUpdateCommentField: (fieldName, fieldValue) => {
    dispatch(updateCommentField(fieldName, fieldValue))
  },
  thisCheckCommentFields: () => {
    dispatch(checkCommentFields())
  },
  thisRequestCommentInit: () => {
    dispatch(requestCommentInit())
  },
  thisRequestComment: (commentFields) => {
    dispatch(requestComment(commentFields))
  }
})

export default connect(mapState, mapDispatch)(CommentEditor)
