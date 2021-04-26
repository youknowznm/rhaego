import React from 'react';
import c from 'classnames'
import Card from "~/components/Card";
import Loading from "~/components/Loading";
import {
  SvgComment,
  SvgHeart,
} from "~/assets/svg";
import {Link, ajax, get, getPalette, getFontTheme, getTagsFromText} from "~/utils";

import Button from "~/components/Button";
import {GET_ARTICLES} from "~api";

import style from './articles.scss'
export default class Articles extends React.Component {

  state = {
    articles: [],
    palette: [],
    isLoading: false,
    emptyReason: null,
  }

  componentDidMount() {
    this.setState({
      palette: getPalette(),
      isLoading: true
    })
    get(GET_ARTICLES)
      .then(res => {
        const articles = res.articles.map(item => {
          // 移除一些 md 的标记, 作为简介更加可读
          const contentWithoutMarkers = item.markdownContent.replace(
            /#|!?\[\S*]\([^)]*\)/g, ''
          )
          return {
            ...item,
            // title: '移除一些 md 的标记, 作为简介更加可读, 移除一些 md 的标记, 作为简介更加可读',
            tags: getTagsFromText(item.tagsText),
            contentWithoutMarkers,
          }
        })
        this.setState({
          articles,
          emptyReason: articles.length === 0 ? '暂无笔记' : null
        })
      })
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
      <Loading isLoading={isLoading} emptyReason={emptyReason}>
        <div className={'article-list'}>
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
                          // <Link
                          //   to={`/editor?id=${item.articleId}`}
                          //   key={index}
                          // >
                            <Button size={'small'} className={'tag'} key={index}>
                              {item}
                            </Button>
                          // </Link>
                        ))
                      }
                    </div>
                    <div className={'counts'}>
                      <SvgHeart lassName={'liked icon'} fill={fontTheme} />
                      <span className={'liked count'}>3</span>
                      <SvgComment lassName={'comment icon'} fill={fontTheme} />
                      <span className={'comment count'}>7</span>
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