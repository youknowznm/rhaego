import React from 'react'
import PropTypes from 'prop-types'
import c from 'classnames'
import {
  decorateStyle,
  debounce,
  getStyleInt,
  animateToTop,
  formatToMaterialSpans,
  formatDate,
} from '../../utils'


import style from './button.scss'

// import {Card, Button, Avatar} from '@material-ui/core';
// import {CardHeader, CardContent, CardActions} from '@material-ui/core/Card';
// import IconButton from '@material-ui/core/IconButton'
// import { Typography } from '@material-ui/core';
// import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';


export default class RhaegoButton extends React.Component {

  static propTypes = {
    label: PropTypes.string,
    disabled: PropTypes.bool
  }

  static defaultProps = {
    label: 'Contained Buttons 实心按钮',
    // disabled: true
  }

  state = {
    rippleLeft: 0,
    rippleTop: 0,
    rippleRadius: 0,
  }

  buttonRef
  setButtonRef = ref => {
    this.buttonRef = ref
    const rippleRadius = Math.max(
      getStyleInt(ref, 'width'),
      getStyleInt(ref, 'height')
    )
    this.setState({
      rippleRadius
    })
  }

  rippleRef = null
  setRippleRef = ref => {
    this.rippleRef = ref
    this.rippleRef.addEventListener('animationend', () => {
      this.rippleRef.classList.remove('fade')
    })
  }

  startRipple = evt => {
    if (this.props.disabled === true) {
      return
    }
    this.buttonRef.classList.add('mousedown')
    if (!this.rippling) {
      this.rippling = true
      const nativeEvt = evt.nativeEvent
      const rippleLeft = nativeEvt.offsetX - this.state.rippleRadius
      const rippleTop = nativeEvt.offsetY - this.state.rippleRadius
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

  componentDidMount() {

  }

  render() {
    const rippleStyle = {
      left: this.state.rippleLeft,
      top: this.state.rippleTop,
      width: this.state.rippleRadius * 2.1,
      height: this.state.rippleRadius * 2.1,
    }
    const className = c(
      'rhaego-button',
      this.props.flat && 'flat',
      this.props.disabled && 'disabled',
      this.props.warn && 'warn',
      this.props.primary && 'primary',
    )
    return (
      <button className={className} style={style} ref={this.setButtonRef}
        onMouseDown={this.startRipple}
        onMouseUp={this.endRipple}
        onMouseOut={this.endRipple}
        {...this.props}
      >
        <span className={'content'}>
          {this.props.label}
        </span>
        <div className={'ripple'} ref={this.setRippleRef} style={rippleStyle} />
      </button>
    )
  }
}