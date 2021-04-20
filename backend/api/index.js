// 文章
const {githubUser} = require('../../config');

const GET_ARTICLES = '/getArticles'
// export const GET_ARTICLE_DETAIL = '/getArticle'
// export const SAVE_ARTICLE = '/saveArticle'
// export const DELETE_ARTICLE = '/deleteArticle'
//
// export const LIKE_ARTICLE = '/like'
// export const CANCEL_LIKE_ARTICLE = '/cancelLike'
//
// export const GET_COMMENTS = '/getComments'
// export const ADD_COMMENT = '/comment'
// export const DELETE_COMMENT = '/deleteComment'
//
// // 文件服务
// export const UPLOAD_PIC = '/upload'
//
// // 作品
// export const GET_REPOS = '/getRepos'
//
// // 简历
// export const GET_RESUME = '/getResume'
//
// // 管理
// export const LOGIN = '/login'
// export const LOGOUT = '/logout'


const GET_GITHUB_REPOS = `https://api.github.com/users/${githubUser}/repos?visibility=public`

module.exports = {
  GET_ARTICLES,
  GET_GITHUB_REPOS,
}