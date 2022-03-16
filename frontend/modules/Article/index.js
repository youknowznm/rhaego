import React from 'react'
import c from 'classnames'
import {
  animateToScrollHeight,
  formatToMaterialSpans,
  get,
  getStyleInt,
  noop,
  markdownParser,
  getSearchParams, isValidString, omit, getTagsFromText, getStyle,
  Link, withRouter, post, RESUME_ID, getNodeOffsetTopToPage, addClass, hasClass,
} from '~utils'
import TextField from '~/components/TextField'
import Button from '~/components/Button'
import {formatDateToPast} from '~utils'
import api from '~api'
import {SvgComment, SvgThumbUp} from '~/assets/svg'
import Loading from '~/components/Loading'
import PropTypes from 'prop-types'
import {toast} from '~/components/Toast'
import Comments from '~/modules/Comments'
import style from './article.scss'
import {MainContext} from '~/modules/Context'

class Article extends React.Component {

  state = {
    markdownContent: '',
    headers: [],
    articleId: '',
    title: '',
    likedCount: 0,
    commentCount: 0,
    tags: [],
    isScrollIng: false,
    isLoading: false,
    emptyReason: '',
    commentContent: '',
    parsedHTML: null,
    isResume: false,
  }

  compRef = null
  setRef = ref => {
    if (this.compRef === null) {
      this.compRef = ref
    }
  }

