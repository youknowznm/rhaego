import {githubUser} from '~/config'

export const fetchGithub = `https://api.github.com/users/${githubUser}/repos?visibility=public`
export const login = '/api/login'
export const logout = '/api/logout'
export const uploadPicture = '/api/picture'
export const article = '/api/article'
export const articles = '/api/articles'
export const comment = '/api/comment'
export const like = '/api/like'
export const comments = '/api/comments'
export const resume = '/api/resume'
