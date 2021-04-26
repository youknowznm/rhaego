const router = require('koa-router')()
const db = require('../data')
const fs = require('fs')
const path = require('path')

const {
  isValidString,
  generateId,
  set200,
  set400,
  getExt,
} = require('../utils')

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

const locate = location => {
  return path.resolve(__dirname, location)
}

const readSync = location => {
  return fs.readFileSync(locate(location), 'utf8')
}

const RESUME_ID = 'RESUME'

router
  // 文章
  // - 普通文章入库; 简历使用文件服务, 用特殊 id 区分
  .post(SAVE_ARTICLE, async function(ctx, next) {
    const params = ctx.request.body
    try {
      let result
      if (params.articleId === RESUME_ID) {
        fs.writeFileSync(
          (locate('../data/resume.md')),
          params.markdownContent,
          'utf8'
        )
        result = {
          articleId: RESUME_ID
        }
      } else {
        result = await db.saveArticle(params)
      }
      set200(ctx, {
        articleId: result.articleId
      })
    } catch (err) {
      set400(ctx, err.message)
    }
  })
  .get(GET_ARTICLE_DETAIL, async function(ctx) {
    const {id} = ctx.query
    try {
      let article
      if (id === RESUME_ID) {
        article = {
          markdownContent: readSync('../data/resume.md'),
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
      set400(ctx, err.message)
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
    if (id === RESUME_ID) {
      set400(ctx, '简历可别删除呀')
      return
    }
    try {
      const result = await db.deleteArticle(id)
      if (result === true) {
        set200(ctx)
      } else {
        set400(ctx)
      }
    } catch (err) {
      set400(ctx, err.message)
    }
  })
  // 文章 - 图片
  .post(UPLOAD_PIC, async function(ctx) {
    let {articleId} = ctx.request.body
    const file = ctx.request.files.file
    if (file) {
      if (!isValidString(articleId)) {
        articleId = 'TEMP'
      }
      const fileName = `${articleId}_${generateId(6)}${getExt(file.name)}`
      fs.writeFileSync(
        path.resolve(__dirname, '../files/', fileName),
        fs.readFileSync(file.path)
      )
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

module.exports = router.routes()