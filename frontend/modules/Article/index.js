import React from 'react';
import c from 'classnames'
import marked from 'marked'
import hljs from "highlight.js";
import {
  ajax,
  animateToScrollHeight,
  throttle,
  formatToMaterialSpans,
  get,
  getStyleInt,
  noop,
  getSearchParams, isValidString, omit, getTagsFromText, getStyle
} from "~/utils";
import TextField from "~/components/TextField";
import Button from "~/components/Button";
import {formatDateToPast} from "~/utils"
import style from './article.scss'
import {GET_ARTICLE_DETAIL} from '~api'
import {SvgComment, SvgHeart} from "~/assets/svg";
import Loading from "~/components/Loading";

export default class Article extends React.Component {

  state = {
    markdownContent: '',
    headers: [],
    articleId: '',
    title: '',
    tags: [],
    isScrollIng: false,
    isLoading: false,
    emptyReason: '',
    commentAuthor: '',
    commentEmail: '',
    commentContent: '',
    parsedHTML: null,
  }

  compRef = null
  setRef = ref => {
    if (this.compRef === null) {
      this.compRef = ref
    }
  }

  setParsedHTML = () => {
    const {markdownContent} = this.state
    if (!isValidString(markdownContent)) {
      return
    }
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
    this.setState({
      parsedHTML: marked(markdownContent)
    })
    // 副作用更新了 DOM, 所以下次循环处理
    setTimeout(() => {
      this.setCatalog()
    })
  }

  setCatalog = () => {
    // 用 qs 因为 marked() 替换了 ref 获取到的 DOM 节点
    const headersDOM = this.compRef.querySelector('.rhaego-markdown')
      .querySelectorAll('h1, h2, h3, h4, h5, h6')
    let headers = []
    let minLevel = 1
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
    for (let i = 0; i < 6; i++) {
      if (minLevel === 1) {
        break
      }
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

  componentDidMount() {
    this.getArticleBySearchId()
    window.addEventListener('scroll', this.scrollListener)
  }

  getArticleBySearchId = () => {
    const {id} = getSearchParams()
    if (isValidString(id)) {
      this.setState({
        articleId: id,
        isLoading: true
      })
      get(GET_ARTICLE_DETAIL, {
        id
      })
        .then(res => {
          this.setState({
            markdownContent: res.article.markdownContent,
            title: res.article.title,
            tags: getTagsFromText(res.article.tagsText)
          })
          this.setParsedHTML()
        })
        .finally(() => {
          // setTimeout(() => {
            this.setState({
              isLoading: false
            })
          // }, 2000)
        })
    }
  }

  // TODO 注释
  // 请原谅这里的 magic numbers...
  scrollListener = throttle(() => {
    const {scrollTop} = document.documentElement
    var doc = this.compRef
    var nav = this.compRef.querySelector('.article-navs')
    if (!nav) {
      return
    }
    const navHeight = getStyleInt(nav, 'height')
    const docHeight = doc.clientHeight
    let top
    if (scrollTop >  docHeight - navHeight) {
      top = doc.clientHeight - navHeight - 24
    } else {
      top = scrollTop > 192 ? (scrollTop - 192 + 24): 24
    }
    nav.style.top = `${top}px`
  })

  componentDidUpdate() {}

  SCROLL_OFFSET_MARGIN = 160

  getScrollToHeaderFunc = targetScrollTop => evt => {
    if (this.state.isScrollIng) {
      return
    }
    this.setState({
      isScrollIng: true
    })
    animateToScrollHeight(
      targetScrollTop + this.SCROLL_OFFSET_MARGIN,
      () => {
        this.setState({
          isScrollIng: false
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
        <SvgHeart />
        <span className={'like count'}>3</span>
        <SvgComment />
        <span className={'comment count'}>7</span>
      </div>
      <div className={'tags'}>
        {
          this.state.tags.map((item, index) => (
            <Button className={'tag'} key={index}>
              {item}
            </Button>
          ))
        }
      </div>
      <span className={'date'}>发布于 2020-01-32</span>
    </div>
  }

  getSetStateMethod = stateKey => evt => {
    this.setState({
      [stateKey]: evt.target.value
    })
  }

  renderCommentEditor = () => {
    if (!isValidString(this.state.markdownContent)) {
      return null
    }
    return <div className={'comment edit'}>
      <p className={'title'}>欢迎留下您的评论。</p>
      <TextField
        className={'comment-author'}
        label={'称呼'}
        value={this.state.commentAuthor}
        onChange={this.getSetStateMethod('commentAuthor')}
        width={240}
        maxLength={16}
        validatorRegExp={/^\d{2,16}$/}
        hint={'输入2至16个字符的称呼。'}
      />
      <TextField
        className={'comment-email'}
        label={'邮箱'}
        value={this.state.commentEmail}
        onChange={this.getSetStateMethod('commentEmail')}
        width={240}
        maxLength={30}
        validatorRegExp={/^\d{2,16}$/}
        hint={'输入常见的邮箱格式。'}
      />
      <TextField
        className={'comment-content'}
        label={'内容'}
        value={this.state.commentContent}
        onChange={this.getSetStateMethod('commentContent')}
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

  renderComments = () => {
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
        cms.map((item, index) => (
          <li className={'comment existed'} key={index}>
            <p className={'author'}>
              {item.author}
              <span> 发表于 </span>
              {formatDateToPast(item.date)}
            </p>
            <p className={'content'}>{item.content}</p>
          </li>
        ))
      }
    </ul>
  }

  render() {
    // return null
    return (
      <Loading isLoading={this.state.isLoading} emptyReason={null}>
        <div className={'rhaego-article'} ref={this.setRef}>
          <ul className={'article-navs'}>
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
          <div className={'article-content'} onClick={this.handleClick}>
            <div className={'article-top'}>
              <h1 className={'title'}>{formatToMaterialSpans(this.state.title)}</h1>
              {this.renderInfo()}
            </div>
            <div
              className={'rhaego-markdown'}
              dangerouslySetInnerHTML={{__html: this.state.parsedHTML}}
            />
          </div>
          <div className={'article-bottom'}>
            {this.renderCommentEditor()}
            {this.renderComments()}
          </div>
        </div>
      </Loading>
    )
  }
}