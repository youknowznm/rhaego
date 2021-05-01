import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import c from 'classnames'
import {callIfCallable, noop} from '~utils'

import style from './toast.scss'
export default class Toast extends React.Component {

  static propTypes = {
    content: PropTypes.string.isRequired,
    duration: PropTypes.number,
    onToastDisappear: PropTypes.func,
  }

  static defaultProps = {
    content: '空内容的 toast',
    duration: 4000,
    onToastDisappear: noop,
  }

  ref = null
  setRef = ref => {
    this.ref = ref
  }

  state = {
    visible: false
  }

  componentDidMount() {
    // 由于命令式的挂载 dom, 用 setTimeout 控制下
    setTimeout(() => {
      this.setState({
        visible: true
      })
    }, 10)
    setTimeout(() => {
      this.setState({
        visible: false
      })
    }, this.props.duration)
  }

  handleToastDisappear = evt => {
    if (!this.state.visible) {
      callIfCallable(this.props.onToastDisappear)
    }
  }

  render() {
    const {
      className,
      duration,
      onToastDisappear,
      ...otherProps
    } = this.props
    return (
      <div
        className={c(
          'rhaego-toast',
          this.state.visible && 'visible',
          className
        )}
        ref={this.setRef}
        onTransitionEnd={this.handleToastDisappear}
        {...otherProps}
      >
        <p className={'content'}>
          {this.props.content}
        </p>
      </div>
    )
  }
}

export const toast = (content, duration) => {
  const toastDOM = document.createElement('div')
  document.body.appendChild(toastDOM)
  const removeDOM = () => {
    if (toastDOM.parentNode) {
      toastDOM.parentNode.removeChild(toastDOM)
    }
  }
  ReactDOM.render((
    <Toast
      content={content}
      duration={duration}
      onToastDisappear={removeDOM}
    />
  ), toastDOM)
}