const path = require('path')
const Koa = require('koa')
const fs = require('fs')
const db = require('../data')
const {
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
} = require('../api')

const routes = require('../routes')

const {
  isValidString,
  generateId,
  set200,
  set400,
  getExt,
} = require('../utils')

const locate = location => {
  return path.resolve(__dirname, location)
}

const readSync = location => {
  return fs.readFileSync(locate(location), 'utf8')
}

const logger = require('koa-logger')
const koaBody = require('koa-body')
const serve = require('koa-static')

const app = new Koa()

// 初始化数据库
db.init()

// middleware
app.use(logger())
app.use(koaBody({
  multipart: true
}))

// 静态资源服务
app.use(serve(
  path.resolve(__dirname,  '../static')
))

// 业务路由
app.use(routes)

// 图片的文件服务
app.use(async (ctx,next) => {
  const {url} = ctx.request
  if (/^\/files/.test(url)) {
    ctx.type = getExt(url)
    ctx.body = fs.createReadStream(locate(`../${url}`))
  } else {
    await next()
  }
})

// 未匹配任何路由时, 返回 index.html, 以适配 browserHistory
app.use(async (ctx,next) => {
  console.log('未匹配', ctx.request.url)
  ctx.type = 'html'
  ctx.response.body = readSync('../static/index.html')
  await next()
})

app.listen(4000)