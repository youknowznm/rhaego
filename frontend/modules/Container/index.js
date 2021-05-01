import React from 'react'
import c from 'classnames'
import style from './container.scss'

export default class Container extends React.Component {
  render() {
    return (
        <div
          className={c('rhaego-container', 'rhaego-responsive')}
        >
          {this.props.children}
        </div>
    )
  }
}