const API_CONTEXT = '/api'
const {githubUsername} = require('../../config')

module.exports = {
  // 笔记
  GET_ARTICLES: `${API_CONTEXT}/getArticles`,
  GET_ARTICLE_DETAIL: `${API_CONTEXT}/getArticle`,
  SAVE_ARTICLE: `${API_CONTEXT}/saveArticle`,
  DELETE_ARTICLE: `${API_CONTEXT}/deleteArticle`,

  // 点赞
  TOGGLE_LIKE_ARTICLE: `${API_CONTEXT}/toggleLike`,

  // 评论
  GET_COMMENTS: `${API_CONTEXT}/getComments`,
  SAVE_COMMENT: `${API_CONTEXT}/comment`,
  DELETE_COMMENT: `${API_CONTEXT}/deleteComment`,

  // 图片文件服务
  UPLOAD_FILE: `${API_CONTEXT}/upload`,
  GET_FILE: `/files`,

  // 作品
  GET_REPOS: `${API_CONTEXT}/getRepos`,

  // 管理
  LOGIN: `${API_CONTEXT}/login`,
  LOGOUT: `${API_CONTEXT}/logout`,

  // 访问次数
  VISIT_COUNT: `${API_CONTEXT}/visitCount`,
  // 所有访客
  GET_VISITORS: `${API_CONTEXT}/visitors`,

  // github 仓库列表
  GET_GITHUB_REPOS: `https://api.github.com/users/${githubUsername}/repos?visibility=public`,
}