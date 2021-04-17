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
  noop,
} from '../../utils'

import style from './modal.scss'
import * as ReactDOM from "react-dom";

export default class RhaegoModal extends React.Component {

  static propTypes = {
    // title:
  }

  static defaultProps = {
    title: '模态框',
    content: '模态框内容模',
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    onConfirm: noop,
    onCancel: noop,
    visible: false,
  }

  state = {

  }

  onConfirm = () => {
    this.setState({
      visible: false
    })
    this.props.onConfirm()
  }

  onCancel = () => {
    this.setState({
      visible: false
    })
    this.props.onCancel()
  }

  componentDidMount() {
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
      this.props.visible && 'visible',
      this.props.className
    )

    return ReactDOM.createPortal(
      <div
        className={className}
        style={style}
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