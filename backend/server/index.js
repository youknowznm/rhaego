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
const getFileSync = location => {
  return fs.readFileSync(locate(location), 'utf8')
}

const logger = require('koa-logger')
const router = require('koa-router')()
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

app.use(serve(
  path.resolve( __dirname,  '../static')
))

router
  // 文章
  .post(SAVE_ARTICLE, async function(ctx, next) {
    const params = ctx.request.body
    try {
      const result = await db.saveArticle(params)
      set200(ctx, {
        article: result
      })
    } catch (err) {
      set400(err.message)
    }
  })
  .get(GET_ARTICLE_DETAIL, async function(ctx) {
    const {id} = ctx.query
    try {
      let article
      if (id === 'RESUME') {
        article = {
          markdownContent: getFileSync('../data/resume.md'),
          title: '█ █ 铭',
          dateString: '',
          tagsText: '',
        }
      } else {
        article = await db.getArticle(id)
      }
      set200(ctx, {
        article
      })
    } catch (err) {
      set400(err.message)
    }
  })
  .get(GET_ARTICLES, async function(ctx) {
    const articles = await db.getArticles()
    ctx.body = {
      articles
    }
  })
  .post(DELETE_ARTICLE, async function(ctx) {
    const {id} = ctx.request.body
    try {
      const result = await db.deleteArticle(id)
      console.log({result})
      if (result === true) {
        set200(ctx)
      } else {
        set400(ctx)
      }
    } catch (err) {
      set400(err.message)
    }
  })
  // 文章 - 图片
  .post(UPLOAD_PIC, async function(ctx) {
    let {articleId} = ctx.request.body
    const file = ctx.request.files.file
    if (file) {
      if (!isValidString(articleId)) {
        articleId = 'TEMP_ARTICLE'
      }
      const fileName = `${articleId}_${generateId(6)}${getExt(file.name)}`
      fs.writeFileSync(
        path.resolve(__dirname, '../files/', fileName),
        fs.readFileSync(file.path)
      )
      console.log({fileName})
      set200(ctx, {
        fileName
      })
    }
  })
  // 仓库
  .get(GET_REPOS, async function(ctx) {
    const repoList = await db.getGithubRepos()
    ctx.body = {
      data: {
        repoList: JSON.parse(repoList)
      }
    }
  })

app.use(router.routes())

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
  ctx.response.body = getFileSync('../static/index.html')
  await next()
})

app.listen(4000)