import React from 'react'
import PropTypes from 'prop-types'
import c from 'classnames'
import {
  ajax,
  get,
  omit,
  getSearchParams,
  goToSearchParams,
  isValidString,
  post,
  addClass, removeClass, goToPath, postForm, parseMarkdown,
} from "~/utils"
import style from './editor.scss'
import TextField from "~/components/TextField"
import Button from "~/components/Button"
import Toast, {toast} from "~/components/Toast"
import {formatDateToPast, formatDateToString} from "~/utils"
import {
  GET_ARTICLE_DETAIL,
  UPLOAD_PIC,
  SAVE_ARTICLE,
} from '~api'
import {debounce, throttle} from "~utils/lodash";

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
    parsedHTML: '',
    dateString: formatDateToString(new Date()),
    isLoading: false,
    hasValidated: false,
  }

  componentDidMount() {
    addClass(document.body, 'full-vh-content')
    this.tryGetExistedContent()
  }

  tryGetExistedContent = () => {
    const {id} = getSearchParams()
    if (isValidString(id)) {
      this.setState({
        id,
        isLoading: true
      })
      get(GET_ARTICLE_DETAIL, {
        id
      })
        .then(res => {
          if (res.article === null) {
            toast('articleId 无效')
            return
          }
          this.setState({
            ...omit(res.article, '_id'),
            parsedHTML: parseMarkdown(res.article.markdownContent),
            isLoading: false
          })
        })
    }
  }

  componentWillUnmount() {
    removeClass(document.body, 'full-vh-content')
  }

  getSetStateMethod = stateKey => evt => {
    this.setState({
      [stateKey]: evt.target.value
    })
  }

  onSave = () => {
    const params = omit(this.state, [
      'hasValidated',
      'isLoading',
    ])
    this.setState({
      hasValidated: true
    })
    post(SAVE_ARTICLE, params)
      .then(res => {
        goToPath(`/article?id=${res.article.articleId}`)
      })
  }

  onCancel = () => {
    goToPath('/articles')
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
          maxLength={40}
          validatorRegExp={/^\s*.{2,40}\s*$/}
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
          maxLength={30}
          validatorRegExp={/^(\s*#[^#]+){1,3}\s*$/}
          hint={'输入 1~3 个以#分隔的标签。'}
          disabled={this.state.isLoading}
          hasValidated={this.state.hasValidated}
        />
        <TextField
          className={'date-string'}
          label={'发布时间'}
          value={this.state.dateString}
          onChange={this.getSetStateMethod('dateString')}
          width={240}
          maxLength={10}
          validatorRegExp={/^\d{4}-\d{2}-\d{2}$/}
          hint={'输入 YYYY/MM/DD 格式的日期。'}
          disabled={this.state.isLoading}
          hasValidated={this.state.hasValidated}
        />
        <div className={'actions'}>
          <Button
            className={'submit'}
            disabled={this.state.isLoading}
            onClick={this.onSave}
          >
            保存
          </Button>
          <Button
            className={'cancel'}
            type={'secondary'}
            onClick={this.onCancel}
            disabled={this.state.isLoading}
          >
            取消
          </Button>
        </div>
      </div>
    )
  }

  handlePaste = evt => {
    const file = evt.clipboardData.files[0]
    if (file) {
      if (/\.png|jpg|jpeg|gif$/.test(file.name)) {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('articleId', this.state.articleId)
        this.setState({
          isLoading: true
        })
        postForm(UPLOAD_PIC, formData)
          .then(res => {
            const text = `\n\n![](/files/${res.fileName})\n\n`
            document.execCommand('insertText', false, text);
          })
          .finally(() => {
            this.setState({
              isLoading: false
            })
          })
      } else {
        toast('只支持图片文件的复制上传')
      }
    }
  }

  onContentChange = debounce((evt) => {
    const {value} = evt.target
    this.setState({
      markdownContent: value,
      parsedHTML: parseMarkdown(value),
    })
  }, 400)

  renderCompareArea = () => {
    return (
      <div className={'compare-wrap'}>
        <textarea
          className={'raw'}
          defaultValue={this.state.markdownContent}
          onChange={this.onContentChange}
          onPaste={this.handlePaste}
          disabled={this.state.isLoading}
        />
        <div
          className={'parsed rhaego-markdown'}
          dangerouslySetInnerHTML={{__html: this.state.parsedHTML}}
        />
      </div>
    )
  }

  render() {
    return (
      <div className={'rhaego-editor'}>
        {this.renderTopFields()}
        {this.renderCompareArea()}
      </div>
    )
  }
}