import React from 'react';
import {withRouter} from '~/utils'
import TextField from "~/components/TextField";
import Button from "~/components/Button";

import style from './admin.scss'
class Admin extends React.Component {

  state = {
    username: '',
    password: '',
  }

  componentDidMount() {
  }

  onCancel = () => {
    this.props.history.goBack()
  }

  renderAdminArea = () => {
    return <div className={'login-area'}>
      <p className={'title'}>以管理员身份登录，编辑文章和评论。</p>
      <TextField
        className={'username'}
        label={'账户'}
        value={this.state.username}
        width={'100%'}
        maxLength={16}
        validatorRegExp={/^\d{2,16}$/}
        hint={'输入常见的邮箱格式。'}
      />
      <TextField
        className={'email'}
        type={'password'}
        label={'密码'}
        value={this.state.password}
        width={'100%'}
        maxLength={20}
        validatorRegExp={/^.{6,20}$/}
        hint={'输入6至20字符的密码。'}
      />
      <Button
        className={'submit'}
        type={'primary'}
      >
        登录
      </Button>
      <Button
        className={'cancel'}
        onClick={this.onCancel}
      >
        取消
      </Button>
    </div>
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div className={'rhaego-admin'}>
        {this.renderAdminArea()}
      </div>
    )
  }
}

export default withRouter(Admin)