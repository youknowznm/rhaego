import React from 'react'
import PropTypes from 'prop-types'
import c from 'classnames'
import Button from '~/components/Button'
import {
  debounce,
  getStyleInt,
  animateToTop,
  formatToMaterialSpans,
  formatDate,
} from '../../utils'

import style from './card.scss'

export default class RhaegoCard extends React.Component {

  static propTypes = {
    // asyncStatus: PropTypes.string.isRequired,
    // asyncResultMessage: PropTypes.string.isRequired,
  }

  static defaultProps = {
  }

  state = {

  }

  componentDidMount() {
  }

  render() {
    return (
      <div
        className={c(`rhaego-card`, this.props.className)}
        style={style}
        data-card-theme={this.props.theme}
        data-card-font-theme={this.props.fontTheme}
      >
        <h1 className={'title'}>{formatToMaterialSpans(this.props.title)}</h1>
        <p className={'content'}>{this.props.content}</p>
        <div className={'tags'}>
          {
            this.props.tags.map((item, index) => (
              <Button className={'small tag'} key={index}>{item}</Button>
            ))
          }
        </div>
        {this.props.children}
      </div>
    )
  }
}