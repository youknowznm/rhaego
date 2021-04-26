const API_CONTEXT = '/api'

// 文章
const {githubUser} = require('../../config')

const GET_ARTICLES = `${API_CONTEXT}/getArticles`
const GET_ARTICLE_DETAIL = `${API_CONTEXT}/getArticle`
const SAVE_ARTICLE = `${API_CONTEXT}/saveArticle`
const DELETE_ARTICLE = `${API_CONTEXT}/deleteArticle`

const LIKE_ARTICLE = `${API_CONTEXT}/like`
const CANCEL_LIKE_ARTICLE = `${API_CONTEXT}/cancelLike`

const GET_COMMENTS = `${API_CONTEXT}/getComments`
const ADD_COMMENT = `${API_CONTEXT}/comment`
const DELETE_COMMENT = `${API_CONTEXT}/deleteComment`

// 文件服务
const UPLOAD_PIC = `${API_CONTEXT}/upload`

// 作品
const GET_REPOS = `${API_CONTEXT}/getRepos`

// 管理
const LOGIN = `${API_CONTEXT}/login`
const LOGOUT = `${API_CONTEXT}/logout`

// github 仓库
const GET_GITHUB_REPOS = `https://api.github.com/users/${githubUser}/repos?visibility=public`

module.exports = {
  GET_ARTICLES,
  GET_ARTICLE_DETAIL,
  SAVE_ARTICLE,
  DELETE_ARTICLE,
  LIKE_ARTICLE,
  CANCEL_LIKE_ARTICLE,
  GET_COMMENTS,
  ADD_COMMENT,
  DELETE_COMMENT,
  UPLOAD_PIC,
  GET_REPOS,
  LOGIN,
  LOGOUT,
  GET_GITHUB_REPOS,
}