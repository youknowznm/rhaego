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
  parseMarkdown,
  debounce,
  getSearchParams, isValidString, omit, getTagsFromText, getStyle
} from "~/utils";
import TextField from "~/components/TextField";
import Button from "~/components/Button";
import {formatDateToPast} from "~/utils"
import {GET_ARTICLE_DETAIL} from '~api'
import {SvgComment, SvgHeart} from "~/assets/svg";
import Loading from "~/components/Loading";

import style from './article.scss'
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
            parsedHTML: parseMarkdown(res.article.markdownContent),
            title: res.article.title,
            tags: getTagsFromText(res.article.tagsText)
          })
          // 副作用更新了 DOM, 所以下次循环处理
          setTimeout(() => {
            this.setCatalog()
          })
        })
        .finally(() => {
          this.setState({
            isLoading: false
          })
        })
    }
  }

  setCatalog = () => {
    // 用 qs 因为 marked() 替换了 ref 获取到的 DOM 节点
    const headersDOM = this.compRef.querySelector('.rhaego-markdown')
      .querySelectorAll('h1, h2, h3, h4, h5, h6')
    let headers = []
    let minLevel = 10
    for (let i = 0; i < headersDOM.length; i++) {
      const curr = headersDOM[i]
      const level = parseInt(curr.tagName.replace(/\D/g, ''), 10)
      headers.push({
        level,
        label: curr.innerHTML,
        node: curr,
      })
      minLevel = Math.min(minLevel, level)
    }
    // console.log({minLevel})
    // console.log(headers)
    // 处理为最小 tag 类型为 1
    for (let i = 1; i < minLevel; i++) {
      headers = headers.map(item => {
        return {
          ...item,
          level: item.level - 1
        }
      })
    }
    // console.log(headers)
    headers.unshift({
      level: 1,
      label: '索引',
      offsetTop: this.HEADER_BANNER_HEIGHT - 64 - 24
    })
    this.setState({
      headers
    })
  }

  // 调整导航的 top
  // (请原谅这里的 magic numbers, 见注释)
  scrollListener = throttle(() => {
    const {scrollTop} = document.documentElement
    var doc = this.compRef.querySelector('.article-content')
    var nav = this.compRef.querySelector('.article-navs')
    if (!nav) {
      return
    }
    const navHeight = getStyleInt(nav, 'height')
    const docHeight = doc.clientHeight
    let top
    // 调整 top:
    if (scrollTop > docHeight - navHeight) {
      // 滚动高度 大于 (文档高度 - 导航高度),
      // 说明已经滚过了文章结尾,
      // 固定导航 top 为 (文档高度 - 导航高度 - 内边距);
      top = docHeight - navHeight - 24
    } else {
      top = scrollTop > this.HEADER_BANNER_HEIGHT
        // 如果滚动高度大于 header banner 高度, 则根据前者, 动态计算;
        ? (scrollTop - this.HEADER_BANNER_HEIGHT + 24)
        // 否则固定为 内边距
        : 24
    }
    nav.style.top = `${top}px`
  })

  HEADER_BANNER_HEIGHT = 192

  getScrollToHeaderFunc = catalogItem => evt => {
    if (this.state.isScrollIng) {
      return
    }
    this.setState({
      isScrollIng: true
    })
    const targetHeight = catalogItem.label === '索引'
      ? 0
      : catalogItem.node.offsetTop - 12
    animateToScrollHeight(
      targetHeight + this.HEADER_BANNER_HEIGHT,
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

  deleteArticle = () => {
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
            parsedHTML: parseMarkdown(res.article.markdownContent),
            title: res.article.title,
            tags: getTagsFromText(res.article.tagsText)
          })
          // 副作用更新了 DOM, 所以下次循环处理
          setTimeout(() => {
            this.setCatalog()
          })
        })
        .finally(() => {
          this.setState({
            isLoading: false
          })
        })
    }
  }

  renderAdmin = () => {
    return (
      <div className={'admin-row'}>
        <Button
          className={'edit-article'}
          type={'primary'}
          link={`/editor?id=${this.state.articleId}`}
        >
          编辑文章
        </Button>
        <Button
          className={'delete-article'}
          type={'secondary'}
        >
          删除文章
        </Button>
      </div>
    )
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
    return (
      <div className={'comment editor'}>
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
    )
  }

  renderComments = () => {
    const cms = [
      {
        author: 'adf',
        content: '建议马斯克全面退出中国市场，建议马斯克全面退出中国市场，建议马斯克全面退出中国市场，建议马斯克全面退出中国市场，建议马斯克全面退出中国市场，',
        date: new Date('2020-01-01'),
      },
    ]
    for (let i = 0; i < 3; i++) {
      cms.push(cms[0])
    }
    return (
      <ul className={'comments'}>
        {
          cms.map((item, index) => (
            <li className={'comment existed'} key={index}>
              <p className={'title'}>
                <span className={'author'}>
                  {item.author}
                </span>
                <span className={'date'}>
                  {formatDateToPast(item.date)}
                </span>
                <span className={'ip'}>
                  172.184.12.599
                </span>
              </p>
              <p className={'content'}>
                {item.content}
              </p>
              <Button
                className={'delete'}
                size={'small'}
                type={'secondary'}
              >
                删除评论
              </Button>
            </li>
          ))
        }
      </ul>
    )
  }

  render() {
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
                  onClick={this.getScrollToHeaderFunc(item)}
                >
                  {item.label}
                </li>
              ))
            }
          </ul>
          <div className={'article-content'} onClick={this.handleClick}>
            <div className={'article-top'}>
              <h1 className={'main-title'}>
                {formatToMaterialSpans(this.state.title)}
              </h1>
              {this.renderInfo()}
            </div>
            <div
              className={'rhaego-markdown'}
              dangerouslySetInnerHTML={{__html: this.state.parsedHTML}}
            />
          </div>
          <div className={'article-bottom'}>
            {this.renderAdmin()}
            {this.renderCommentEditor()}
            {this.renderComments()}
          </div>
        </div>
      </Loading>
    )
  }
}