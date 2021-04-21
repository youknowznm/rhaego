import React from 'react';
import c from 'classnames'
import Header from "~/modules/Header";
import Footer from "~/modules/Footer";
import Card from "~/components/Card";
import Button from "~/components/Button";
import Article from "~/modules/Article";
import Articles from "~/modules/Articles";
import TextField from "~/components/TextField";
import Dialog from "~/components/Dialog";

import {GET_ARTICLE_DETAIL, GET_ARTICLES} from '~api'

const links = [
  {name: '笔记'},
  {name: '代码'},
  {name: '关于我'},
  {name: 'login as god'},
]

import style from './main.scss'
import Login from "~/modules/Login";
import Editor from "~/modules/Editor";
import {get} from "~/utils";

document.documentElement.scrollTop = 0

export default class Main extends React.Component {

  state = {
    value: '',
    sm: false
  }

  mainRef = null
  setMainRef = mainRef => {
    if (this.mainRef === null) {
      this.mainRef = mainRef
    }
  }

  componentDidMount() {
    get(GET_ARTICLES)
      .then(res => {
        console.log({res})
        this.setState({
          markdownContent: res.text
        })
      })
  }

  componentWillUnmount() {
  }

  renderMain = () => {
    return (
      <Article/>
    )
  }
  renderInput = () => {
    return (
      <TextField
        type={'text'}
        label={'还把对方'}
        value={this.state.value}
        validatorRegExp={/^\d$/}
        maxLength={10}
        disabled={false}
        placeholder={'placeholder'}
        // width={'100%'}
        onChange={evt => {this.setState({value: evt.target.value})}}
      />
    )
  }

  renderButton = () => {
    return (
      <Button >asfasdf</Button>
    )
  }

  renderDialog = () => {
    return (
      <div>
        <Button onClick={() => {
          this.setState({sm: true})
        }}>展示吧</Button>
        <Dialog
          isOpen={this.state.sm}
          onConfirm={() => {
            this.setState({sm: false})
          }}
          onCancel={() => this.setState({sm: false})}
          customContent={
            <div>shit</div>
          }
        />
      </div>
    )
  }

  render() {
    return (
      <>
        <Header
          links={links}
          siteName={'you know znm'}
        />
        <div
          className={c('rhaego-main-container', 'rhaego-responsive')}
          style={style}
          ref={this.setMainRef}
        >
          {/*<Editor />*/}
          {/*<Article />*/}
          {/*<Login />*/}
          <Articles />
          {/*{this.renderButton()}*/}
          {/*{this.renderDialog()}*/}
        </div>
        <Footer />
      </>
    )
  }

}