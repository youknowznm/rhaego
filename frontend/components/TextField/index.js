import React from 'react'
import PropTypes from 'prop-types'
import c from 'classnames'
import Button from '~/components/Button'
import {
  getStyleInt,
  animateToScrollHeight,
  formatToMaterialSpans,
  noop, isValidString,
} from '~utils'
import style from './text-field.scss'

export default class TextField extends React.Component {

  static propTypes = {
    type: PropTypes.oneOf(['text', 'password', 'number']),
    label: PropTypes.string.isRequired,
    value: PropTypes.string,
    defaultValue: PropTypes.string,
    maxLength: PropTypes.number,
    widths: PropTypes.number,
    validatorRegExp: PropTypes.instanceOf(RegExp),
    disabled: PropTypes.bool,
    hasValidated: PropTypes.bool,
    hint: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
  }

  static defaultProps = {
    type: 'text',
    label: 'Text TextField',
    value: '',
    defaultValue: '',
    width: 180,
    maxLength: 20,
    validatorRegExp: /^.*$/,
    hasValidated: false,
    disabled: false,
    hint: '',
    onChange: noop,
    placeholder: '',
  }

  state = {
    focused: false,
  }

  isUncontrolled = false

  get notEmpty() {
    return this.props.value !== ''
  }

  get currentCharCount() {
    return this.props.value.length
  }

  constructor(props) {
    super(props)
    if (isValidString(this.props.defaultValue)) {
      this.isUncontrolled = true
    }
  }

  ref = null
  setRef = ref => {
    if (this.ref === null) {
      this.ref = ref
      this.ref.addEventListener('focus', () => {
        this.setState({
          focused: true,
        })
      })
      this.ref.addEventListener('blur', () => {
        this.setState({
          focused: false,
        })
      })
    }
  }

  render() {
    const isInvalid = this.props.hasValidated
      && !this.props.validatorRegExp.test(this.props.value)
    const className = c(
      'rhaego-text-field',
      this.props.className,
      this.state.focused && 'focused',
      this.notEmpty && 'not-empty',
      isInvalid && 'invalid',
    )
    const style = {
      width: this.props.width
    }
    const placeholder = this.state.focused ? this.props.placeholder : ''
    const valueProps = {}
    if (this.isUncontrolled) {
      valueProps.defaultValue = this.props.defaultValue
    } else {
      valueProps.value = this.props.value
    }
    return (
      <div className={className}>
        <div
          className={c(
            'input-content',
            this.props.disabled && 'disabled'
          )}
          style={style}
        >
          <label>{this.props.label}</label>
          <input
            ref={this.setRef}
            type={this.props.type}
            maxLength={this.props.maxLength}
            placeholder={placeholder}
            onChange={this.props.onChange}
            disabled={this.props.disabled}
            spellCheck='false'
            {...valueProps}
          />
          <p className='hint'>{this.props.hint}</p>
          <p className='char-counter'>
            <span className='current'>{this.currentCharCount}</span>
            <span className='separator'>/</span>
            <span className='maximum'>{this.props.maxLength}</span>
          </p>
        </div>
      </div>
    )
  }
}