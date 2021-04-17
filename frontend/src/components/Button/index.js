import React from 'react'
import PropTypes from 'prop-types'
import c from 'classnames'
import {
  debounce,
  getStyleInt,
  animateToTop,
  formatToMaterialSpans,
  formatDate,
} from '../../utils'


import style from './button.scss'

export default class Button extends React.Component {

  static propTypes = {
    label: PropTypes.string,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    isFlat: PropTypes.bool,
    type: PropTypes.oneOf(['normal', 'primary', 'secondary']),
    size: PropTypes.oneOf(['normal', 'small']),
  }

  static defaultProps = {
    label: 'Button',
    className: '',
    disabled: false,
    type: 'normal',
    isFlat: false,
    size: 'normal',
  }

  state = {
    rippleLeft: 0,
    rippleTop: 0,
  }

  rippleRadius = 0

  buttonRef = null
  setButtonRef = ref => {
    if (this.buttonRef === null) {
      this.buttonRef = ref
      this.setRippleRadius()
    }
  }

  rippleRef = null
  setRippleRef = ref => {
    if (this.rippleRef === null) {
      this.rippleRef = ref
      this.rippleRef.addEventListener('animationend', () => {
        this.rippleRef.classList.remove('fade')
      })
    }
  }

  startRipple = evt => {
    if (this.props.disabled === true) {
      return
    }
    this.buttonRef.classList.add('mousedown')
    if (!this.rippling) {
      this.rippling = true
      const nativeEvt = evt.nativeEvent
      const rippleLeft = nativeEvt.offsetX - this.rippleRadius
      const rippleTop = nativeEvt.offsetY - this.rippleRadius
      this.setState({
        rippleLeft,
        rippleTop,
      })
      this.rippleRef.classList.add('appear')
    }
  }

  endRipple = evt => {
    this.buttonRef.classList.remove('mousedown')
    this.buttonRef.classList.remove('mouseup')
    if (this.rippling) {
      this.rippleRef.classList.remove('appear')
      this.rippleRef.classList.add('fade')
      this.rippling = false
    }
  }

  setRippleRadius = () => {
    this.rippleRadius = Math.max(
      getStyleInt(this.buttonRef, 'width'),
      getStyleInt(this.buttonRef, 'height'),
    )
  }

  componentDidUpdate() {
    this.setRippleRadius()
  }

  render() {
    const rippleSize = isNaN(this.rippleRadius) ? 0 : this.rippleRadius * 2
    const rippleStyle = {
      left: this.state.rippleLeft,
      top: this.state.rippleTop,
      width: rippleSize,
      height: rippleSize,
    }
    const className = c(
      'rhaego-button',
      this.props.isFlat && 'flat',
      this.props.disabled && 'disabled',
      `type-${this.props.type}`,
      `size-${this.props.size}`,
      this.props.className
    )
    return (
      <button
        className={className}
        style={style}
        ref={this.setButtonRef}
        onMouseDown={this.startRipple}
        onMouseUp={this.endRipple}
        onMouseOut={this.endRipple}
        onClick={this.props.onClick}
      >
        <span className={'button-content'}>
          {this.props.children}
        </span>
        <div className={'ripple'} ref={this.setRippleRef} style={rippleStyle} />
      </button>
    )
  }
}