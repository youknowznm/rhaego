import React from 'react'
import {connect} from 'react-redux'

import {IconButton, Button, Typography, Snackbar,Avatar} from 'material-ui'
import Card, { CardActions, CardContent ,CardHeader} from 'material-ui/Card';
import {FormControl, FormHelperText} from 'material-ui/Form'
import Input, {InputLabel, InputAdornment} from 'material-ui/Input'
import DeleteIcon from 'material-ui-icons/Delete'

import {
  LoadingArea,
  getQueryObj,
  SplitToSpans,
  highlightAllPre,
  getOffsetToPage,
  formatDate,
} from '../../../utils'
import {getArticleDetail} from '../actions'
import {CircularProgress} from 'material-ui/Progress'

import './article.css'

class CommentList extends React.Component {
  componentWillReceiveProps(n,s) {
    console.log(n,s);
  }
  render() {
    const {comments} = this.props
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
                      {comment.author.slice(0,1)}
                    </Avatar>
                  }
                  title={comment.author}
                  subheader={formatDate(new Date(comment.createdDate), true)}
                >
                </CardHeader>

                <CardContent className="comment-content">
                  <Typography component="p">
                    {comment.content}
                  </Typography>
                </CardContent>

                <div className="comment-actions">
                  <IconButton className="delete-button" color="default" aria-label="Delete">
                    <DeleteIcon />
                  </IconButton>
                  <Typography type="body2" color="secondary" className="comment-index">
                    #{index}
                  </Typography>
                </div>

              </Card>
            );
          })
        }
      </div>
    );
  }
}


const mapState = (state) => {
  return {
    comments: state.article.articleDetail.comments,
  }
}

const mapDispatch = (dispatch) => ({

})

export default connect(mapState, mapDispatch)(CommentList)
