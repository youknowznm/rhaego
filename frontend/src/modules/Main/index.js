import React from 'react';
import c from 'classnames'
import Header from "~/modules/Header";
import Footer from "~/modules/Footer";
import Card from "~/components/Card";
import Button from "~/components/Button";
import Article from "~/modules/Article";
import Articles from "~/modules/Articles";
import TextField from "~/components/TextField";

const links = [
  {name: '笔记'},
  {name: '代码'},
  {name: '关于我'},
  {name: 'login as god'},
]

import style from './main.scss'

export default class Main extends React.Component {


  state = {
    value: '123'
  }

  renderMain = () => {
    return (
      <Article/>
    )
  }

  renderButton = () => {
    return (
      <div
        className={c(`rhaego-main`)}
        style={style}
      >
        {
          this.palette.map(c => {
            return <Button />
          })
        }
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
          className={c(`rhaego-main`, 'rhaego-responsive')}
          style={style}
        >
          {/*<Articles />*/}
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
        </div>
        <Footer />
      </>
    )
  }

}