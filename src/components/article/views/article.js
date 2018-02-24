import React from 'react'
import {connect} from 'react-redux'
import {LoadingArea, getQueryObj} from '../../../utils'
import {getArticleDetail} from '../actions'
import {Typography} from 'material-ui'
import {CircularProgress} from 'material-ui/Progress'

class Article extends React.Component {
  componentDidMount() {
    this.props.thisGetArticleDetail(getQueryObj().id || '')
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
          <div>
            <article
              className="editor-preview mb-article"
              dangerouslySetInnerHTML={{__html: parsedHTMLContent}}
            ></article>
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
  };
}

const mapDispatch = (dispatch) => ({
  thisGetArticleDetail: (articleId) => dispatch(getArticleDetail(articleId))
})

export default connect(mapState, mapDispatch)(Article)
