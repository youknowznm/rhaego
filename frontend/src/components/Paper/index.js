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

import style from './paper.scss'

export default class Paper extends React.Component {

  static propTypes = {
    elevation: PropTypes.oneOf(['none', 'normal', 'high']),
    hasRadius: PropTypes.bool,
  }

  static defaultProps = {
    elevation: 'normal',
    hasRadius: false,
  }

  state = {

  }

  componentDidMount() {
  }

  render() {
    const className = c(
      'rhaego-paper',
      `elevation-${this.props.elevation}`,
      this.props.hasRadius && 'has-radius',
      this.props.className
    )
    return (
      <div
        className={className}
        // style={...this.props.style}
        {...this.props}
      >
        {this.props.children}
      </div>
    )
  }
}