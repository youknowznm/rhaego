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

import style from './text-field.scss'

export default class RhaegoTextField extends React.Component {

  static propTypes = {
    type: PropTypes.oneOf(['text', 'password', 'number']),
    label: PropTypes.string.isRequired,
    value: PropTypes.string,
    maxLength: PropTypes.number,
    widths: PropTypes.number,
    validatorRegExp: PropTypes.instanceOf(RegExp),
    disabled: PropTypes.bool,
    errorMsg: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
  }

  static defaultProps = {
    type: 'text',
    label: 'Text TextField',
    value: '',
    width: 180,
    maxLength: 20,
    validatorRegExp: /^.*$/,
    disabled: false,
    errorMsg: '请检查输入',
    onChange: () => {},
    placeholder: '',
  }

  state = {
    focused: false,
    hasFocusedOnce: false,
  }

  get notEmpty() {
    return this.props.value !== ''
  }

  get currentCharCount() {
    return this.props.value.length
  }

  componentDidMount() {
  }

  ref
  setRef = ref => {
    this.ref = ref
    this.ref.addEventListener('focus', () => {
      this.setState({
        focused: true,
        hasFocusedOnce: true,
      })
    })
  this.ref.addEventListener('blur', () => {
      this.setState({
        focused: false
      })
    })
  }

  render() {
    const isInvalid = this.state.hasFocusedOnce
      && !this.props.validatorRegExp.test(this.props.value)
    const className = c(
      `rhaego-text-field`,
      this.props.className,
      this.state.focused && 'focused',
      this.notEmpty && 'not-empty',
      isInvalid && 'invalid',
    )
    const style = {
      ...style,
      width: this.props.width
    }
    const placeholder = this.state.focused ? this.props.placeholder : ''
    return (
      <div className={className} style={style}>
        <div className="input-content">
          <label>{this.props.label}</label>
          <input
            ref={this.setRef}
            type={this.props.type}
            maxLength={this.props.maxLength}
            placeholder={placeholder}
            value={this.props.value}
            onChange={this.props.onChange}
            disabled={this.props.disabled}
            spellCheck="false"
          />
          <p className="error">{this.props.errorMsg}</p>
          <p className="char-counter">
            <span className="current">{this.currentCharCount}</span>
            <span className='separator'>/</span>
            <span className="maximum">{this.props.maxLength}</span>
          </p>
        </div>
      </div>
    )
  }
}