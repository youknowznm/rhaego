import React from 'react';
import c from 'classnames'
import Card from "~/components/Card";
import Loading from "~/components/Loading";
import {
  SvgComment,
  SvgHeart,
} from "~/assets/svg";

import {ajax, get, getPalette, getFontTheme, getTagsFromText} from "~/utils";

import style from './articles.scss'
import Button from "~/components/Button";
import {GET_ARTICLES} from "~api";

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
          return {
            ...item,
            tags: getTagsFromText(item.tagsText)
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
              return <Card
                className={'article-card'}
                key={index}
                theme={theme}
                fontTheme={fontTheme}
                title={item.title}
                content={item.content}
                link={`/article?id=${item.articleId}`}
              >
                <div className={'tags'}>
                  {
                    item.tags.map((item, index) => (
                      <Button size={'small'} className={'tag'} key={index}>
                        {item}
                      </Button>
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
            })
          }
        </div>
      </Loading>
    )
  }

  renderActions = () => {
    return (
      <div className={'actions-row'}>
        <Button
          className={'new-article'}
          type={'primary'}
          link={'/editor'}
        >
          新笔记
        </Button>
      </div>
    )
  }

  render() {
    return (
      <div className={'rhaego-articles'}>
        {this.renderList()}
        {this.renderActions()}
      </div>
    )
  }
}