const fs = require('fs')
const {resolve} = require('path')
const Koa = require('koa')
const logger = require('koa-logger')
const koaBody = require('koa-body')
const conditional = require('koa-conditional-get')
const etag = require('koa-etag')
const serve = require('koa-static')
const db = require('../data')
const {secretKey} = require('../secret.json')
const {
  isAdmin,
  DEFAULT_DAILY_ATTEMPTS,
} = require('../utils')
const api = require('../api')
const routes = require('./routes')

const app = new Koa({
  keys: [secretKey],
  proxy: true
})

// 初始化数据库
db.init()

// 日志
app.use(logger())

// etag 写入和检查
app.use(conditional())
app.use(etag())

// 请求体
app.use(koaBody({
  multipart: true
}))

// 全局错误抛出
app.use(async function(ctx, next) {
  try {
    await next()
  } catch (err) {
    ctx.throw(err.status || 500, err.message || '服务器错误')
  }
})

// 统计访问次数, 间隔 10s 以上即视为新访问
app.use(async (ctx, next) => {
  const clientIp = ctx.request.ip
  const clientDoc = await db.getClient(clientIp)
  const now = new Date().valueOf()
  if (!clientDoc) {
    db.saveClient({
      clientIp,
      dailyAttempts: DEFAULT_DAILY_ATTEMPTS,
      restricted: false,
      lastVisited: new Date().valueOf(),
      visitCount: 1
    })
      .then(doc => {
        console.log(`新访客 ${clientIp}`)
      })
  } else if ((now - clientDoc.lastVisited) > 10 * 1000) {
    db.saveClient({
      clientIp,
      visitCount: clientDoc.visitCount + 1,
      lastVisited: now
    })
      .then(doc => {
        console.log(`回访 ${clientIp} - ${clientDoc.visitCount} 次`)
      })
  }
  await next()
})

// 校验 管理员权限
app.use(async function isAdminMiddleWare(ctx, next) {
  const targetRoutes = [
    api.SAVE_ARTICLE,
    api.DELETE_ARTICLE,
    api.DELETE_COMMENT,
    api.UPLOAD_FILE,
    api.GET_VISITORS,
  ]
  if (targetRoutes.includes(ctx.url) && !isAdmin(ctx)) {
    ctx.throw(401, '请以管理员身份登录')
  } else {
    await next()
  }
})

// 校验 访客每日请求次数
app.use(async function visitorAttemptControlMiddleWare(ctx, next) {
  const targetRoutes = [
    api.TOGGLE_LIKE_ARTICLE,
    api.SAVE_COMMENT,
  ]
  if (!targetRoutes.includes(ctx.url) || isAdmin(ctx)) {
    await next()
  } else {
    const client = await db.getClient(ctx.request.ip)
    // console.log('剩余请求数', client.dailyAttempts)
    // db.setClientDailyAttempt(ctx.request.ip, 'reset')
    if (client.dailyAttempts <= 0) {
      ctx.throw(403, '今日操作次数已达上限')
    } else {
      await next()
    }
  }
})

// 前端静态资源服务
app.use(serve(
  resolve(__dirname,  '../static')
))

// 业务路由
app.use(routes)

// 未匹配任何路由时,
// 返回 index.html, 以适配 browserHistory
app.use(async (ctx,next) => {
  console.log('未匹配', ctx.request.url)
  ctx.type = 'html'
  ctx.response.body = fs.readFileSync(resolve(__dirname, '../static/index.html'))
  await next()
})

app.listen(4000)

console.log('\n-------- rhaego 已运行于 http://localhost:4000 --------\n')