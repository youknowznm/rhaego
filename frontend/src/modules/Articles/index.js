import React from 'react';
import c from 'classnames'
import Card from "~/components/Card";
import {
  svgHeartDark,
  svgCommentLight,
  svgCommentDark,
  svgHeartLight
} from "~/assets/svg";

import {ajax, get} from "~/utils";

import style from './articles.scss'

let data = [
  {
    id: 'afd',
    title: 'No Such Thing as Offline',
    // title: 'No Such Thing as Offline No Such Thing as Offline',
    content: '这些调色板最初由 Material Design 于 2014 年创建，由一些旨在和谐搭配的颜色组成，您可以用它们来开发品牌调色板。要生成您专属的颜色协调的调色板，请使用调色板生成工具。这些调色板最初由 Material Design 于 2014 年创建，由一些旨在和谐搭配的颜色组成，您可以用它们来开发品牌调色板。要生成您专属的颜色协调的调色板，请使用调色板生成工具。这些调色板最初由 Material Design 于 2014 年创建，由一些旨在和谐搭配的颜色组成，您可以用它们来开发品牌调色板。要生成您专属的颜色协调的调色板，请使用调色板生成工具。',
    tags: ['React', '调色板', 'A'],
    liked: 3,
    comments: 32,
  },
]

for (let i = 0; i < 16; i++) {
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
    this.setState({
      articleList: data
    })
    this.setRef()
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
      <div ref={this.setRef} >
        {
          this.state.articleList.map((item, index) => {
            const theme = palette[index % palette.length]
            const fontTheme = getFontTheme(theme)
            return <Card
              className={'article-card'}
              key={index}
              theme={theme}
              fontTheme={fontTheme}
              {...item}
            >
              <div className={'actions'}>
                {fontTheme === 'dark' ? svgHeartDark : svgHeartLight}
                <span className={'like count'}>3</span>
                {fontTheme === 'dark' ? svgCommentDark : svgCommentLight}
                <span className={'like count'}>7</span>
              </div>
            </Card>
          })
        }
      </div>
    )
  }

  render() {
    return (
      <div className={'rhaego-articles'} style={style} ref={this.setRef}>
        {this.renderList()}
      </div>
    )
  }
}