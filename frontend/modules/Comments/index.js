import React from 'react'
import c from 'classnames'
import {
  animateToScrollHeight,
  isValidString,
  get,
  mockTimeout,
  pick,
  RESUME_ID, getNodeOffsetTopToPage, getStorage, setStorage, post, noop
} from '~utils'
import TextField from '~/components/TextField'
import Button from '~/components/Button'
import {formatDateToPast} from '~utils'
import api from '~api'
import {SvgComment, SvgThumbUp} from '~/assets/svg'
import Loading from '~/components/Loading'
import PropTypes from 'prop-types'
import {toast} from '~/components/Toast'
import style from './comments.scss'
import {MainContext} from '~/modules/Context';

class Comments extends React.Component {

  static propTypes = {
    articleId: PropTypes.string,
    getScrollToEditorFunc: PropTypes.func,
  }

  static defaultProps = {
    articleId: '',
    getScrollToEditorFunc: () => {}
  }

  state = {
    comments: [],
    commentAuthor: getStorage('commentAuthor') || '',
    commentEmail: getStorage('commentEmail') || '',
    commentContent: '',
    isLoading: false,
    hasValidated: false,
    emptyReason: null,
  }

  editorRef = null
  setEditorRef = ref => {
    if (!this.editorRef) {
      this.editorRef = ref
    }
  }

  componentDidMount() {
    this.props.getScrollToEditorFunc(this.scrollToCommentEditor)
    this.getComments()
  }
  
  getComments = () => {
    const params = {
      articleId: this.props.articleId,
    }
    this.setState({
      isLoading: true
    })
    get(api.GET_COMMENTS, params)
      .then(res => {
        this.setState({
          comments: res.comments,
          emptyReason: res.comments.length === 0 ? '暂无评论' : ''
        })
      })
      .catch(noop)
      .finally(() => {
        this.setState({
          isLoading: false
        })
      })
  }

  getSetStateMethod = stateKey => evt => {
    const {value} = evt.target
    this.setState({
      [stateKey]: value
    })
    if (['commentAuthor', 'commentEmail'].includes(stateKey)) {
      setStorage(stateKey, value)
    }
  }

  onClickComment = () => {
    this.setState({
      hasValidated: true,
      isLoading: true,
    })
    const params = {
      articleId: this.props.articleId,
      ...pick(this.state, [
        'commentAuthor',
        'commentEmail',
        'commentContent',
      ])
    }
    this.scrollToCommentEditor()
    post(api.SAVE_COMMENT, params)
      .then(res => {
        this.getComments()
        this.setState({
          commentContent: '',
          hasValidated: false,
        })
      })
      .catch(noop)
      .finally(() => {
        this.setState({
          isLoading: false
        })
      })
  }

  renderCommentEditor = () => {
    return (
      <div className={'comment editor content-pop-in'} ref={this.setEditorRef}>
        <div className={'author-wrap'}>
          <TextField
            className={'comment-author'}
            label={'称呼'}
            value={this.state.commentAuthor}
            onChange={this.getSetStateMethod('commentAuthor')}
            width={'100%'}
            maxLength={16}
            validatorRegExp={/^\d{2,16}$/}
            hint={'2~16 字符的称呼'}
            hasValidated={this.state.hasValidated}
          />
        </div>
        <div className={'email-wrap'}>
          <TextField
            className={'comment-email'}
            label={'邮箱'}
            value={this.state.commentEmail}
            onChange={this.getSetStateMethod('commentEmail')}
            width={'100%'}
            maxLength={30}
            validatorRegExp={/^\w+@\w+\.\w+$/}
            hint={'常见的邮箱格式'}
            hasValidated={this.state.hasValidated}
          />
        </div>
        <TextField
          className={'comment-content'}
          label={'评论'}
          value={this.state.commentContent}
          onChange={this.getSetStateMethod('commentContent')}
          width={'100%'}
          maxLength={120}
          validatorRegExp={/^.{2,120}$/}
          hint={'2~120 字符的评论内容'}
          hasValidated={this.state.hasValidated}
        />
        <Button
          className={'submit'}
          type={'primary'}
          onClick={this.onClickComment}
        >
          提交
        </Button>
      </div>
    )
  }

  deleteComment = commentId => {
    post(api.DELETE_COMMENT, {
      commentId,
      articleId: this.props.articleId
    })
      .then(res => {
        this.getComments()
      })
      .catch(noop)
  }

  renderComments = () => {
    const {comments} = this.state
    const isAdmin = this.context.hasLoggedIn
    return (
      <Loading
        isLoading={this.state.isLoading}
        emptyReason={this.state.emptyReason}
        className={'comments-loader'}
      >
        <ul className={'comments content-pop-in'}>
          {
            comments.map(item => (
              <li
                className={'comment existed'}
                key={item.commentId}
              >
                <p className={'title'}>
                <span className={'author'}>
                  {item.commentAuthor}
                </span>
                  <span className={'separator'}>
                  ·
                </span>
                  <span className={'date'}>
                  {formatDateToPast(item.createDate)}
                </span>
                </p>
                <p className={'content'}>
                  {item.commentContent}
                </p>
                <Button
                  className={c('delete', !isAdmin && 'hidden')}
                  size={'small'}
                  type={'secondary'}
                  onClick={() => this.deleteComment(item.commentId)}
                >
                  删除评论
                </Button>
              </li>
            ))
          }
        </ul>
      </Loading>
    )
  }

  scrollToCommentEditor = () => {
    animateToScrollHeight(getNodeOffsetTopToPage(this.editorRef) - 64 - 24)
  }

  componentWillUnmount() {
    this.props.getScrollToEditorFunc(noop)
  }

  render() {
    if (!isValidString(this.props.articleId)) {
      return null
    }
    return (
      <div
        className={'rhaego-article-comment'}
        ref={this.setRef}
      >
        {this.renderCommentEditor()}
        {this.renderComments()}
      </div>
    )
  }
}

Comments.contextType = MainContext

export default Comments