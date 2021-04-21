import React from 'react';
import c from 'classnames'
import marked from 'marked'
import hljs from "highlight.js";

import {ajax, animateToScrollHeight, formatToMaterialSpans, get, getStyleInt, noop} from "~/utils";

import {throttle, debounce} from 'lodash'

import style from './editor.scss'
import TextField from "~/components/TextField";
import Button from "~/components/Button";
import toReadableDateString from "~/utils/toReadableDateString";



export default class Editor extends React.Component {

  state = {
    markdownContent: '',
    headers: [],
    tags: [112,315],
    scrollIng: false,
  }

  docRef = null
  setRef = ref => {
    if (this.docRef === null) {
      this.docRef = ref
    }
  }

  setParsedHTML = () => {
    const renderer = new marked.Renderer()
    renderer.link = (href, title, text) => {
      return `<a target="_blank" href="${href}" title="${title}">${text}</a>`;
    }
    marked.setOptions({
      renderer,
      breaks: true,
      highlight: code => {
        return hljs.highlightAuto(code).value
      }
    })
    return {
      __html: marked(this.state.markdownContent)
    }
  }

  componentDidMount() {
    get('http://localhost:3000')
      .then(res => {
        this.setState({
          markdownContent: res.text
        })
      })
    document.body.classList.add('full-vh-content')
  }

  componentDidUpdate() {

  }

  navRef = null
  setNavRef = ref => {
    if (this.navRef === null) {
      this.navRef = ref
    }
  }

  componentWillUnmount() {
    document.body.classList.remove('full-vh-content')
  }

  renderComments = () => {
    return <div className={'comment edit'}>
      <p className={'title'}>欢迎留下您的评论。</p>
      <TextField
        className={'comment-author'}
        label={'称呼'}
        value={this.state.commentAuthor}
        width={240}
        maxLength={16}
        validatorRegExp={/^\d{2,16}$/}
        hint={'输入2至16个字符的称呼。'}
      />
      <TextField
        className={'comment-email'}
        label={'邮箱'}
        value={this.state.commentAuthor}
        width={240}
        maxLength={30}
        validatorRegExp={/^\d{2,16}$/}
        hint={'输入常见的邮箱格式。'}
      />
      <TextField
        className={'comment-content'}
        label={'内容'}
        value={this.state.commentAuthor}
        width={492}
        maxLength={120}
        validatorRegExp={/^.{4,120}$/}
        hint={'输入4至120字符的评论。'}
      />
      <Button
        className={'submit'}
        type={'primary'}
      >
        提交
      </Button>
    </div>
  }

  render() {
    return (
      <div className={'rhaego-editor'} style={style} ref={this.setRef}>
        <div className={'editor-fields'}>
          <TextField
            className={'title'}
            label={'标题'}
            value={this.state.title}
            width={480}
            maxLength={16}
            validatorRegExp={/^\d{2,16}$/}
            hint={'输入2至16个字符的标题。'}
          />
          <TextField
            className={'tags'}
            label={'标签'}
            value={this.state.tagsText}
            width={240}
            maxLength={16}
            validatorRegExp={/^\d{2,16}$/}
            hint={'输入以#分隔的标签。'}
          />
          <TextField
            className={'date'}
            label={'发布时间'}
            value={this.state.date}
            width={240}
            maxLength={16}
            validatorRegExp={/^\d{2,16}$/}
            hint={'输入YYYY/MM/DD格式的时间。'}
          />
          <div className={'actions'}>
            <Button
              className={'submit'}
            >
              保存
            </Button>
            <Button
              className={'cancel'}
              type={'secondary'}
            >
              取消
            </Button>
          </div>

        </div>
        <div className={'compare-wrap'}>
            <textarea className={'raw'} value={this.state.markdownContent}/>
          <div
            className={'parsed rhaego-markdown'}
            dangerouslySetInnerHTML={this.setParsedHTML()}
          />
        </div>
      </div>
    )
  }
}