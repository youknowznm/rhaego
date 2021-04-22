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
  GET_RESUME,
  LOGIN,
  LOGOUT,
  GET_GITHUB_REPOS,
} = require('../api')

const logger = require('koa-logger')
const router = require('@koa/router')()
const koaBody = require('koa-body')
const serve = require('koa-static')

const app = new Koa()

// 初始化数据库
db.init()

// middleware
app.use(logger())
app.use(koaBody())

app.use(serve(
  path.resolve( __dirname,  '../static')
))

// 路由
router
  .get(GET_ARTICLES, async function getArticles(ctx) {
    const articles = await db.getArticles()
    ctx.body = {
      data: {
        articleList: articles
      }
    }
  })
  .get(GET_ARTICLE_DETAIL, async function getArticles(ctx) {
    ctx.body = {
      data: {
        resume: fs.readFileSync(path.resolve(__dirname,  '../files/test.md'), 'utf8')
      }
    }
  })
  .get(GET_REPOS, async function getRepos(ctx) {
    const repoList = await db.getGithubRepos()
    ctx.body = {
      data: {
        repoList: JSON.parse(repoList)
      }
    }
  })
  .get(GET_RESUME, async function getResume(ctx) {
    ctx.body = {
      data: {
        resume: fs.readFileSync(path.resolve(__dirname,  '../data/resume.md'), 'utf8')
      }
    }
  })

  // .get('/post/new', add)
  // .get('/post/:id', show)
  // .post('/post', create)

app.use(router.routes())

// 未匹配任何路由时, 返回 index.html, 以适配 browserHistory
app.use(async (ctx,next) => {
  console.log('未匹配', ctx.request.url)
  ctx.type = 'html'
  ctx.response.body = fs.readFileSync(path.resolve(__dirname,  '../static/index.html'), 'utf8')
  await next()
})

app.listen(4000)