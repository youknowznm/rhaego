import React from 'react';
import c from 'classnames'
import Card from "~/components/Card";
import {
  SvgComment,
  svgComment,
  SvgHeart,
  svgHeart
} from "~/assets/svg";

import {ajax, get} from "~/utils";

import style from './articles.scss'
import Button from "~/components/Button";
import {GET_ARTICLES} from "~api";

let data = [
  {
    id: 'afd',
    title: 'No Such Thing as Offline No Such Thing as Offline No Such Thing as Offline',
    // title: 'No Such Thing as Offline No Such Thing as Offline',
    content: '这些调色板最初由 Material Design 于 2014 年创建，由一些旨在和谐搭配的颜色组成，您可以用它们来开发品牌调色板。要生成您专属的颜色协调的调色板，请使用调色板生成工具。这些调色板最初由 Material Design 于 2014 年创建，由一些旨在和谐搭配的颜色组成，您可以用它们来开发品牌调色板。要生成您专属的颜色协调的调色板，请使用调色板生成工具。这些调色板最初由 Material Design 于 2014 年创建，由一些旨在和谐搭配的颜色组成，您可以用它们来开发品牌调色板。要生成您专属的颜色协调的调色板，请使用调色板生成工具。',
    tags: ['React', '调色板', 'A'],
    liked: 3,
    comments: 32,
  },
]

for (let i = 0; i < 15; i++) {
  data.push(data[0])
}

export default class Articles extends React.Component {

  state = {
    articleList: [],
    markdownContent: '',
    headers: []
  }

  ref
  setRef = ref => {
    this.ref = ref
  }

  componentDidMount() {
    get(GET_ARTICLES).then(res => {
      const {articleList} = res.data
      this.setState({
        articleList,
      })
    })
  }

  renderList = () => {
    let palette = [
      'red',
      'pink',
      'purple',
      'indigo',
      'blue',
      'cyan',
      'teal',
      'green',
      'lime',
      'yellow',
      'amber',
      'orange',
      'brown',
      'grey',
      'bluegrey',
    ]
    let getFontTheme = (theme) => {
      return [
        'cyan',
        'green',
        'lime',
        'yellow',
        'amber',
        'orange',
        'grey',
      ].includes(theme) ? 'dark' : 'light'
    }
    palette.sort(() => Math.random() - .5);
    return (
      <div className={'article-list'}>
        {
          this.state.articleList.map((item, index) => {
            const theme = palette[index % palette.length]
            const fontTheme = getFontTheme(theme)
            return <Card
              className={'article-card'}
              key={index}
              theme={theme}
              fontTheme={fontTheme}
              title={item.title}
              content={item.content}
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