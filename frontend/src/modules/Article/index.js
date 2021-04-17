import React from 'react';
import c from 'classnames'
import marked from 'marked'
import hljs from "highlight.js";

import {ajax, animateToScrollHeight, get, getStyleInt} from "~/utils";

import {throttle, debounce} from 'lodash'

import style from './article.scss'

export default class Article extends React.Component {

  state = {
    markdownContent: '',
    headers: [],
    scrollIng: false,
  }

  docRef = null
  setRef = ref => {
    if (this.docRef === null) {
      this.docRef = ref
    }
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
    get('http://localhost:3000')
      .then(res => {
        this.setState({
          markdownContent: res.text
        })
      })
    window.addEventListener('scroll', this.scrollListener)
  }

  scrollListener = throttle(() => {
    const {scrollTop} = document.documentElement
    var doc = this.docRef
    var nav = this.navRef
    const navHeight = getStyleInt(nav, 'height')
    const docHeight = doc.clientHeight
    let top
    if (scrollTop >  docHeight - navHeight) {
      top = doc.clientHeight - navHeight - 24
    } else {
      top = scrollTop > 192 ? (scrollTop - 192 + 24): 24
    }
    this.navRef.style.top = `${top}px`
  })

  componentDidUpdate() {
    if (this.docRef && this.state.headers.length === 0) {
      const headersDOM = this.docRef.querySelectorAll('h2, h3, h4')
      let headers = []
      let minLevel = -1
      for (let i = 0; i < headersDOM.length; i++) {
        const curr = headersDOM[i]
        const level = parseInt(curr.tagName.replace(/\D/g, ''), 10)
        headers.push({
          level,
          label: curr.innerHTML,
          offsetTop: curr.offsetTop,
        })
        minLevel = Math.max(minLevel, level)
      }
      // 处理为最小 tag 类型为 1
      while (minLevel !== 1) {
        headers = headers.map(item => {
          return {
            ...item,
            level: item.level - 1
          }
        })
        minLevel = Math.min(...(headers.map(item => item.level)))
      }
      this.setState({
        headers
      })
    }
  }

  navRef = null
  setNavRef = ref => {
    if (this.navRef === null) {
      this.navRef = ref
    }
  }

  getScrollToHeaderFunc = targetScrollTop => evt => {
    if (this.state.scrollIng) {
      return
    }
    this.setState({
      scrollIng: true
    })
    animateToScrollHeight(targetScrollTop + 160, () => {
      this.setState({
        scrollIng: false
      })
    })
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollListener)
  }

  render() {
    return (
      <div className={'rhaego-article'} style={style} ref={this.setRef}>
        <ul className={'article-navs'} ref={this.setNavRef}>
          {
            this.state.headers.map((item, index) => (
              <li
                key={index}
                className={c(
                  'article-nav',
                  `level-${item.level}`
                )}
                onClick={this.getScrollToHeaderFunc(item.offsetTop)}
              >
                {item.label}
              </li>
            ))
          }
        </ul>
        <div className={'rhaego-markdown'}>
          <div dangerouslySetInnerHTML={this.setHTML()} />
        </div>
      </div>
    )
  }
}