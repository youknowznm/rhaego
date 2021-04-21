// 文章
const {githubUser} = require('../../config')

const GET_ARTICLES = '/getArticles'
const GET_ARTICLE_DETAIL = '/getArticle'
const SAVE_ARTICLE = '/saveArticle'
const DELETE_ARTICLE = '/deleteArticle'

const LIKE_ARTICLE = '/like'
const CANCEL_LIKE_ARTICLE = '/cancelLike'

const GET_COMMENTS = '/getComments'
const ADD_COMMENT = '/comment'
const DELETE_COMMENT = '/deleteComment'

// 文件服务
const UPLOAD_PIC = '/upload'

// 作品
const GET_REPOS = '/getRepos'

// 简历
const GET_RESUME = '/getResume'

// 管理
const LOGIN = '/login'
const LOGOUT = '/logout'

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
  GET_RESUME,
  LOGIN,
  LOGOUT,
  GET_GITHUB_REPOS,
}