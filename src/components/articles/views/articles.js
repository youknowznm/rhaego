import React from 'react'
import {connect} from 'react-redux'
import {Typography} from 'material-ui'
import {CircularProgress} from 'material-ui/Progress'
import ArticleCard from './articleCard'
import {useMaterialBackground, getQueryObj} from '../../../utils'
import {getArticles} from '../actions'

import './articles.css'

class Articles extends React.Component {
  componentDidMount() {
    const targetTag = getQueryObj().tag || ''
    this.props.thisGetArticles(targetTag)
  }
  componentDidUpdate(prevProps) {
    if (this.props.articlesArr !== prevProps.articlesArr) {
      useMaterialBackground('.content .card')
    }
  }
  render() {
    let {
      getArticlesRequestStatus,
      articlesArr,
      getArticlesStatusMessage,
    } = this.props
    switch (getArticlesRequestStatus) {
      case 'initial':
        return <div></div>
      case 'loading':
        return (
          <CircularProgress className="mb-center" />
        )
      case 'failed':
        return (
          <Typography className="mb-center" type="subheading">
            {getArticlesStatusMessage}
          </Typography>
        )
      case 'completed':
        if (articlesArr.length === 0) {
          return (
            <Typography className="mb-center" type="subheading">
              {getArticlesStatusMessage}
            </Typography>
          )
        }
        return (
          <div className="articles">
            {
              articlesArr.map((item, i) => (
                <ArticleCard
                  key={i}
                  articleData={item}
                />
              ))
            }
          </div>
        )
      default:
        throw new Error('unexpected status ' + getArticlesRequestStatus)
    }
  }
}

const mapState = (state) => {
  return {
    getArticlesRequestStatus: state.articles.getArticlesRequestStatus,
    articlesArr: state.articles.articlesArr,
    getArticlesStatusMessage: state.articles.getArticlesStatusMessage,
  }
}

const mapDispatch = (dispatch) => ({
  thisGetArticles: (targetTag) => dispatch(getArticles(targetTag))
})

export default connect(mapState, mapDispatch)(Articles)
