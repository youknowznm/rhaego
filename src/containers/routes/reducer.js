import {UPDATE_ROUTE} from './actionTypes'

const getFirtsPathname = () => {
  // 获取当前的一级pathname。无则返回‘active’
  const allPathname = window.location.pathname
  let regArr = /^\/[^/]+/.exec(allPathname)
  let result = regArr ? regArr[0] : '/articles'
  return result
}

const defaultState = {
  firstPathname: '/articles'
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case UPDATE_ROUTE:
      return {...state, firstPathname: getFirtsPathname()}
    default:
      return state
  }
}
