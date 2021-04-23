import React from 'react'
import PropTypes from 'prop-types'
import c from 'classnames'
import Button from '~/components/Button'
import {
  debounce,
  getStyleInt,
  animateToScrollHeight,
  formatToMaterialSpans,
  formatDate, callIfCallable,
} from '../../utils'

import style from './card.scss'

export default class Card extends React.Component {

  static propTypes = {
    title: PropTypes.string,
    content: PropTypes.string,
    theme: PropTypes.string,
    fontTheme: PropTypes.string,
    className: PropTypes.string,
    link: PropTypes.string,
    targetIsBlank: PropTypes.bool,
    tags: PropTypes.array,
  }

  static defaultProps = {
    theme: 'blue',
    fontTheme: 'light',
    tags: [],
    title: '',
    content: '',
    className: '',
    link: '',
    targetIsBlank: false,
  }

  toLinkIfAny = () => {
    const {
      link,
      targetIsBlank,
      onClick,
    } = this.props
    callIfCallable(onClick)
    if (link !== '') {
      if (targetIsBlank) {
        window.open(link)
      } else {
        location.href = link
      }
    }
  }

  render() {
    const {
      className,
      theme,
      fontTheme,
      link,
      title,
      targetIsBlank,
      content,
      children,
      ...otherProps
    } = this.props
    return (
      <div
        className={c('rhaego-card', className)}
        data-card-theme={theme}
        data-card-font-theme={fontTheme}
        onClick={this.toLinkIfAny}
        {...otherProps}
      >
        <h1 className={'title'}>{formatToMaterialSpans(title)}</h1>
        <p className={'content'}>{content}</p>
        {children}
      </div>
    )
  }
}