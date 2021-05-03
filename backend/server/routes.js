const router = require('koa-router')()
const db = require('../data')
const fs = require('fs')
const {resolve} = require('path')
const {
  users,
} = require('../secret.json')
const {
  isValidString,
  generateId,
  getExt,
  RESUME_ID,
  validateParams,
} = require('../utils')
const api = require('../api')

const processArticleDoc = article => {
  return {
    ...article,
    likedCount: article.likedBy.length,
    commentCount: article.comments.length,
    likedBy: undefined,
    comments: undefined,
  }
}

router

  // 写指定笔记

  .post(api.SAVE_ARTICLE, async function(ctx) {
    // - 普通笔记入库 简历使用文件服务, 用特殊 id 区分
    const params = ctx.request.body
    // 在非编辑简历时校验
    // nedb 没有 schema, 手动验证
    if (params.articleId !== RESUME_ID) {
      const errorMessage = validateParams(params, {
        articleId: 'string',
        title: /^.{2,40}$/,
        tagsText: /^(\s*#[^#]+){1,3}\s*$/,
        dateString: /^\d{4}-\d{2}-\d{2}$/,
        markdownContent: /\S+/,
      })
      if (isValidString(errorMessage)) {
        ctx.throw(400, errorMessage)
        return
      }
    }

    if (params.articleId === '') {
      params.articleId = generateId()
      params.likedBy = []
      params.comments = []
    }

    let result
    if (params.articleId === RESUME_ID) {
      fs.writeFileSync(
        resolve(__dirname, '../data/resume.md'),
        params.markdownContent,
        'utf8'
      )
      result = {
        articleId: RESUME_ID
      }
    } else {
      result = await db.saveArticle(params)
    }
    ctx.body ={
      articleId: result.articleId
    }
  })

  // 读指定笔记

  .get(api.GET_ARTICLE_DETAIL, async function(ctx) {
    let article
    if (ctx.query.id === RESUME_ID) {
      article = {
        markdownContent: fs.readFileSync(
          resolve(__dirname, '../data/resume.md'),
          'utf8'
        ),
        title: '简历',
        dateString: '',
        tagsText: '',
        likedCount: 0,
        commentCount: 0,
      }
    } else {
      article = await db.getArticle(ctx.query.id)
      if (!article) {
        ctx.throw(404, '未找到目标笔记')
        return
      }
      article = processArticleDoc(article)
    }
    ctx.body = {
      article
    }
  })

  // 读全部笔记

  .get(api.GET_ARTICLES, async function(ctx) {
    const {tag = ''} = ctx.request.query
    const articles = await db.getArticles(decodeURI(tag))
    ctx.body = {
      articles: articles.map(item => processArticleDoc(item))
    }
  })

  // 删除笔记

  .post(api.DELETE_ARTICLE, async function(ctx) {
    const {id} = ctx.request.body
    if (id === RESUME_ID) {
      ctx.throw(400, '简历可别删除呀')
      return
    }
    await db.deleteArticle(id)
    ctx.body = {}
  })

  // 写图片

  .post(api.UPLOAD_FILE, async function(ctx) {
    let {articleId} = ctx.request.body
    const file = ctx.request.files.file
    if (file) {
      if (!isValidString(articleId)) {
        articleId = 'TEMP'
      }
      if (file.size > 1024 ** 3) {
        ctx.throw(400, '请使用 1M 以下的图片')
        return
      }
      const ext = getExt(file.name)
      if (!/^\.(svg|png|gif|jpe?g|bmp)$/.test(ext)) {
        ctx.throw(400, '只能上传图片文件')
        return
      }
      const fileName = `${articleId}_${generateId()}${ext}`
      fs.writeFileSync(
        resolve(__dirname, '../files/', fileName),
        fs.readFileSync(file.path)
      )
      ctx.body = {
        fileName
      }
    }
  })

  // 读图片

  .get('/files/:filename', async function(ctx) {
    const filePath = ctx.request.url
    ctx.type = getExt(filePath)
    ctx.body = fs.createReadStream(resolve(__dirname, `../${filePath}`))
  })

  // 读 github 仓库

  .get(api.GET_REPOS, async function(ctx) {
    const repos = await db.getGithubRepos()
    ctx.body = {
      repos: JSON.parse(repos)
    }
  })

  // 读站点访问次数

  .get(api.VISIT_COUNT, async function (ctx) {
    const visitCount = await db.getVisitCount()
    ctx.body = {
      visitCount
    }
  })

  // 登录

  .post(api.LOGIN, async function (ctx) {
    const {
      username,
      password,
    } = ctx.request.body
    if (!isValidString(username) || !isValidString(password)) {
      ctx.throw(400, '输入用户名和密码')
      return
    }
    const user = users.find(item => item.username === username)
    if (!user || user.password !== password) {
      ctx.throw(401, '用户名或密码错误')
      return
    }
    console.log(`已登录: ${username}`)
    ctx.cookies.set('username', username, {
      signed: true,
      httpOnly: true,
      overWrite: true,
    })
    ctx.body = {
      message: '登录成功'
    }
  })

  // 登出

  .post(api.LOGOUT, async function (ctx) {
    ctx.cookies.set('username', null, {
      signed: true,
      httpOnly: true,
      overWrite: true,
    })
    ctx.body = {
      message: '已登出'
    }
  })

  // 点赞/取消

  .post(api.TOGGLE_LIKE_ARTICLE, async function(ctx) {
    const {articleId} = ctx.request.body
    const clientIp = ctx.request.ip
    try {
      const message = await db.toggleLikeArticle({
        articleId,
        clientIp,
      })
      ctx.body = {
        message
      }
    } catch (e) {
      ctx.throw(403, e)
    }
  })

  // 发布评论

  .post(api.SAVE_COMMENT, async function(ctx) {
    const params = ctx.request.body
    const errorMessage = validateParams(params, {
      articleId: 'string',
      commentAuthor: /^\S{2,16}$/,
      commentEmail: /^\w+@\w+\.\w+$/,
      commentContent: /^.{2,120}$/,
    })
    if (isValidString(errorMessage)) {
      // 翻译一下
      ctx.throw(400, '请检查输入')
      return
    }
    params.createDate = new Date().valueOf()
    params.clientIp = ctx.request.ip
    params.commentId = generateId()
    await db.saveComment(params)
    ctx.body = {}
  })

  // 获取评论

  .get(api.GET_COMMENTS, async function(ctx) {
    const {articleId} = ctx.request.query
    const comments = await db.getComments(articleId)
    ctx.body = {
      comments: comments.map(item => ({
        ...item,
        commentEmail: undefined,
        clientIp: undefined,
      }))
    }
  })

  // 删除评论

  .post(api.DELETE_COMMENT, async function(ctx) {
    const params = ctx.request.body
    await db.deleteComment(params)
    ctx.body = {}
  })

  // 获取所有访客

  .get(api.GET_VISITORS, async function(ctx) {
    const visitors = await db.getVisitors()
    ctx.body = {
      visitors
    }
  })

module.exports = router.routes()