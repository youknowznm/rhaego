import React from 'react';
import c from 'classnames'
import ReactMarkdown from 'react-markdown'

import {ajax} from "~/utils";

import style from './article.scss'

export default class Article extends React.Component {

  renderMain = () => {
  }

  state = {
    markdownContent: ''
  }

  componentDidMount() {

    ajax('http://localhost:3000', 'GET')
      .then(res => {
        this.setState({
          markdownContent: JSON.parse(res).text
        })
      })
  }

  render() {

    return (
      <div className={'rhaego-markdown'} style={style}>
        <ReactMarkdown linkTarget={'_blank'}
        >{this.state.markdownContent}</ReactMarkdown>
      </div>
    )
  }
}