import React from 'react'
import PropTypes from 'prop-types'
import c from 'classnames'
import {
  isValidString,
} from '~utils'

import style from './loading.scss'
export default class Loading extends React.Component {

  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    // loading 结束, emptyReason 为 null, 表示成功
    emptyReason: PropTypes.string || null,
    className: PropTypes.string,
    delayBeforeShowLoading: PropTypes.number,
  }

  static defaultProps = {
    isLoading: true,
    emptyReason: '无内容',
    className: '',
    delayBeforeShowLoading: 400,
  }

  state = {
    delayBeforeShowLoadingPassed: false,
  }

  componentDidMount() {
    this.delayShowLoading()
  }

  delayShowLoading = () => {
    setTimeout(() => {
      this.setState({
        delayBeforeShowLoadingPassed: true
      })
    }, this.props.delayBeforeShowLoading)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      !prevProps.isLoading
      && this.props.isLoading
      && this.state.delayBeforeShowLoadingPassed
    ) {
      this.setState({
        delayBeforeShowLoadingPassed: false
      })
      this.delayShowLoading()
    }
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
            this.state.delayBeforeShowLoadingPassed && 'delay-has-passed',
            className,
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