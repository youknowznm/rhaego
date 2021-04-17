import React from 'react';
import c from 'classnames'
import Header from "~/modules/Header";
import Footer from "~/modules/Footer";
import Card from "~/components/Card";
import Button from "~/components/Button";
import Article from "~/modules/Article";
import Articles from "~/modules/Articles";
import TextField from "~/components/TextField";
import Modal from "~/components/Modal";

const links = [
  {name: '笔记'},
  {name: '代码'},
  {name: '关于我'},
  {name: 'login as god'},
]

import style from './main.scss'

document.documentElement.scrollTop = 0

export default class Main extends React.Component {


  state = {
    value: '',
    sm: false
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

  renderModal = () => {

    return (
      <div>
        <Button onClick={() => {
          this.setState({sm: true})
        }}>展示吧</Button>
        <Modal
          isOpen={this.state.sm}
          onConfirm={() => {
            this.setState({sm: false})
            console.log(123)
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
          className={c('rhaego-main', 'rhaego-responsive')}
          style={style}
        >
          <Article />
          {/*<Articles />*/}
          {/*{this.renderButton()}*/}
          {/*{this.renderModal()}*/}
        </div>
        <Footer />
      </>
    )
  }

}