  componentDidMount() {
    this.getArticle()
    window.addEventListener('scroll', this.repositionSideNav)
    window.addEventListener('resize', this.repositionSideNav)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.location.search !== this.props.location.search) {
      this.getArticle()
    }
  }

  get isResume() {
    return this.state.articleId === RESUME_ID
  }

  getArticle = () => {
    const {id} = getSearchParams()
    this.setState({
      articleId: id,
      isLoading: true
    })
    get(api.GET_ARTICLE_DETAIL, {
      id
    })
      .then(res => {
        if (res.article === null) {
          toast('articleId 无效')
          return
        }
        this.setState({
          markdownContent: res.article.markdownContent,
          likedCount: res.article.likedCount,
          commentCount: res.article.commentCount,
          parsedHTML: markdownParser.parse(res.article.markdownContent),
          title: res.article.title,
          dateString: res.article.dateString,
          tags: getTagsFromText(res.article.tagsText),
        })

        // 设置文章标题为 header banner 标题
        if (!this.isResume) {
          this.context.setBannerTitle(res.article.title)
          this.context.setDocTitle(res.article.title)
        } else {
          this.context.setDocTitle('关于我')
        }
        setTimeout(() => {
          this.setCatalog()
        })
      })
      .catch(noop)
      .finally(() => {
        this.setState({
          isLoading: false,
        })
      })
  }

  HEADER_BANNER_HEIGHT = 192

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
        label: curr.innerText,
        node: curr,
      })
      minLevel = Math.min(minLevel, level)
    }
    // 处理为最小 tag 类型为 1
    for (let i = 1; i < minLevel; i++) {
      headers = headers.map(item => {
        return {
          ...item,
          level: item.level - 1
        }
      })
    }
    headers.unshift({
      level: 1,
      label: '索引',
      offsetTop: this.HEADER_BANNER_HEIGHT - 64 - 24
    })
    this.setState({
      headers
    })
    this.repositionSideNav()
  }

  // 调整导航的 top
  // (请原谅这里的 magic numbers, 见注释)
  repositionSideNav = () => {
    const {scrollTop} = document.documentElement
    const doc = this.compRef.querySelector('.article-content')
    const nav = this.compRef.querySelector('.article-sidebar')
    if (!nav) {
      return
    }
    const navHeight = getStyleInt(nav, 'height')
    const docHeight = doc.clientHeight
    const {
      left,
      width,
    } = doc.getBoundingClientRect()
    const navLeft = left + width + 24
    let navTop
    // 调整 top:
    if (scrollTop > docHeight - navHeight) {
      // 滚动高度 大于 (文档高度 - 导航高度),
      // 说明已经滚过了笔记结尾, 隐藏掉
      nav.style.left = `${navLeft}px`
      nav.style.visibility = 'hidden'
    } else {
      navTop = scrollTop > this.HEADER_BANNER_HEIGHT
        // 如果滚动高度大于 header banner 高度, 则根据前者, 动态计算
        ? (64 + 24)
        // 否则固定为 内边距
        : (this.HEADER_BANNER_HEIGHT + 64 + 24 - scrollTop)
      nav.style.left = `${navLeft}px`
      nav.style.top = `${navTop}px`
      nav.style.visibility = 'visible'
    }
    // 窄视口下有个莫名其妙的闪烁问题, 换个方式弥补吧
    if (!hasClass(nav, 'init')) {
      setTimeout(() => {
        addClass(nav, 'init')
      }, 500)
    }
  }

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

  scrollToEditor = noop
  setScrollToEditorFunc = func => {
    this.scrollToEditor = func
  }

  handleClickImage =(evt) => {
    const src = evt.nativeEvent.target.getAttribute('src')
    if (src !== null) {
      window.open(src)
    }
  }

  componentWillUnmount() {
    this.context.setBannerTitle('')
    this.context.setDocTitle('')
    window.removeEventListener('scroll', this.repositionSideNav)
    window.removeEventListener('resize', this.repositionSideNav)
  }

  renderArticleTop = () => {
    return (
      <div className={'article-top'}>
        <div className={'actions'}>
          <SvgThumbUp
            onClick={this.toggleLikeArticle}
            fill={'#dc004e'}
          />
          <span className={'like count'}>
              {this.state.likedCount}
            </span>
          <SvgComment
            fill={'#1976d2'}
            onClick={this.scrollToEditor}
          />
          <span className={'comment count'}>
              {this.state.commentCount}
            </span>
        </div>
        <span className={'date'}>{this.state.dateString}</span>
        <div className={'tags'}>
          {
            this.state.tags.map((item, index) => (
              <Link
                to={`/articles?tag=${item}`}
                key={index}
              >
                <Button
                  size={'small'}
                  className={'tag'}
                  key={index}
                >
                  {item}
                </Button>
              </Link>
            ))
          }
        </div>
      </div>
    )
  }

  deleteArticle = () => {
    const {id} = getSearchParams()
    if (isValidString(id)) {
      this.setState({
        articleId: id,
        isLoading: true
      })
      post(api.DELETE_ARTICLE, {
        id
      })
        .then(res => {
          this.setState({
            isLoading: false
          })
          this.props.history.push('/articles')
        })
        .catch(noop)
        .finally(() => {
          this.setState({
            isLoading: false
          })
        })
    }
  }

  toggleLikeArticle = () => {
    post(api.TOGGLE_LIKE_ARTICLE, {
      articleId: this.state.articleId
    })
      .then(res => {
        get(api.GET_ARTICLE_DETAIL, {
          id: this.state.articleId
        })
          .then(res => {
            this.setState({
              likedCount: res.article.likedCount,
            })
          })
          .catch(noop)
      })
      .catch(noop)
  }

  renderSideBar = () => {
    const isAdmin = this.context.hasLoggedIn
    return (
      <div className={c('article-sidebar', this.state.isLoading && 'disabled')}>
        <ul className={'nav-list'}>
          {
            this.state.headers.map((item, index) => (
              <li
                key={index}
                className={c(
                  'nav-item',
                  `level-${item.level}`
                )}
                onClick={this.getScrollToHeaderFunc(item)}
              >
                {item.label}
              </li>
            ))
          }
        </ul>
        <div className={c('admin-actions', !isAdmin && 'hidden')}>
            <Button
              className={'edit-article'}
              type={'primary'}
              onClick={() => this.props.history.push(`/editor?id=${this.state.articleId}`)}
            >
              编辑
            </Button>
            <Button
              className={'delete-article'}
              type={'secondary'}
              onClick={this.deleteArticle}
            >
              删除
            </Button>
        </div>
      </div>
    )
  }

  render() {
    return (
      <Loading
        isLoading={this.state.isLoading}
        emptyReason={null}
      >
        <div
          className={c(
            'rhaego-article',
            'content-pop-in',
            this.isResume && 'resume'
          )}
          ref={this.setRef}
        >
          {this.renderSideBar()}
          <div className={'article-content'} onClick={this.handleClickImage}>
            {this.renderArticleTop()}
            <div
              className={'rhaego-markdown'}
              dangerouslySetInnerHTML={{__html: this.state.parsedHTML}}
            />
          </div>
        </div>
        {
          !this.isResume && (
            <Comments
              articleId={this.state.articleId}
              getScrollToEditorFunc={this.setScrollToEditorFunc}
            />
          )
        }
      </Loading>
    )
  }
}

Article.contextType = MainContext

export default withRouter(Article)