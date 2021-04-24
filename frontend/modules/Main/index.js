import React from 'react';
import c from 'classnames'
import Header from "~/components/Header";
import Footer from "~/components/Footer";
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
import {get} from "~utils";

document.documentElement.scrollTop = 0

export default class Main extends React.Component {
  render() {
    return (
        <div
          className={c('rhaego-main-container', 'rhaego-responsive')}
        >
          {this.props.children}
        </div>
    )
  }
}