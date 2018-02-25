import React from 'react'
import ArticleContent from './articleContent'
import CommentEditor from './commentEditor'
import ArticleComments from './articleComments'

class Article extends React.Component {
  render() {
    return (
      <div>
        <ArticleContent />
        <CommentEditor />
        <ArticleComments/>
      </div>
    );
  }

}

export default Article
