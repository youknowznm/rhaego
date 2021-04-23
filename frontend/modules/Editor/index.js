import React from 'react'
import PropTypes from 'prop-types'
import c from 'classnames'
import marked from 'marked'
import hljs from "highlight.js"
import {
  ajax,
  get,
  omit,
  getSearchParams,
  isValidString,
  post,
} from "~/utils"
import style from './editor.scss'
import TextField from "~/components/TextField"
import Button from "~/components/Button"
import {toReadableDateString} from "~/utils"
import {
  GET_ARTICLE_DETAIL,
  SAVE_ARTICLE,
} from '~api'

export default class Editor extends React.Component {

  static propTypes = {
    // articleId: PropTypes.string,
  }

  static defaultProps = {
    // articleId: '',
  }

  state = {
    articleId: '',
    title: '',
    tagsText: '',
    markdownContent: '',
    date: '',
    isLoading: false,
    hasValidated: false,
  }

  docRef = null
  setRef = ref => {
    if (this.docRef === null) {
      this.docRef = ref
    }
  }

  getParsedHTML = () => {
    const renderer = new marked.Renderer()
    renderer.link = (href, title, text) => {
      return `<a target="_blank" href="${href}" title="${title}">${text}</a>`
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
    document.body.classList.add('full-vh-content')
    this.tryGetExistedContent()
  }

  tryGetExistedContent = () => {
    const {articleId = ''} = getSearchParams()
    if (isValidString(articleId)) {
      this.setState({
        articleId
      })
      get(GET_ARTICLE_DETAIL, {
        id: articleId
      })
        .then(res => {
          this.setState({
            markdownContent: res.text
          })
        })
        .catch(err => {
          console.log({err})
        })
    }
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

  getSetStateMethod = stateKey => evt => {
    this.setState({
      [stateKey]: evt.target.value
    })
  }

  trySaveArticle = () => {
    const params = omit(this.state, [
      'hasValidated',
      'isLoading',
    ])
    post(SAVE_ARTICLE, {
      data: params
    })
  }

  renderTopFields = () => {
    return (
      <div className={'editor-fields'}>
        <TextField
          className={'title'}
          label={'标题'}
          value={this.state.title}
          onChange={this.getSetStateMethod('title')}
          width={480}
          maxLength={16}
          validatorRegExp={/^\d{2,40}$/}
          hint={'输入 2~40 字符的标题。'}
          disabled={this.state.isLoading}
          hasValidated={this.state.hasValidated}
        />
        <TextField
          className={'tags'}
          label={'标签'}
          value={this.state.tagsText}
          onChange={this.getSetStateMethod('tagsText')}
          width={240}
          maxLength={16}
          validatorRegExp={/^\d{2,16}$/}
          hint={'输入以#分隔的标签。'}
          disabled={this.state.isLoading}
          hasValidated={this.state.hasValidated}
        />
        <TextField
          className={'date'}
          label={'发布时间'}
          value={this.state.date}
          onChange={this.getSetStateMethod('date')}
          width={240}
          maxLength={10}
          validatorRegExp={/^\d{10}$/}
          hint={'输入 YYYY/MM/DD 格式的时间。'}
          disabled={this.state.isLoading}
          hasValidated={this.state.hasValidated}
        />
        <div className={'actions'}>
          <Button
            className={'submit'}
            disabled={this.state.isLoading}
            onClick={this.trySaveArticle}
          >
            保存
          </Button>
          <Button
            className={'cancel'}
            type={'secondary'}
            disabled={this.state.isLoading}
          >
            取消
          </Button>
        </div>
      </div>
    )
  }

  renderCompareArea = () => {
    return (
      <div className={'compare-wrap'}>
        <textarea
          className={'raw'}
          value={this.state.markdownContent}
          onChange={this.getSetStateMethod('markdownContent')}
        />
        <div
          className={'parsed rhaego-markdown'}
          dangerouslySetInnerHTML={this.getParsedHTML()}
        />
      </div>
    )
  }

  render() {
    return (
      <div className={'rhaego-editor'} ref={this.setRef}>
        {this.renderTopFields()}
        {this.renderCompareArea()}
      </div>
    )
  }
}