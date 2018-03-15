import React from 'react'
import {connect} from 'react-redux'
import Cookie from 'js-cookie'
import {Card, Typography} from 'material-ui'
import {FormControl, FormHelperText} from 'material-ui/Form'
import Input, {InputLabel} from 'material-ui/Input'
import {getArticleDetail} from '../actions'
import {
  getQueryObj,
  getFingerprint,
  AsyncButton,
} from '../../../utils'
import {
  updateCommentField,
  checkCommentFields,
  requestComment,
  requestCommentInit,
} from '../actions'

import './article.css'

class CommentEditor extends React.Component {
  componentDidMount() {
    this.props.thisUpdateCommentField('author', Cookie.get('commentAuthor') || '')
    this.props.thisUpdateCommentField('email', Cookie.get('commentEmail') || '')
  }
  componentWillUpdate(nextProps) {
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
        break
      case 'failed':
        setTimeout(() => {
          this.props.thisRequestCommentInit()
        }, 2000)
        break
      case 'completed':
        // 评论成功
        this.props.thisGetArticleDetail(getQueryObj().id)
        Cookie.set('commentAuthor', this.props.authorValue)
        Cookie.set('commentEmail', this.props.emailValue)
        setTimeout(() => {
          this.props.thisRequestCommentInit()
        }, 2000)
        break
      default:
        break
    }
  }
  onChangeValue = (field) => (evt) => {
    const fieldName = field
    const fieldValue = evt.target.value
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
          <Typography variant="caption" component="i">
            欢迎留下您的评论。
          </Typography>
          <div className="row comment-wrap-1">
            <FormControl className="comment-input comment-author" margin="normal">
              <InputLabel htmlFor="comment-author">
                称呼
              </InputLabel>
              <Input
                id="comment-author"
                type="text"
                value={authorValue}
                onChange={this.onChangeValue('author')}
                error={authorError}
                inputProps={{
                  'maxLength': '16',
                }}
              />
              <FormHelperText className={authorError ? 'error' : ''}>
                称呼由4至16个字组成。
              </FormHelperText>
            </FormControl>

            <FormControl className="comment-input comment-email" margin="normal">
              <InputLabel htmlFor="comment-email">
                邮箱
              </InputLabel>
              <Input
                id="comment-email"
                type="text"
                value={emailValue}
                onChange={this.onChangeValue('email')}
                error={emailError}
                inputProps={{
                  'maxLength': '30',
                }}
              />
              <FormHelperText className={emailError ? 'error' : ''}>
                输入常见的邮箱格式。
              </FormHelperText>
            </FormControl>
          </div>
          <div className="row">
            <FormControl className="comment-input-content" margin="normal">
              <InputLabel htmlFor="comment-input-content">
                内容
              </InputLabel>
              <Input
                id="comment-input-content"
                type="text"
                value={contentValue}
                onChange={this.onChangeValue('content')}
                error={contentError}
                inputProps={{
                  'maxLength': '120',
                }}
              />
              <FormHelperText className={emailError ? 'error' : ''}>
                输入4至120个字作为评论内容。
              </FormHelperText>
            </FormControl>
          </div>
          <div className="row submit-button-row">
            <AsyncButton
              fullWidth
              variant="raised"
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
    )
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
  },
  thisGetArticleDetail: (articleId) => {
    dispatch(getArticleDetail(articleId))
  },
})

export default connect(mapState, mapDispatch)(CommentEditor)
