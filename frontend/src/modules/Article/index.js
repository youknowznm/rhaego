import React from 'react';
import c from 'classnames'
import marked from 'marked'
import hljs from "highlight.js";

import {ajax, get} from "~/utils";

import style from './article.scss'

export default class Article extends React.Component {

  renderMain = () => {
  }

  state = {
    markdownContent: '',
    headers: []
  }

  docRef = null
  setDocRef = ref => {
    this.docRef = ref
    // const headers = this.docRef.querySelectorAll('h1')
    // console.log({headers})
  }

  setHTML = () => {
    const renderer = new marked.Renderer()
    renderer.link = (href, title, text) => {
      return `<a target="_blank" href="${href}" title="'${title}">${text}</a>`;
    }
    marked.setOptions({
      renderer,
      breaks: true,
      highlight: code => {
        return hljs.highlightAuto(code).value
      }
    })
    return {
      __html: marked(this.state.markdownContent)
    }
  }

  componentDidMount() {
    this.setDocRef()
    get('http://localhost:3000')
      .then(res => {
        this.setState({
          markdownContent: res.text
        })
      })
  }

  componentDidUpdate() {
  }

  componentWillUnmount() {
    // this.docRef = null
  }

  render() {

    return (
      <div className={'rhaego-article'} style={style}>
        <ul className={'nav'}>
          {
            this.state.headers.map(item => (
              <li className={''}>item</li>
            ))
          }
        </ul>
        <div className={'rhaego-markdown'} ref={ref => this.setDocRef(ref)}>
          <div dangerouslySetInnerHTML={this.setHTML()} />
        </div>
      </div>
    )
  }
}