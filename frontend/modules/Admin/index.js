import React from 'react'
import {
  getStorage,
  get,
  Link,
  LOGIN_STATUS_KEY,
  noop,
  post,
  RESUME_ID,
  setStorage,
  withRouter,
  formatDateToPast, addCommaToInt
} from '~utils'
import TextField from '~/components/TextField'
import Button from '~/components/Button'
import {
  pick,
} from '~utils'
import api from '~api'
import {
  MainConsumer,
  MainContext,
} from '~/modules/Context'

import style from './admin.scss'
class Admin extends React.Component {

  state = {
    username: '',
    password: '',
    isLoading: false,
    hasValidated: false,
    visitors: []
  }

  componentDidMount() {
    this.tryGetVisitors()
  }

  tryGetVisitors = () => {
    if (getStorage(LOGIN_STATUS_KEY) === true) {
      get(api.GET_VISITORS)
        .then((res) => {
          this.setState({
            isLoading: true,
            visitors: res.visitors
          })
        })
        .catch(noop)
        .finally(() => {
          this.setState({
            isLoading: false,
          })
        })
      }
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
        this.tryGetVisitors()
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
    if (this.context.hasLoggedIn) {
      return null
    }
    return (
      <div className={'login-area'}>
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
    if (!this.context.hasLoggedIn) {
      return null
    }
    return (
      <div className={'admin-area'}>
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

  renderVisitors = () => {
    if (!this.context.hasLoggedIn) {
      return null
    }
    return (
      <table className={'visitor-list'}>
        <tr>
          <th>IP</th>
          <th>每日有效请求次数</th>
          <th>上次访问</th>
          <th>禁用</th>
          <th>访问次数</th>
        </tr>
        {
          this.state.visitors.map(item => (
            <tr key={item._id}>
              <td>
                {item.clientIp.replace(/::ffff:/, '')}
              </td>
              <td align={'right'}>
                {item.dailyAttempts}
              </td>
              <td>
                {formatDateToPast(item.lastVisited)}
              </td>
              <td align={'center'}>
                {item.restricted === true ? '是' : '否'}
              </td>
              <td align={'right'}>
                {addCommaToInt(item.visitCount)}
              </td>
            </tr>
          ))
        }
      </table>
    )
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div className={'rhaego-admin content-pop-in'}>
        {this.renderAdmin()}
        {this.renderLogin()}
        {this.renderVisitors()}
      </div>
    )
  }
}

Admin.contextType = MainContext

export default withRouter(Admin)












