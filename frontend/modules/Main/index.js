import React from 'react';
import c from 'classnames'

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