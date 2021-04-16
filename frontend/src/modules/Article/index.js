import React from 'react';
import c from 'classnames'
import marked from 'marked'
import hljs from "highlight.js";

import {ajax} from "~/utils";

import style from './article.scss'

export default class Article extends React.Component {

  renderMain = () => {
  }

  state = {
    markdownContent: ''
  }

  docRef = null
  setDocRef = ref => {
    this.docRef = ref
  }

  setHTML = () => {
    marked.setOptions({
      renderer: new marked.Renderer(),
      gfm: true,
      pedantic: false,
      sanitize: false,
      tables: true,
      breaks: true,
      smartLists: true,
      smartypants: true,
      highlight: code => {
        return hljs.highlightAuto(code).value;
      }
    })
    return {
      __html: marked(this.state.markdownContent)
    }
  }

  componentDidMount() {
    this.setDocRef()
    ajax('http://localhost:3000', 'GET')
      .then(res => {
        this.setState({
          markdownContent: JSON.parse(res).text
        })
      })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
  }

  render() {

    return (
      <div className={'rhaego-markdown'} style={style} ref={ref => this.setDocRef(ref)}>
        <div dangerouslySetInnerHTML={this.setHTML()}></div>
      </div>
    )
  }
}