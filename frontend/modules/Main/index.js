import React from 'react';
import c from 'classnames'
import style from './main.scss'

document.documentElement.scrollTop = 0

export default class Main extends React.Component {
  render() {
    return (
        <div
          className={c('rhaego-main-container', 'rhaego-responsive')}
        >
          {this.props.children}
        </div>
    )
  }
}