import {githubUsername} from '../config'

export const fetchGithub = `https://api.github.com/users/${githubUsername}/repos?visibility=public`
export const login = '/login'
export const logout = '/logout'
export const checkIfLoggedIn = '/checkLoginStatus'
