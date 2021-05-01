const fs = require('fs')
const path = require('path')
const Datastore = require('nedb')
const request = require('request')
const {DEFAULT_DAILY_ATTEMPTS} = require("../utils")
const {GET_GITHUB_REPOS} = require("../api")

// 入参校验一律在路由层, 这里直接入库
class RhaegoDb {

  init = () => {
    this.articleDb = new Datastore({
      filename: path.resolve(__dirname, './articles.db'),
      autoload: true,
    })
    this.clientDb = new Datastore({
      filename: path.resolve(__dirname, './clients.db'),
      autoload: true,
    })
    this.resetAllClientDailyAttempts()
    this.REPO_DATA_EXPIRE_TIME = 10 * 60 * 1000
    this.reposJsonPath = path.resolve(__dirname, './github-repos.json')
    this.initGithubReposJson()
  }

  initGithubReposJson = () => {
    try {
      fs.readFileSync(this.reposJsonPath, 'utf8')
    } catch (e) {
      fs.writeFileSync(this.reposJsonPath, JSON.stringify({
        repos: null,
        updated: new Date().valueOf(),
      }))
    }
  }

  // 获取 github 仓库信息, 从库中或 github api
  getGithubRepos = () => new Promise((resolve, reject) => {
    const now = new Date().valueOf()
    const localData = JSON.parse(fs.readFileSync(this.reposJsonPath, 'utf8'))
    if (
      localData.repos === null
      || now - localData.updated >= this.REPO_DATA_EXPIRE_TIME
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
            fs.writeFileSync(this.reposJsonPath, JSON.stringify({
              repos: body,
              updated: now,
            }))
            resolve(body)
          }
        }
      )
    } else {
      // 否则使用库中的
      resolve(localData.repos)
    }
  })

  // ===== 笔记 =====

  // 获取指定标签或全部的笔记
  getArticles = tag => new Promise((resolve, reject) => {
    this.articleDb.find(
      {},
      (err, docs) => {
        err && reject(err)
        if (tag === '') {
          resolve(docs)
        } else {
          const filtered = docs.filter(item => {
            return item.tagsText
              .split(/\s*#/)
              .filter(item => item !== '')
              .indexOf(tag) > -1
          })
          resolve(filtered)
        }
      }
    )
  })
  // 获取笔记
  getArticle = articleId => new Promise((resolve, reject) => {
    this.articleDb.findOne(
      {articleId},
      (err, articleDoc) => {
        err && reject(err)
        resolve(articleDoc)
      }
    )
  })
  // 新建或更新笔记
  saveArticle = articleFields => new Promise((resolve, reject) => {
    this.getArticle(articleFields.articleId)
      .then(articleDoc => {
        if (articleDoc === null) {
          this.articleDb.insert(
            {
              ...articleFields,
            },
            (err, articleDoc) => {
              err && reject(err)
              resolve(articleDoc)
            }
          )
        } else {
          this.articleDb.update(
            articleDoc,
            {
              ...articleFields
            },
            {
              returnUpdatedDocs: true
            },
            (err, numAffected, articleDoc) => {
              err && reject(err)
              resolve(articleDoc)
            }
          )
        }
      })
      .catch(err => {
        reject(err)
      })
  })
  // 删除笔记
  deleteArticle = articleId => new Promise((resolve, reject) => {
    this.articleDb.remove(
      {articleId},
      (err, articleDoc) => {
        resolve(true)
      }
    )
  })

  // ===== 用户 =====

  // 获取指定设备号的用户
  getClient = (clientIp = '') => new Promise((resolve, reject) => {
    this.clientDb.findOne(
      {clientIp},
      (err, clientDoc) => {
        err && reject(err)
        resolve(clientDoc)
      }
    )
  })
  // 新建或更新用户
  saveClient = params => new Promise((resolve, reject) => {
    const {
      clientIp,
      ...otherParams
    } = params
    this.getClient(clientIp)
      .then(clientDoc => {
        if (clientDoc === null) {
          this.clientDb.insert(
            {...params},
            (err, articleDoc) => {
              err && reject(err)
              resolve(articleDoc)
            }
          )
        } else {
          this.clientDb.update(
            {clientIp},
            {
              $set: {...otherParams}
            },
            {
              returnUpdatedDocs: true
            },
            (err, numAffected, doc) => {
              err && reject(err)
              resolve(doc)
            }
          )
        }
      })
      .catch(err => {
        reject(err)
      })
  })
  // 所有访客
  getVisitors = () => new Promise((resolve, reject) => {
    this.clientDb.find({}, (err, allClients)=>{
      err && reject(err)
      resolve(allClients)
    })
  })
  // 所有访客的访问次数和
  getVisitCount = () => new Promise((resolve, reject) => {
    this.clientDb.find({}, (err, allClients)=>{
      err && reject(err)
      resolve(
        allClients.reduce((prev, curr) => {
          return prev + curr.visitCount
        }, 0)
      )
    })
  })
  // 修改访客单每日尝试次数
  setClientDailyAttempt = (clientIp, updateType) => new Promise((resolve, reject) => {
    this.getClient(clientIp)
      .then(doc => {
        let currDailyAttempts = doc.dailyAttempts
        switch (updateType) {
          case 'decrease':
            currDailyAttempts -= 1
            break
          case 'increase':
            currDailyAttempts += 1
            break
          case 'reset':
            currDailyAttempts = DEFAULT_DAILY_ATTEMPTS
            break
        }
        this.saveClient({
          clientIp,
          dailyAttempts: currDailyAttempts
        })
          .then(doc => {
            resolve(doc)
          })
          .catch(err => {
            reject(err)
          })
      })
      .catch(err => {
        reject(err)
      })
  })
  // 十分钟检查一次, 到第二天就重置所有访客的每日尝试次数
  resetAllClientDailyAttempts = () => {
    let prevDay = new Date().getDay()
    setInterval(() => {
      let nowDay = new Date().getDay()
      if (nowDay !== prevDay) {
        // 一天过去了
        this.clientDb.update(
          {},
          {
            $set: {
              dailyAttempts: DEFAULT_DAILY_ATTEMPTS
            }
          },
          {
            returnUpdatedDocs: true,
            multi: true,
          },
          (err, numAffected, docs) => {
            err && console.log(err)
            console.log(docs)
            // resolve(docs)
          }
        )
      }
      prevDay = nowDay
    }, 10 * 60 * 1000)
  }

  // ===== 赞 =====

  // 点赞
  toggleLikeArticle = (params = {}) => new Promise((resolve, reject) => {
    const {
      articleId = '',
      clientIp,
    } = params
    this.getArticle(articleId)
      .then(articleDoc => {
        if (articleDoc === null) {
          reject('未找到目标笔记')
        } else {
          let likedBy = articleDoc.likedBy.slice()
          const targetClientIndex = likedBy.findIndex(item => item === clientIp)
          let message
          if (targetClientIndex > -1) {
            likedBy.splice(targetClientIndex, 1)
            message = '已取消赞'
          } else {
            likedBy.push(clientIp)
            message = '已赞'
            // 产生一次'赞', 消耗一次每日尝试次数
            this.setClientDailyAttempt(clientIp, 'decrease')
          }
          this.articleDb.update(
            articleDoc,
            {
              $set: {likedBy}
            },
            {
              returnUpdatedDocs: true
            },
            (err, na, articleDoc) => {
              err && reject(err)
              resolve(message)
            }
          )
        }
      })
  })

  // ===== 评论 =====

  // 获取指定笔记的评论
  getComments = (articleId = '') => new Promise((resolve, reject) => {
    this.getArticle(articleId)
      .then(articleDoc => {
        if (!articleDoc) {
          resolve([])
        } else {
          resolve(articleDoc.comments.sort((prev, curr) => {
            return -(prev.createDate - curr.createDate)
          }))
        }
      })
      .catch(err => {
        reject(err)
      })
  })
  // 新建评论
  saveComment = params => new Promise((resolve, reject) => {
    const {
      // commentId,
      clientIp,
      articleId,
      // commentAuthor,
      // commentEmail,
      // commentContent,
    } = params
    this.getArticle(articleId)
      .then(articleDoc => {
        if (articleDoc === null) {
          reject('未找到目标笔记')
        } else {
          let comments = articleDoc.comments.slice()
          comments.push(params)
          // 发布一个评论, 消耗一次每日尝试次数
          this.setClientDailyAttempt(clientIp, 'decrease')
          this.articleDb.update(
            articleDoc,
            {
              $set: {comments}
            },
            {
              returnUpdatedDocs: true
            },
            (err, na, articleDoc) => {
              err && reject(err)
              resolve(articleDoc)
            }
          )
        }
      })
  })
  // 删除评论
  deleteComment = params => new Promise((resolve, reject) => {
    const {
      articleId,
      commentId,
    } = params
    this.getArticle(articleId)
      .then(articleDoc => {
        if (articleDoc === null) {
          reject('未找到目标笔记')
        } else {
          let comments = articleDoc.comments.slice()
          const targetCommentIndex = comments.findIndex(item => item.commentId === commentId)
          comments.splice(targetCommentIndex, 1)
          this.articleDb.update(
            articleDoc,
            {
              $set: {comments}
            },
            {
              returnUpdatedDocs: true
            },
            (err, na, articleDoc) => {
              err && reject(err)
              resolve(articleDoc)
            }
          )
        }
      })
  })

}

module.exports = new RhaegoDb()