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
} from '~/utils'

import style from './loading.scss'

export default class Loading extends React.Component {

  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    // loading 结束, emptyReason 为 null, 表示成功
    emptyReason: PropTypes.string || null,
    className: PropTypes.string,
  }

  static defaultProps = {
    isLoading: true,
    emptyReason: '无内容',
    className: '',
  }

  renderLoading = () => {
    return (
      <div
        className={c(
          'rhaego-loading',
          this.props.className
        )}
      >
        {
          this.props.isLoading ? (
            <div className={'loading-icon'} />
          ) : (
            <p className={'empty-info'}>
              {this.props.emptyReason}
            </p>
          )
        }
      </div>
    )
  }

  render() {
    const {
      className,
      isLoading,
      emptyReason,
      children,
    } = this.props
    if (isLoading) {
      return (
        <div
          className={c(
            'rhaego-loading',
            className
          )}
        >
          <span className={'loading-area'} />
        </div>
      )
    }
    if (isValidString(emptyReason)) {
      return (
        <div
          className={c(
            'rhaego-loading',
            className
          )}
        >
          <p className={'empty-reason'}>
            {emptyReason}
          </p>
        </div>
      )
    }
    return children
  }
}