const {customAlphabet} = require('nanoid/non-secure')
const fs = require('fs')
const path = require('path')

// nano-id non-look-alike
const generateId = (digit = 10) => {
  return customAlphabet('346789ABCDEFGHJKLMNPQRTUVWXYabcdefghijkmnpqrtwxyz', digit)()
}

const isValidString = target => typeof target === 'string' && target !== ''

const getExt = fileName => {
  const arr = /\.\S+$/.exec(fileName)
  return arr[0] ? arr[0] : ''
}

const set200 = (ctx, body) => {
  ctx.response.type = 'json'
  ctx.response.status = 200
  ctx.response.body = body
}

const set400 = (ctx, message) => {
  ctx.response.type = 'json'
  ctx.response.status = 400
  ctx.response.message = message
}

module.exports = {
  generateId,
  set200,
  set400,
  isValidString,
  getExt,
}