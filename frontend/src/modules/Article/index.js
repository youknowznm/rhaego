import React from 'react';
import c from 'classnames'
import marked from 'marked'
import hljs from "highlight.js";

import {ajax, animateToScrollHeight, formatToMaterialSpans, get, getStyleInt, noop} from "~/utils";

import {throttle, debounce} from 'lodash'

import style from './article.scss'
import TextField from "~/components/TextField";
import {svgCommentDark, svgComment, svgHeartDark, svgHeart} from "~/assets/svg";
import Button from "~/components/Button";
import toReadableDateString from "~/utils/toReadableDateString";



const re = {

  login: {
    // (zhngnmng)(@sina)(.com)(.cn)
    emailReg: /^([a-zA-Z0-9]+[\w-]*)(@[\w]{2,})(\.[\w]{2,4})(\.[\w]{2,4})?$/,
    // 12345678
    passwordReg: /^.{6,20}$/,
  },

  editor: {
    titleReg: /^.{10,40}$/,
    summaryReg: /^.{10,100}$/,
    createdDateReg: /^\d{4}-\d{2}-\d{2}$/,
    contentReg: /\S/,
  },

  comment: {
    authorReg: /^.{4,16}$/,
    emailReg: /^([a-zA-Z0-9]+[\w-]*)(@[\w]{2,})(\.[\w]{2,4})(\.[\w]{2,4})?$/,
    contentReg: /^.{4,120}$/,
  },

}

export default class Article extends React.Component {

  state = {
    markdownContent: '',
    headers: [],
    tags: [112,315],
    scrollIng: false,
  }

  docRef = null
  setRef = ref => {
    if (this.docRef === null) {
      this.docRef = ref
    }
  }

  setParsedHTML = () => {
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

  // 请原谅这里的 magic numbers...

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
      headers.unshift({
        level: 1,
        label: '索引',
        offsetTop: this.SCROLL_OFFSET_MARGIN - 64 - 24
      })
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

  SCROLL_OFFSET_MARGIN = 160

  getScrollToHeaderFunc = targetScrollTop => evt => {
    if (this.state.scrollIng) {
      return
    }
    this.setState({
      scrollIng: true
    })
    animateToScrollHeight(
      targetScrollTop + this.SCROLL_OFFSET_MARGIN,
      () => {
        this.setState({
          scrollIng: false
        })
      }
    )
  }

  handleClick =(evt) => {
    const src = evt.nativeEvent.target.getAttribute('src')
    if (src !== null) {
      window.open(src)
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollListener)
  }

  renderInfo = () => {
    return <div className={'info'}>
      <div className={'actions'}>
        {svgHeart}
        <span className={'like count'}>3</span>
        {svgComment}
        <span className={'comment count'}>7</span>
      </div>
      <div className={'tags'}>
        {
          this.state.tags.map((item, index) => (
            <Button  className={'tag'} key={index}>
              {item}
            </Button>
          ))
        }
      </div>
      <span className={'date'}>发布于 2020-01-32</span>
    </div>
  }

  renderComments = () => {
    return <div className={'comment edit'}>
      <p className={'title'}>欢迎留下您的评论。</p>
      <TextField
        className={'comment-author'}
        label={'称呼'}
        value={this.state.commentAuthor}
        width={240}
        maxLength={16}
        validatorRegExp={/^\d{2,16}$/}
        hint={'输入2至16个字符的称呼。'}
      />
      <TextField
        className={'comment-email'}
        label={'邮箱'}
        value={this.state.commentAuthor}
        width={240}
        maxLength={30}
        validatorRegExp={/^\d{2,16}$/}
        hint={'输入常见的邮箱格式。'}
      />
      <TextField
        className={'comment-content'}
        label={'内容'}
        value={this.state.commentAuthor}
        width={492}
        maxLength={120}
        validatorRegExp={/^.{4,120}$/}
        hint={'输入4至120字符的评论。'}
      />
      <Button
        className={'submit'}
        type={'primary'}
      >
        提交
      </Button>
    </div>
  }

  renderComments2 = () => {
    const cms = [
      {
        author: 'adf',
        content: 'adfafsdfafd',
        date: new Date('2020-01-01'),
      },
    ]
    for (let i = 0; i < 3; i++) {
      cms.push(cms[0])
    }
    return <ul className={'comments'}>
      {
        cms.map(item => (
          <li className={'comment existed'}>
            <p className={'author'}>
              {item.author}
              <span> 发表于 </span>
              {toReadableDateString(item.date)}
            </p>
            <p className={'content'}>{item.content}</p>
          </li>
        ))
      }
    </ul>
  }

    render() {
    const title = 'Progress 进度条组件 Progress 进度条组件 Progress 进度条组件 Progress 进度条组件 '
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
        <div className={'article-content'} onClick={this.handleClick} ref={this.setRef}>
          <div className={'article-top'}>
            <h1 className={'title'}>{formatToMaterialSpans(title)}</h1>
            {this.renderInfo()}
          </div>
          <div className={'rhaego-markdown'} dangerouslySetInnerHTML={this.setParsedHTML()} />
        </div>
        <div className={'article-bottom'}>
          {this.renderComments()}
          {this.renderComments2()}
        </div>
      </div>
    )
  }
}