import React from 'react'
import PropTypes from 'prop-types'
import c from 'classnames'
import {
  debounce,
  getStyleInt,
  animateToScrollHeight,
  formatToMaterialSpans,
  formatDate, callIfCallable, isValidString, removeClass, addClass, noop,
} from '~utils'


import style from './button.scss'

export default class Button extends React.Component {

  static propTypes = {
    label: PropTypes.string,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    isFlat: PropTypes.bool,
    type: PropTypes.oneOf(['normal', 'primary', 'secondary']),
    size: PropTypes.oneOf(['normal', 'small']),
    link: PropTypes.string,
    linkTarget: PropTypes.string, // 也可以用 oneOf, 这里不更深控制
    onClick: PropTypes.func,
  }

  static defaultProps = {
    label: 'Button',
    className: '',
    disabled: false,
    type: 'normal',
    isFlat: false,
    size: 'normal',
    link: '',
    linkTarget: '_self',
    onClick: noop,
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
        removeClass(this.rippleRef,'fade')
      })
    }
  }

  startRipple = evt => {
    if (this.props.disabled === true) {
      return
    }
    addClass(this.buttonRef, 'mousedown')
    if (!this.rippling) {
      this.rippling = true
      const nativeEvt = evt.nativeEvent
      const rippleLeft = nativeEvt.offsetX - this.rippleRadius
      const rippleTop = nativeEvt.offsetY - this.rippleRadius
      this.setState({
        rippleLeft,
        rippleTop,
      })
      addClass(this.rippleRef, 'appear')
    }
  }

  endRipple = evt => {
    removeClass(this.buttonRef, 'mousedown', 'mouseup')
    if (this.rippling) {
      removeClass(this.rippleRef, 'appear')
      addClass(this.rippleRef, 'fade')
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
    const isAnchor = isValidString(this.props.link)
    // idea: 动态控制 dom node type, 不用 createElement
    // idea: https://stackoverflow.com/questions/30466129/window-open-blocked-by-chrome-with-change-event/35752647
    // 非点击事件`直接目标`的事件, 所触发的 window.open 会被认为是恶意的, 被拦截
    const DOMTag = isAnchor ? 'a' : 'button'
    // 更健壮地, 在自身事件触发时调用父组件的事件, 这里暂不处理
    return (
      <DOMTag
        className={className}
        style={style}
        ref={this.setButtonRef}
        onMouseDown={this.startRipple}
        onMouseUp={this.endRipple}
        onMouseOut={this.endRipple}
        onClick={this.props.onClick}
        href={isAnchor ? this.props.link : null}
        target={isAnchor ? this.props.linkTarget : null}
      >
        <span className={'button-content'}>
          {this.props.children}
        </span>
        <div className={'ripple'} ref={this.setRippleRef} style={rippleStyle} />
      </DOMTag>
    )
  }
}