const path = require('path')
const Datastore = require('nedb')
const request = require('request')

const {GET_GITHUB_REPOS} = require("../api");

const {
  validateArticleDoc,
  validateCommentDoc,
} = require('./validators')


const isValidString = target => typeof target === 'string' && target !== ''

class RhaegoDb {

  constructor() {
    this.authDb = new Datastore({
      filename: path.resolve(__dirname, './auth.db'),
      autoload: true,
    })
    this.articleDb = new Datastore({
      filename: path.resolve(__dirname, './articles.db'),
      autoload: true,
    })
    this.commentDb = new Datastore({
      filename: path.resolve(__dirname, './comments.db'),
      autoload: true,
    })
    this.clientDb = new Datastore({
      filename: path.resolve(__dirname, './clients.db'),
      autoload: true,
    })
    this.githubRepoDb = new Datastore({
      filename: path.resolve(__dirname, './githubRepos.db'),
      autoload: true,
    })
    this.initGithubRepos()
  }

  // ===== 文章 =====

  // 获取指定标签或全部的文章
  getArticles = (tags = []) => new Promise((resolve, reject) => {
    this.articleDb.find(
      tags.length === 0 ? {} : {tags},
      (err, articleDoc) => {
        err && reject(err)
        resolve(articleDoc)
      }
    )
  })
  // 获取指定 _id 的文章
  getArticle = _id => new Promise((resolve, reject) => {
    this.articleDb.findOne(
      {_id},
      (err, articleDoc) => {
        err && reject(err)
        resolve(articleDoc)
      }
    )
  })
  // 新建或更新文章
  saveArticle = params => new Promise((resolve, reject) => {
    const {_id, ...articleFields} = params
    const validateError = validateArticleDoc(articleFields)
    if (validateError) {
      reject(validateError)
      return
    }
    this.getArticle(_id)
      .then(articleDoc => {
        if (articleDoc === null) {
          this.articleDb.insert(
            {...articleFields},
            (err, articleDoc) => {
              err && reject(err)
              resolve(articleDoc)
            }
          )
        } else {
          this.articleDb.update(
            articleDoc,
            {...articleFields},
            {},
            (err, numAffected, articleDoc) => {
              // console.log('?', err, numAffected, articleDoc)
              err && reject(err)
              resolve(numAffected)
            }
          )
        }
      })
      .catch(err => {
        reject(err)
      })
  })
  // 删除指定 _id 的文章; 删除其下所有评论
  deleteArticle = _id => new Promise((resolve, reject) => {
    this.articleDb.remove(
      {_id},
      (err, articleDoc) => {
        err && reject(err)
        this.commentDb.remove(
          {articleId: _id},
          (err, articleDoc) => {
            err && reject(err)
            resolve(true)
          }
        )
      }
    )
  })

  // ===== 文件服务 =====

  // upload =

  // ===== 赞 =====

  // 点赞
  likeArticle = (params = {}) => new Promise((resolve, reject) => {
    const {
      articleId = '',
      clientId,
    } = params
    if (!/^\d+$/.test(clientId)) {
      reject('缺少客户端 id')
      return
    }
    this.getArticle(articleId)
      .then(articleDoc => {
        if (articleDoc === null) {
          reject('未找到目标文章')
        } else {
          const likedBy = articleDoc.likedBy || []
          const targetClientIndex = likedBy.findIndex(clientId)
          if (targetClientIndex > -1) {
            reject('已经赞过啦')
          }
          likedBy.push(clientId)
          this.articleDb.update(
            articleDoc,
            {
              $set: {likedBy}
            },
            {},
            (err, articleDoc) => {
              err && reject(err)
              resolve(articleDoc)
            }
          )
        }
      })
  })
  // 取消点赞
  cancelLikeArticle = (params = {}) => new Promise((resolve, reject) => {
    const {
      articleId = '',
      clientId,
    } = params
    if (!/^\d+$/.test(clientId)) {
      reject('缺少客户端 id')
      return
    }
    this.getArticle(articleId)
      .then(articleDoc => {
        if (articleDoc === null) {
          reject('未找到目标文章')
        } else {
          const likedBy = articleDoc.likedBy || []
          const targetClientIndex = likedBy.findIndex(clientId)
          if (targetClientIndex > -1) {
            likedBy.splice(targetClientIndex, 1)
          }
          this.articleDb.update(
            articleDoc,
            {
              $set: {likedBy}
            },
            {},
            (err, articleDoc) => {
              err && reject(err)
              resolve(articleDoc)
            }
          )
        }
      })
  })

  // ===== 评论 =====

  // 获取指定文章的评论
  getComments = (articleId = '') => new Promise((resolve, reject) => {
    this.commentDb.find(
      isValidString(articleId) ? {articleId} : {},
      (err, commentDoc) => {
        err && reject(err)
        resolve(commentDoc)
      }
    )
  })
  // 新建评论
  saveComment = params => new Promise((resolve, reject) => {
    const {_id, ...commentFields} = params
    const validateError = validateCommentDoc(commentFields)
    if (validateError) {
      reject(validateError)
      return
    }
    this.commentDb.insert(
      {
        ...commentFields,
        createDate: new Date().valueOf()
      },
      (err, commentDoc) => {
        err && reject(err)
        resolve(commentDoc)
      }
    )
  })
  // 删除评论
  deleteComment = _id => new Promise((resolve, reject) => {
    this.commentDb.remove(
      {id},
      (err, commentDoc) => {
        err && reject(err)
        resolve(true)
      }
    )
  })

  // ===== 仓库 =====

  initGithubRepos = () => {
    this.githubRepoDb.findOne({type: 'main'}, (err, repoDoc) => {
      if (repoDoc !== null) {
        return
      }
      this.githubRepoDb.insert({
        type: 'main',
        repoDetail: null,
        updated: new Date().valueOf(),
      })
    })
  }

  // 10 分钟过期
  REPO_DATA_EXPIRE_TIME = 10 * 60 * 1000

  // 获取指定文章的评论, 从库中或 github api
  getGithubRepos = () => new Promise((resolve, reject) => {
    const nowDate = new Date().valueOf()
    this.githubRepoDb.findOne(
      {type: 'main'},
      (err, repoDoc) => {
        err && reject(err)
        if (
          repoDoc.repoDetail === null
          || (nowDate - repoDoc.updated >= this.REPO_DATA_EXPIRE_TIME)
        ) {
          // 未初始化或已过期, 请求
          request(
            {
              url: GET_GITHUB_REPOS,
              headers: {
                'User-Agent': 'rhaego-server'
              }
            },
            (error, response, body) => {
              if (!error) {
                this.githubRepoDb.update(
                  {type: 'main'},
                  {
                    $set: {
                      repoDetail: body,
                      updated: nowDate,
                    }
                  },
                  (err, repoDoc) => {
                    resolve(repoDoc)
                  }
                )
              }
            }
          )
        } else {
          // 否则使用库中的
          resolve(repoDoc)
        }
      }
    )
  })

}


module.exports = new RhaegoDb()