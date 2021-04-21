import React from 'react';
import c from 'classnames'

import {throttle, debounce} from 'lodash'

import TextField from "~/components/TextField";
import {svgCommentDark, svgComment, svgHeartDark, svgHeart} from "~/assets/svg";
import Button from "~/components/Button";
import toReadableDateString from "~/utils/toReadableDateString";


import  './login.scss'

export default class Login extends React.Component {

  state = {
    username: '',
    password: '',
  }

  docRef = null
  setRef = ref => {
    if (this.docRef === null) {
      this.docRef = ref
    }
  }
  componentDidMount() {
  }

  navRef = null
  setNavRef = ref => {
    if (this.navRef === null) {
      this.navRef = ref
    }
  }

  renderLoginArea = () => {
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
        className={'comment-email'}
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
      >
        取消
      </Button>
    </div>
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div className={'rhaego-login'}>
        {this.renderLoginArea()}
      </div>
    )
  }
}