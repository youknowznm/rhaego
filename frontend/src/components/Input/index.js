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

import style from './input.scss'

export default class RhaegoInput extends React.Component {

  static propTypes = {
    type: PropTypes.oneOf(['text', 'password', 'number']),
    label: PropTypes.string,
    value: PropTypes.string,
    maxLength: PropTypes.number,
    widths: PropTypes.number,
    validatorRegExp: PropTypes.object,
    disabled: PropTypes.bool,
    errorMsg: PropTypes.string,
    onChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    type: 'text',
    label: 'Text Input',
    value: '',
    width: 120,
    maxLength: 20,
    validatorRegExp: /^\d+$/,
    disabled: false,
    errorMsg: '请检查输入',
    onChange: () => {}
  }

  state = {
    focused: false,
    hasFocusedOnce: false,
  }

  get notEmpty() {
    return this.props.value !== ''
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
    const invalid = this.state.hasFocusedOnce
      && !this.props.validatorRegExp.test(this.props.value)
    const className = c(
      `rhaego-input`,
      this.props.className,
      this.state.focused && 'focused',
      this.notEmpty && 'not-empty',
      invalid && 'invalid',
    )
    return (
      <div
        className={className}
        style={{
          ...style,
          width: this.props.width
        }}
      >
        <div className="input-content">
          <label className="placeholder">{this.props.label}</label>
          <input
            ref={this.setRef}
            type={this.props.type}
            maxLength={this.props.maxLength}
            value={this.props.value}
            onChange={this.props.onChange}
            disabled={this.props.disabled}
            spellCheck="false"
          />
          <p className="error">{this.props.errorMsg}</p>
          <p className="char-counter">
            <span className="current" />
            <span className="maximum" />
          </p>
        </div>
      </div>
    )
  }
}