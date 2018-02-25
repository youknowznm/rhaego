import React from 'react'
import {connect} from 'react-redux'
import {
  LoadingArea,
  getQueryObj,
  SplitToSpans,
  highlightAllPre,
  getOffsetToPage,
} from '../../../utils'
import {getArticleDetail} from '../actions'
import {Button, Typography} from 'material-ui'
import {CircularProgress} from 'material-ui/Progress'

import './article.css'

const handleScroll = () => {
  const articleNav = document.querySelector('.article-nav')
  if (articleNav !== null) {
    articleNav.style['top'] = `${document.scrollingElement.scrollTop + 24}px`
  }
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
    this.props.thisGetArticleDetail(getQueryObj().id || '')
    window.addEventListener('scroll', handleScroll)
    this.state = {
      headerTextArr: [],
    }
  }
  componentDidUpdate(nextProps) {
    if (this.props.articleDetail !== nextProps.articleDetail) {
      this.getHeaderTextArr()
      highlightAllPre('.article-content')
    }
    if (this.state.getHeaderTextArr !== nextProps.getHeaderTextArr) {
      getNavClickHandler()
    }
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', handleScroll)
  }
  getHeaderTextArr = () => {
    const articleNav = document.querySelector('.article-nav')
    const contentHeaderElements = document.querySelectorAll('#article-content > h1')
    const arr = ['目录']
    Array.prototype.forEach.call(contentHeaderElements, (elem, index) => {
      elem.setAttribute('id', `header-anchor-${index}`)
      arr.push(elem.innerHTML)
    })
    this.setState({
      headerTextArr: arr,
    })
  }
  render() {
    let {
      getArticleDetailRequestStatus,
      articleDetail,
      getArticleDetailStatusMessage,
      parsedHTMLContent,
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
        if (articleDetail === null) {
          return (
            <div className="mb-center">
              {getArticleDetailStatusMessage}
            </div>
          )
        }
        return (
          <div className="article-content">

            <h1 className="article-title">
              <SplitToSpans className="mono">{articleDetail.title}</SplitToSpans>
            </h1>

            {/* <div className="separator"></div> */}

            <article
              id="article-content"
              className="mb-article"
              dangerouslySetInnerHTML={{__html: parsedHTMLContent}}
            ></article>

            <div className="article-info">
              <Typography component="i" type="body1" className="created-date">
                创建于 {articleDetail.createdDate}
              </Typography>
              <div className="tags">

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
              {/* <Typography component="i" type="body1" className="tag-helper">
                查看更多文章：
              </Typography> */}
            </div>

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
  }
}

const mapDispatch = (dispatch) => ({
  thisGetArticleDetail: (articleId) => dispatch(getArticleDetail(articleId))
})

export default connect(mapState, mapDispatch)(ArticleContent)
