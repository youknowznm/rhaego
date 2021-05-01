import React from 'react'
import PropTypes from 'prop-types'
import c from 'classnames'
import Button from '~/components/Button'
import {
  debounce,
  getStyleInt,
  animateToScrollHeight,
  formatToMaterialSpans,
  isValidString,
  formatDate,
  callIfCallable,
  hasClass,
} from '~utils'
import style from './card.scss'

export default class Card extends React.Component {

  static propTypes = {
    title: PropTypes.string,
    content: PropTypes.string,
    theme: PropTypes.string,
    fontTheme: PropTypes.string,
    className: PropTypes.string,
    link: PropTypes.string,
    linkTarget: PropTypes.oneOf(['_blank', '_self']),
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
    linkTarget: '_self',
  }

  goToLinkIfAny = evt => {
    if (hasClass(evt.target, 'rhaego-card')) {
      const {
        link,
        linkTarget,
        onClick,
      } = this.props
      const isAnchor = isValidString(link)
      callIfCallable(onClick)
      if (isAnchor) {
        if (linkTarget === '_blank') {
          window.open(link)
        } else {
          location.href = link
        }
      }
    }
  }

  render() {
    const {
      className,
      theme,
      title,
      fontTheme,
      content,
      children,
      link,
      linkTarget,
      // onClick,
      ...otherProps
    } = this.props
    return (
      <div
        className={c('rhaego-card', className)}
        data-card-theme={theme}
        data-card-font-theme={fontTheme}
        // onClick={this.goToLinkIfAny}
        {...otherProps}
      >
        <h1 className={'title'}>{formatToMaterialSpans(title)}</h1>
        <p className={'content'}>{content}</p>
        {children}
      </div>
    )
  }
}