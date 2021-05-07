import React from 'react'
import PropTypes from 'prop-types'
import c from 'classnames'
import {
  ajax,
  get,
  omit,
  getSearchParams,
  withRouter,
  isValidString,
  post,
  Link,
  pick,
  addClass, removeClass, postForm, markdownParser,
  debounce, RESUME_ID, noop, setStorage, getStorage
} from '~utils'
import style from './editor.scss'
import TextField from '~/components/TextField'
import Button from '~/components/Button'
import Toast, {toast} from '~/components/Toast'
import {formatDateToPast, formatDateToString} from '~utils'
import api from '~api'
import {MainContext} from '~/modules/Context'

const EDITOR_CONTENT_KEY = 'editor-content'

class Editor extends React.Component {

  state = {
    articleId: '',
    title: '',
    tagsText: '',
    markdownContent: '',
    parsedHTML: '',
    dateString: formatDateToString(new Date()),
    isLoading: false,
    hasValidated: false,
    isResume: false,
  }

  componentDidMount() {
    addClass(document.body, 'full-vh-content')
    this.tryGetExistedContent()
    this.context.setDocTitle('编辑笔记')
  }

  checkLocalStorage = () => {
    const value = getStorage(EDITOR_CONTENT_KEY)
    if (isValidString(value)) {
      this.setState({
        markdownContent: value,
        parsedHTML: markdownParser.parse(value),
      })
    }
  }

  tryGetExistedContent = () => {
    const {id} = getSearchParams()
    if (isValidString(id)) {
      this.setState({
        articleId: id,
        isResume: id === RESUME_ID,
        isLoading: true
      })
      get(api.GET_ARTICLE_DETAIL, {
        id
      })
        .then(res => {
          if (res.article === null) {
            toast('articleId 无效')
            return
          }
          this.setState({
            ...res.article,
            parsedHTML: markdownParser.parse(res.article.markdownContent),
            isLoading: false
          })
        })
        .catch(noop)
    } else {
      this.checkLocalStorage()
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
    const params = pick(this.state, [
      'articleId',
      'title',
      'tagsText',
      'markdownContent',
      'dateString',
    ])
    this.setState({
      hasValidated: true
    })
    post(api.SAVE_ARTICLE, params)
      .then(res => {
        this.props.history.push(`/article?id=${res.articleId}`)
        setStorage(EDITOR_CONTENT_KEY, '')
      })
      .catch(noop)
  }

  renderTopFields = () => {
    const topFieldsDisabled = this.state.isLoading || this.state.isResume
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
          hint={'2~40 字符的标题'}
          disabled={topFieldsDisabled}
          hasValidated={this.state.hasValidated}
        />
        <TextField
          className={'tags'}
          label={'标签'}
          value={this.state.tagsText}
          onChange={this.getSetStateMethod('tagsText')}
          width={280}
          maxLength={30}
          validatorRegExp={/^(\s*#[^#]+){1,3}\s*$/}
          hint={'1~3 个以#起始, 以空格分隔的标签'}
          disabled={topFieldsDisabled}
          hasValidated={this.state.hasValidated}
        />
        <TextField
          className={'date-string'}
          label={'发布时间'}
          value={this.state.dateString}
          onChange={this.getSetStateMethod('dateString')}
          width={200}
          maxLength={10}
          validatorRegExp={/^\d{4}-\d{2}-\d{2}$/}
          hint={'YYYY/MM/DD 格式的日期'}
          disabled={topFieldsDisabled}
          hasValidated={this.state.hasValidated}
        />
        <div className={'actions'}>
          <Button
            className={'submit'}
            disabled={this.state.isLoading}
            type={'primary'}
            onClick={this.onSave}
          >
            保存
          </Button>
            <Button
              className={'cancel'}
              onClick={() => {this.props.history.goBack()}}
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
      if (/\.(svg|png|gif|jpe?g|bmp)$/.test(file.name)) {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('articleId', this.state.articleId)
        this.setState({
          isLoading: true
        })
        postForm(api.UPLOAD_FILE, formData)
          .then(res => {
            const text = `\n![](/files/${res.fileName})\n`
            // 神奇, 本轮循环粘贴不出来
            setTimeout(() => {
              document.execCommand('insertText', false, text)
            })
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

  onContentChange = debounce(evt => {
    const {value} = evt.target
    this.setState({
      markdownContent: value,
      parsedHTML: markdownParser.parse(value),
    })
    setStorage(EDITOR_CONTENT_KEY, value)
  })

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

Editor.contextType = MainContext

export default withRouter(Editor)