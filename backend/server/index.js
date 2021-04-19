const Koa = require('koa')
const path = require('path')
const fs = require('fs')

const db = require('../data')

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