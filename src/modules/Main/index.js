import React from 'react';
import c from 'classnames'
import Header from "../../components/Header";
import Card from "../../components/Card";

import {compConfig} from '../../config'
const {classPrefix} = compConfig

const links = [
  {name: '文章'},
  {name: '作品'},
  {name: '留言'},
  {name: '关于'},
]

import style from './main.scss'

export default class Main extends React.Component {

  constructor() {
    super()
    this.setRandomColor()
  }

  setRandomColor = () => {
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
    palette.sort(() => Math.random() - .5);
    const randomIndex = Math.floor(Math.random() * palette.length);
    this.palette = palette
  }

  palette = []



  renderMain = () => {
    function mapColor(length) {

    }
    return (
      <div
        className={c(`${classPrefix}-main`, 'rhaego-responsive')}
        style={style}
      >
        {
          this.palette.map(c => {
            return <Card data-color={c}>{c}</Card>
          })
        }
      </div>
    )
  }

  render() {
    return (
      <>
        <Header
          links={links}
          siteName={'you know znm'}
        />
        {this.renderMain()}
      </>
    )
  }

}