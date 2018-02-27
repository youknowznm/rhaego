import React from 'react'
import {connect} from 'react-redux'
import ArticleContent from './articleContent'
import CommentEditor from './commentEditor'
import CommentList from './commentList'

class Article extends React.Component {
  render() {
    const {articleDetail} = this.props
    return (
      <div>
        <ArticleContent />
        {
          articleDetail._id === ''
            ? ''
            : <div>
              <CommentEditor />
              <CommentList/>
            </div>
        }
      </div>
    );
  }

}


const mapState = (state) => {
  return {
    articleDetail: state.article.articleDetail,
  }
}

export default connect(mapState)(Article)
