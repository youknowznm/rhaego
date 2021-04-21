const Koa = require('koa')
const path = require('path')
const fs = require('fs')

const db = require('../data')

//
// setTimeout(() => {
//   db.getGithubRepos().then(r => {
//     console.log(r)}
//   )
//
  db.getGithubRepos().then(r => {
    // console.log({r})
  })
//
// })



// db.saveArticle({
//   _id: 'pUlgHg3q3geS2Jhz',
//   title: 'sbasdf',
//   tags: ['af'],
//   content: '### 哈哈哈',
//   dateString: '2020-11-11'
// }).then(doc => {
//   console.log(111, doc)
// }).catch(e => {
//   console.log({e})
// })
//
// db.getArticles().then(r => {
//   console.log(r.length)
// })
//
//
// db.getComments('pUlgHg3q3geS2Jhz').then(cmt => {
//   console.log({cmt})
// }).catch(e => {
//   console.log(e)
// })
//
// db.saveComment({
//   articleId: 'pUlgHg3q3geS2Jhz',
//   clientId: 'pUlgHg3q3geS2Jhz',
//   author: '123f',
//   email: '123f@asdf.com',
//   dateInMs: new Date().valueOf().toString(),
//   content: 'sfd',
// }).catch(e => {
//   console.log(e)
// })
//
// // setTimeout(() => {
//   db.getComments('pUlgHg3q3geS2Jhz').then(cmt => {
//     console.log({cmt})
//   }).catch(e => {
//     console.log(e)
//   })
// // }, 100)

const app = new Koa()

const main = (ctx,next) => {
  ctx.response.set("Access-Control-Allow-Origin", "*")
  ctx.response.set("Access-Control-Allow-Methods", "GET, POST")
  ctx.response.type = 'html';
  next()
}

const one = (ctx, next) => {
  ctx.response.type = 'json'
  ctx.response.body = {
    text: fs.readFileSync(path.resolve(__dirname, '../files/test.md'), () => {}, 'utf8')
  }
}

app.use(main)
app.use(one);


app.listen(3000)


//


// const commentDataBase = new Datastore({
//   filename: path.resolve(__dirname, '../data/comment.DataBase'),
//   autoload: true,
// })

// DataBase.insert({
//   name: 'Alice',
//   age: 20
// }, function (err, doc) {
//   console.log(':', doc)
// })

// db.articles.find({
//   name: 'Alice',
// }, function(err, docs) {
//   console.log('Alice found:', docs)
// })


db.getArticles()