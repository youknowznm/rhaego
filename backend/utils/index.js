const {customAlphabet} = require('nanoid/non-secure')
const fs = require('fs')
const path = require('path')
const {
  users
} = require('../secret.json')
const api = require('../api')
const db = require('../data')

// nano-id non-look-alike
const generateId = (digit = 7) => {
  return customAlphabet('346789ABCDEFGHJKLMNPQRTUVWXYabcdefghijkmnpqrtwxyz', digit)()
}

const isValidString = target => typeof target === 'string' && target !== ''

const getExt = fileName => {
  const arr = /\.\S+$/.exec(fileName)
  return arr[0] ? arr[0] : ''
}

const isAdmin = (ctx) => {
  const username = ctx.cookies.get('username', {
    signed: true
  })
  console.log(`当前用户: ${username || '未登录'}`)
  return users.some(item => item.username === username)
}

const DEFAULT_DAILY_ATTEMPTS = 20
const RESUME_ID = 'RESUME'

const validateParams = (params, validators) => {
  let paramValue
  let errorParamKey = null
  for (let [paramKey, validator] of Object.entries(validators)) {
    paramValue = params[paramKey]
    if (typeof validator === 'string') {
      // typeof
      if (typeof paramValue !== validator) {
        errorParamKey = paramKey
        break
      }
    } else if (validator instanceof RegExp) {
      // 正则
      if (!validator.test(paramValue)) {
        errorParamKey = paramKey
        break
      }
    } else if (typeof validator === 'function') {
      // 方法
      if (!validator(paramValue)) {
        errorParamKey = paramKey
        break
      }
    } else {
      // 其它验证方式待定
    }
  }
  return errorParamKey ? `入参错误: ${errorParamKey}` : ''
}


module.exports = {
  generateId,
  isValidString,
  getExt,
  isAdmin,
  RESUME_ID,
  DEFAULT_DAILY_ATTEMPTS,
  validateParams,
}