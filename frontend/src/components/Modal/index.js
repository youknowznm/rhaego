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
  getScrollBarWidth,
} from '../../utils'

import style from './modal.scss'
import * as ReactDOM from "react-dom";

export default class Modal extends React.Component {

  static propTypes = {
    title: PropTypes.string,
    content: PropTypes.string,
    confirmButtonText: PropTypes.string,
    cancelButtonText: PropTypes.string,
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
    isOpen: PropTypes.bool,
    confirmOnly: PropTypes.bool,
  }

  static defaultProps = {
    title: '模态框',
    content: '模态框内容模',
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    onConfirm: noop,
    onCancel: noop,
    isOpen: false,
    confirmOnly: false,
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
    if (Array.from(evt.target.classList).includes('rhaego-modal')) {
      this.props.onCancel()
    }
  }
  
  componentDidUpdate(prevProps) {
    const body = document.body
    const rhaegoHeaderContent = body.querySelector('.rhaego-header .header-content')
    const paddingRightInPx = `${getScrollBarWidth()}px`
    if (prevProps.isOpen === false && this.props.isOpen === true) {
      if (this.modalRef) {
        findDOMNode(this.modalRef).querySelector('.modal-confirm').focus()
      }

      body.classList.add('has-visible-modal')
      body.style.paddingRight = paddingRightInPx
      body.style.overflow = 'hidden'
      if (rhaegoHeaderContent) {
        rhaegoHeaderContent.style.paddingRight = paddingRightInPx
      }
    }
    if (prevProps.isOpen === true && this.props.isOpen === false) {
      body.classList.remove('has-visible-modal')
      body.style.paddingRight = '0px'
      body.style.overflow = 'auto'
      if (rhaegoHeaderContent) {
        rhaegoHeaderContent.style.paddingRight = '0px'
      }
    }
  }

  modalRef = null
  setModalRef = ref => {
    this.modalRef = ref
  }

  render() {
    const {
      title,
      content,
      confirmButtonText,
      cancelButtonText,
      confirmOnly,
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
        ref={this.setModalRef}
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
            >
              {confirmButtonText}
            </Button>
            {
              !confirmOnly && <Button
                className="modal-cancel"
                onClick={this.props.onCancel}
                size={'small'}
              >
                {cancelButtonText}
              </Button>
            }
          </div>
        </div>
      </div>,
      document.body
    )
  }
}