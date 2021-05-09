import React from 'react'
import c from 'classnames'
import Card from '~/components/Card'
import Loading from '~/components/Loading'
import {
  SvgComment,
  SvgThumbUp,
} from '~/assets/svg'
import {
  Link,
  ajax,
  get,
  getPalette,
  getFontTheme,
  getTagsFromText,
  RESUME_ID,
  hasClass,
  getSearchParams,
  parseMarkdown, isValidString, noop
} from '~utils'
import Button from '~/components/Button'
import api from '~api'
import {withRouter} from 'react-router-dom'
import {toast} from '~/components/Toast'
import style from './articles.scss'
import {MainContext} from '~/modules/Context'

class Articles extends React.Component {

  state = {
    articles: [],
    palette: [],
    tag: '',
    isLoading: false,
    emptyReason: null,
  }

  componentDidMount() {
    this.setState({
      palette: getPalette(),
    })
    this.getArticles()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.location.search !== this.props.location.search) {
      this.getArticles()
    }
  }

  getArticles = () => {
    const {tag = ''} = getSearchParams()
    this.setState({
      tag,
      isLoading: true
    })
    get(api.GET_ARTICLES, isValidString(tag) ? {tag} : {})
      .then(res => {
        const articles = res.articles
          .map(item => {
            return {
              ...item,
              tags: getTagsFromText(item.tagsText),
              // 移除一些 md 的标记, 作为简介更加可读
              // TODO 分组声明
              contentWithoutMarkers: item.markdownContent
                .replace(
                  // * | # 空格 标题 | - | ` | 图片
                  /\*|#+\s\S+|-|`|!\[\S*]\([^)]*\)/g, ''
                )
                .replace(
                  // 链接
                  /\[(\S+)]\([^)]*\)/,
                  (all, c1) => c1
                ),
            }
          })
          .sort((prev, curr) => {
            // 先按日期
            if (new Date(prev.dateString) > new Date(curr.dateString)) {
              return -1
            }
          })
          .sort((prev, curr) => {
            // 再按点赞量
            if (prev.likedCount > curr.likedCount) {
              return -1
            }
          })
        this.setState({
          articles,
          emptyReason: articles.length === 0 ? '暂无笔记' : null
        })
      })
      .catch(noop)
      .finally(() => {
        this.setState({
          isLoading: false
        })
      })
  }

  renderList = () => {
    const {
      palette,
      isLoading,
      emptyReason,
    } = this.state
    return (
      <Loading
        isLoading={isLoading}
        emptyReason={emptyReason}
      >
        <div className={'article-list content-pop-in'}>
          {
            this.state.articles.map((item, index) => {
              const theme = palette[index % palette.length]
              const fontTheme = getFontTheme(theme)
              return (
                <Link
                  to={`/article?id=${item.articleId}`}
                  key={index}
                >
                  <Card
                    className={'article-card'}
                    theme={theme}
                    fontTheme={fontTheme}
                    title={item.title}
                    content={item.contentWithoutMarkers}
                  >
                    <div className={'tags'}>
                      {
                        item.tags.map((item, index) => (
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
                    <div className={'counts'}>
                      <SvgThumbUp className={'liked icon'} fill={fontTheme} />
                      <span className={'liked count'}>
                        {item.likedCount}
                      </span>
                      <SvgComment className={'comment icon'} fill={fontTheme} />
                      <span className={'comment count'}>
                        {item.commentCount}
                      </span>
                    </div>
                  </Card>
                </Link>
              )
            })
          }
        </div>
      </Loading>
    )
  }

  render() {
    return (
      <div className={'rhaego-articles'}>
        {this.renderList()}
      </div>
    )
  }
}

Articles.contextType = MainContext

export default withRouter(Articles)