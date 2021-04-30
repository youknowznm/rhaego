import React from 'react'
import {getStorage, Link, LOGIN_STATUS_KEY, noop, post, RESUME_ID, setStorage, withRouter} from '~utils'
import TextField from "~/components/TextField"
import Button from "~/components/Button"
import {
  pick,
} from '~utils'
import api from "~api"
import {
  MainConsumer,
  MainContext,
} from "~/modules/Context"

import style from './admin.scss'
class Admin extends React.Component {

  state = {
    username: '',
    password: '',
    isLoading: false,
    hasValidated: false,
  }

  componentDidMount() {
  }
  
  onClickLogin = () => {
    this.setState({
      hasValidated: true,
      isLoading: true,
    })
    post(api.LOGIN, pick(this.state, ['username', 'password']))
      .then(() => {
        setStorage(LOGIN_STATUS_KEY, true)
        this.context.markLogin()
      })
      .catch(noop)
      .finally(() => {
        this.setState({
          isLoading: false,
        })
      })
  }

  onCancelLogin = () => {
    this.props.history.goBack()
  }

  onClickLogout = () => {
    this.setState({
      hasValidated: true,
      isLoading: true,
    })
    post(api.LOGOUT)
      .then(() => {
        setStorage(LOGIN_STATUS_KEY, false)
        this.context.markLogout()
      })
      .catch(noop)
      .finally(() => {
        this.setState({
          isLoading: false,
        })
      })
  }
  
  getSetStateMethod = stateKey => evt => {
    this.setState({
      [stateKey]: evt.target.value
    })
  }

  renderLogin = () => {
    return (
      <div className={'login-area'}>
        <div className={'title'}>
          <p>以管理员身份登录, 编辑笔记和评论.</p>
          <p>管理员信息维护在远端的 secret.json 中.</p>
        </div>
        <TextField
          className={'username'}
          label={'用户名'}
          value={this.state.username}
          onChange={this.getSetStateMethod('username')}
          width={'100%'}
          maxLength={16}
          validatorRegExp={/^\d{2,16}$/}
          disabled={this.state.isLoading}
        />
        <TextField
          className={'password'}
          type={'password'}
          label={'密码'}
          value={this.state.password}
          onChange={this.getSetStateMethod('password')}
          width={'100%'}
          maxLength={20}
          validatorRegExp={/^.{6,20}$/}
          disabled={this.state.isLoading}
        />
        <Button
          className={'submit'}
          type={'primary'}
          onClick={this.onClickLogin}
          disabled={this.state.isLoading}
        >
          登录
        </Button>
        <Button
          className={'cancel'}
          onClick={this.onCancelLogin}
          disabled={this.state.isLoading}
        >
          取消
        </Button>
      </div>
    )
  }

  renderAdmin = () => {
    return (
      <div className={'admin-area'}>
        <div className={'title'}>
          <p>已经以管理员身份登录.</p>
        </div>
        <Button
          className={'new-article'}
          disabled={this.state.isLoading}
          onClick={() => this.props.history.push(`/editor`)}
        >
          新建笔记
        </Button>
        <Button
          className={'edit-resume'}
          disabled={this.state.isLoading}
          onClick={() => this.props.history.push(`/editor?id=${RESUME_ID}`)}
        >
          编辑简历
        </Button>
        <Button
          className={'cancel'}
          onClick={this.onClickLogout}
          type={'secondary'}
          disabled={this.state.isLoading}
        >
          退出登录
        </Button>
      </div>
    )
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div className={'rhaego-admin content-pop-in'}>
        {
          this.context.hasLoggedIn ? this.renderAdmin() : this.renderLogin()
        }
      </div>
    )
  }
}

Admin.contextType = MainContext

export default withRouter(Admin)












