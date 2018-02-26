import React from 'react'
import ArticleContent from './articleContent'
import CommentEditor from './commentEditor'
import CommentList from './commentList'

class Article extends React.Component {
  render() {
    return (
      <div>
        <ArticleContent />
        <CommentEditor />
        <CommentList/>
      </div>
    );
  }

}

export default Article
