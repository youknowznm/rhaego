import React from 'react';
import c from 'classnames'
import Header from "~/modules/Header";
import Footer from "~/modules/Footer";
import Card from "~/components/Card";
import Button from "~/components/Button";
import Article from "~/modules/Article";

const links = [
  {name: '笔记'},
  {name: '代码'},
  {name: '关于我'},
  {name: 'login as god'},
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

  renderDocs = () => {
    return <Article />
  }

  renderMain = () => {
    return (
      <Article/>
    )
  }

  renderButton = () => {
    return (
      <div
        className={c(`rhaego-main`, 'rhaego-responsive')}
        style={style}
      >
        {
          this.palette.map(c => {
            return <Button />
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
        <div
          className={c(`rhaego-main`, 'rhaego-responsive')}
          style={style}
        >
          {this.renderMain()}
        </div>
        {/*{this.renderDocs()}*/}
        {/*{this.renderButton()}*/}
        <Footer />
      </>
    )
  }

}