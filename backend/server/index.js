const path = require('path')
const Koa = require('koa')
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

// route definitions
app.use(serve(
  path.resolve( __dirname,  '../static')
))

router
  .get(GET_ARTICLES, getArticles)
  // .get('/post/new', add)
  // .get('/post/:id', show)
  // .post('/post', create)

app.use(router.routes())

async function serveStatic(ctx) {
  // const articles = await db.getArticles()
  // ctx.body = {
  //   data: articles
  // }
  // // await ctx.render('list', { posts: posts })
}

/**
 * Post listing.
 */

async function getArticles(ctx) {
  const articles = await db.getArticles()
  ctx.body = {
    data: articles
  }
  // await ctx.render('list', { posts: posts })
}

/**
 * Show creation form.
 */

async function add(ctx) {
  await ctx.render('new')
}

/**
 * Show post :id.
 */

async function show(ctx) {
  const id = ctx.params.id
  const post = posts[id]
  if (!post) ctx.throw(404, 'invalid post id')
  await ctx.render('show', { post: post })
}

/**
 * Create a post.
 */

async function create(ctx) {
  const post = ctx.request.body
  const id = posts.push(post) - 1
  post.created_at = new Date()
  post.id = id
  ctx.redirect('/')
}

app.listen(4000)


// const tmpdir = os.tmpdir();
// const filePaths = [];
// const files = ctx.request.body.files || {};
//
// for (let key in files) {
//   const file = files[key];
//   const filePath = path.join(tmpdir, file.name);
//   const reader = fs.createReadStream(file.path);
//   const writer = fs.createWriteStream(filePath);
//   reader.pipe(writer);
//   filePaths.push(filePath);
// }
//
// ctx.body = filePaths;