import React from 'react'
import {connect} from 'react-redux'
import {IconButton, Typography, Snackbar,Avatar} from 'material-ui'
import Card, {CardContent, CardHeader} from 'material-ui/Card'
import DeleteIcon from 'material-ui-icons/Delete'
import {
  getQueryObj,
  getOffsetToPage,
  toReadableDateString,
  showAdminOnlyElements,
} from '../../../utils'
import {
  getArticleDetail,
  requestDeleteComment,
  requestDeleteCommentInit,
} from '../actions'

import './article.css'

const scrollToCommentEnd = () => {
  const el = document.querySelector('.mb-footer')
  const top = getOffsetToPage(el).top
  document.scrollingElement.scrollTop = top - 84
}

class CommentList extends React.Component {
  componentDidMount() {
    showAdminOnlyElements()
  }
  componentDidUpdate(prevProps) {
    showAdminOnlyElements()
    // 新增了评论时，滚动至评论末尾
    if (prevProps.comments.length < this.props.comments.length) {
      scrollToCommentEnd()
    }
    if (prevProps.deleteCommentRequestStatus !== this.props.deleteCommentRequestStatus) {
      switch (this.props.deleteCommentRequestStatus) {
        case 'completed':
          setTimeout(() => {
            this.props.thisGetArticleDetail(getQueryObj().id)
            this.props.thisRequestDeleteCommentInit()
          }, 2000)
          break
        case 'failed':
          setTimeout(() => {
            this.props.thisRequestDeleteCommentInit()
          }, 2000)
          break
        default:
          return
      }
    }
  }
  handleDeleteComment = (commentId) => () => {
    this.props.thisRequestDeleteComment(commentId)
  }
  render() {
    const {
      comments,
      deleteCommentRequestStatus,
      deleteCommentResultMessage,
    } = this.props
    const noCommentClassName = `no-comment ${comments.length > 0 ? 'hidden' : ''}`
    return (
      <div className="comment-list">
        <Typography className={noCommentClassName} type="body2">
          还没有人发表评论。
        </Typography>
        {
          comments.map((comment, index) => {
            return (
              <Card className="comment-list-item"
                key={comment._id}
                id={comment._id}
              >
                <CardHeader
                  className="comment-header"
                  avatar={
                    <Avatar className="comment-avatar">
                      {comment.author.trim().slice(0,1)}
                    </Avatar>
                  }
                  title={comment.author}
                  subheader={toReadableDateString(new Date(comment.createdDate))}
                >
                </CardHeader>

                <CardContent className="comment-content">
                  <Typography component="p">
                    {comment.content}s
                  </Typography>
                </CardContent>

                <div className="comment-actions">
                  <IconButton className="delete-button admin-only"
                    color="default"
                    aria-label="Delete"
                    onClick={this.handleDeleteComment(comment._id)}
                    disabled={['failed', 'completed'].includes(deleteCommentRequestStatus)}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <Typography className="comment-index"
                    type="body2"
                    color="secondary"
                  >
                    #{index}
                  </Typography>
                </div>

              </Card>
            )
          })
        }

        {/* 删除结果 toast */}
        <Snackbar
          open={['failed', 'completed'].includes(deleteCommentRequestStatus)}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          message={deleteCommentResultMessage}
        />

      </div>
    )
  }
}

const mapState = (state) => {
  return {
    comments: state.article.articleDetail.comments,
    deleteCommentRequestStatus: state.article.deleteCommentRequestStatus,
    deleteCommentResultMessage: state.article.deleteCommentResultMessage,
  }
}

const mapDispatch = (dispatch) => ({
  thisRequestDeleteComment: (commentId) => {
    dispatch(requestDeleteComment(commentId))
  },
  thisRequestDeleteCommentInit: () => {
    dispatch(requestDeleteCommentInit())
  },
  thisGetArticleDetail: (articleId) => {
    dispatch(getArticleDetail(articleId))
  },
})

export default connect(mapState, mapDispatch)(CommentList)
