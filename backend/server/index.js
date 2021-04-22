const path = require('path')
const Koa = require('koa')
const fs = require('fs')
const db = require('../dataBase')
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
  GET_RESUME,
  LOGIN,
  LOGOUT,
  GET_GITHUB_REPOS,
} = require('../api')

const logger = require('koa-logger')
const router = require('@koa/router')()
const koaBody = require('koa-body')
const serve = require('koa-static');

const app = new Koa()

// 初始化数据库
db.init()

// middleware
app.use(logger())
app.use(koaBody())

app.use(serve(
  path.resolve( __dirname,  '../static')
))

// route definitions
// app.use(

router
  .get(GET_ARTICLES, async function getArticles(ctx) {
    const articles = await db.getArticles()
    ctx.body = {
      data: articles
    }
  })
  .get(GET_REPOS, async function getRepos(ctx) {
    const repoDetail = await db.getGithubRepos()
    ctx.type = 'json'
    ctx.body = {
      data: {
        repoDetail: JSON.parse(repoDetail)
      }
    }
  })

  // .get('/post/new', add)
  // .get('/post/:id', show)
  // .post('/post', create)


app.use(async (ctx,next) => {
  console.log('未匹配', ctx.request.url)
  ctx.type = 'html'
  ctx.response.body = fs.readFileSync(path.resolve(__dirname,  '../static/index.html'), 'utf8')
  await next()
})

app.use(router.routes())

app.listen(4000)