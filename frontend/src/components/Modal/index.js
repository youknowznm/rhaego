import React from 'react'
import PropTypes from 'prop-types'
import c from 'classnames'
import Button from '~/components/Button'
import {findDOMNode} from 'react-dom'
import {
  debounce,
  getStyleInt,
  animateToTop,
  formatToMaterialSpans,
  formatDate,
  noop,
} from '../../utils'

import style from './modal.scss'
import * as ReactDOM from "react-dom";

export default class RhaegoModal extends React.Component {

  static propTypes = {
    title: PropTypes.string,
    content: PropTypes.string,
    confirmButtonText: PropTypes.string,
    cancelButtonText: PropTypes.string,
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
    isOpen: PropTypes.bool,
  }

  static defaultProps = {
    title: '模态框',
    content: '模态框内容模',
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    onConfirm: noop,
    onCancel: noop,
    isOpen: false,
  }

  state = {

  }

  cancelListener = (evt) => {
    if (evt.keyCode === 27) {
      this.props.onCancel()
    }
  }

  componentDidMount() {
    window.addEventListener('keyup', this.cancelListener)
  }

  componentWillUmount() {
    window.removeEventListener('keyup', this.cancelListener)
  }

  onClickCover = evt => {
    console.log(evt.target)
    if (Array.from(evt.target.classList).includes('rhaego-modal')) {
      this.props.onCancel()
    }
  }
  
  componentDidUpdate(prevProps) {
    if (prevProps.isOpen === false && this.props.isOpen === true) {
      if (this.confirmButtonRef) {
        findDOMNode(this.confirmButtonRef).focus()
      }
    }
  }

  confirmButtonRef = null
  setConfirmButtonRef = ref => {
    this.confirmButtonRef = ref
  }

  render() {
    const {
      title,
      content,
      confirmButtonText,
      cancelButtonText,
    } = this.props

    const className = c(
      'rhaego-modal',
      this.props.isOpen && 'visible',
      this.props.className
    )

    return ReactDOM.createPortal(
      <div
        className={className}
        style={style}
        onClick={this.onClickCover}
      >
        <div className={'modal-innner'}>
            <h1 className="modal-title">{title}</h1>
            <p className="modal-content">{content}</p>
            <div className="modal-action-buttons">
              <Button
                className="modal-confirm"
                onClick={this.props.onConfirm}
                type={'primary'}
                size={'small'}
                ref={this.setConfirmButtonRef}
              >
                {confirmButtonText}
              </Button>
              <Button
                className="modal-cancel"
                onClick={this.props.onCancel}
                size={'small'}
              >
                {cancelButtonText}
              </Button>
            </div>
        </div>
      </div>,
      document.body
    )
  }
}