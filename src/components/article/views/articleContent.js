import React from 'react'
import {connect} from 'react-redux'
import {
  LoadingArea,
  getQueryObj,
  SplitToSpans,
  highlightAllPre,
  getOffsetToPage,
  formatDate,
  getFingerprint,
  showAdminOnlyElements,
} from '../../../utils'
import {
  getArticleDetail,
  requestLike,
  requestLikeInit,
} from '../actions'
import {Button, Typography, Snackbar} from 'material-ui'
import {CircularProgress} from 'material-ui/Progress'
import Icon from 'material-ui/Icon'
import IconButton from 'material-ui/IconButton'
import FavoriteIcon from 'material-ui-icons/Favorite'
import CommentIcon from 'material-ui-icons/Comment'
import {CardHeader, CardContent, CardActions} from 'material-ui/Card'

import './article.css'

const handleScroll = () => {
  const articleNav = document.querySelector('.article-nav')
  if (articleNav !== null) {
    articleNav.style['top'] = `${document.scrollingElement.scrollTop + 24}px`
  }
}

const scrollToCommentEditor = () => {
  const el = document.querySelector('.comment-editor')
  const top = getOffsetToPage(el).top
  document.scrollingElement.scrollTop = top - 84
}

// 返回一个监听函数：使页面滚动到指定元素位置
const getNavClickHandler = (index) => () => {
  if (index === 0) {
    document.scrollingElement.scrollTop = 0
  } else {
    const el = document.querySelector(`#header-anchor-${index - 1}`)
    const top = getOffsetToPage(el).top
    document.scrollingElement.scrollTop = top - 84
  }
}

class ArticleContent extends React.Component {
  componentDidMount() {
    showAdminOnlyElements()
    this.props.thisGetArticleDetail(getQueryObj().id || '')
    window.addEventListener('scroll', handleScroll)
    this.state = {
      headerTextArr: [],
    }
  }
  componentDidUpdate(nextProps) {
    // 获取文章结束
    if (this.props.articleDetail !== nextProps.articleDetail) {
      this.getHeaderTextArr()
      highlightAllPre('.article-content')
    }
    // 获取内容 h1 元素结束
    if (this.state.getHeaderTextArr !== nextProps.getHeaderTextArr) {
      getNavClickHandler()
    }
    // 点赞结束
    if (this.props.likeRequestStatus !== nextProps.likeRequestStatus) {
      if (nextProps.likeRequestStatus === 'completed') {
        const e = document.querySelector('.like-count')
        e.innerHTML = +e.innerHTML + 1
      }
      setTimeout(() => {
        this.props.thisRequestLikeInit()
      }, 2000)
    }
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', handleScroll)
  }
  getHeaderTextArr = () => {
    const articleNav = document.querySelector('.article-nav')
    const contentHeaderElements = document.querySelectorAll('.article-content > h1')
    const arr = ['索引']
    Array.prototype.forEach.call(contentHeaderElements, (elem, index) => {
      elem.setAttribute('id', `header-anchor-${index}`)
      arr.push(elem.innerHTML)
    })
    this.setState({
      headerTextArr: arr,
    })
  }
  handleLikeArticle = () => {
    const articleId = this.props.articleDetail._id
    getFingerprint((clientId) => {
      this.props.thisRequestLike({
        clientId,
        articleId,
      })
    })
  }
  render() {
    let {
      getArticleDetailRequestStatus,
      articleDetail,
      getArticleDetailStatusMessage,
      parsedHTMLContent,
      likeRequestStatus,
      likeResultMessage,
    } = this.props
    switch (getArticleDetailRequestStatus) {
      case 'initial':
        return <div></div>
      case 'loading':
        return (
          <CircularProgress className="mb-center" />
        )
      case 'failed':
        return (
          <div className="mb-center">
            {getArticleDetailStatusMessage}
          </div>
        )
      case 'completed':
        if (articleDetail._id === '') {
          return (
            <div className="mb-center">
              {getArticleDetailStatusMessage}
            </div>
          )
        }
        return (
          <div className="article-wrap">

            {/* 标题 */}
            <h1 className="article-title">
              <SplitToSpans>{articleDetail.title}</SplitToSpans>
            </h1>

            {/* 创建时间 */}
            <div className="row-1">
              <Typography component="i" type="body2" className="created-date">
                创建于 {formatDate(new Date(articleDetail.createdDate))}
              </Typography>
              <Button className="edit-button admin-only"
                raised
                color="secondary"
                href={`/admin/editor?articleId=${articleDetail._id}`}
              >
                编辑
              </Button>
            </div>

            {/* 内容 */}
            <article
              className="article-content mb-article"
              dangerouslySetInnerHTML={{__html: parsedHTMLContent}}
            />

            {/* 点赞评论按钮 类别标签 */}
            <div className="article-info">
              <div className="article-actions">
                <CardActions>
                  <IconButton className="like-button"
                    aria-label="Like"
                    onClick={this.handleLikeArticle}
                    disabled={['failed', 'completed'].includes(likeRequestStatus)}
                  >
                    <FavoriteIcon />
                  </IconButton>
                  <Typography className="like-count" type="caption">
                    {articleDetail.liked.length}
                  </Typography>
                  <IconButton className="comment-button"
                    aria-label="Comment"
                    onClick={scrollToCommentEditor}
                  >
                    <CommentIcon />
                  </IconButton>
                  <Typography className="comment-count" type="caption">
                    {articleDetail.comments.length}
                  </Typography>
                </CardActions>
              </div>
              <div className="article-tags">
                {
                  articleDetail.tags.map((tag, index) => {
                    const taggedLink = `/articles?tag=${tag}`
                    return (
                      <Button className="tag"
                        key={index}
                        color="default"
                        dense
                        raised
                        href={taggedLink}
                      >
                        {tag}
                      </Button>
                    )
                  })
                }
              </div>
            </div>

            {/* 索引 */}
            <ul className="article-nav">
              {
                this.state.headerTextArr.map((headerText, index) => (
                  <Typography type="body2" component="li"
                    key={index}
                    data-header-anchor={index}
                    className="article-nav-anchor"
                    onClick={getNavClickHandler(index)}
                  >
                    {headerText}
                  </Typography>
                ))
              }
            </ul>

            {/* 点赞结果 toast */}
            <Snackbar
              open={['failed', 'completed'].includes(likeRequestStatus)}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              message={likeResultMessage}
            />

          </div>
        )
      default:
        throw new Error('unexpected status ' + getArticleDetailRequestStatus)
    }
  }
}


const mapState = (state) => {
  return {
    getArticleDetailRequestStatus: state.article.getArticleDetailRequestStatus,
    articleDetail: state.article.articleDetail,
    getArticleDetailStatusMessage: state.article.getArticleDetailStatusMessage,
    parsedHTMLContent: state.article.parsedHTMLContent,

    likeRequestStatus: state.article.likeRequestStatus,
    likeResultMessage: state.article.likeResultMessage,
  }
}

const mapDispatch = (dispatch) => ({
  thisGetArticleDetail: (articleId) => {
    dispatch(getArticleDetail(articleId))
  },
  thisRequestLike: (likeObj) => {
    dispatch(requestLike(likeObj))
  },
  thisRequestLikeInit: () => {
    dispatch(requestLikeInit())
  },
})

export default connect(mapState, mapDispatch)(ArticleContent)
