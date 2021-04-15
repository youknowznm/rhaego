const Koa = require('koa')
const path = require('path')
const fs = require('fs')

const app = new Koa()

// app.use(async ctx => {
//   ctx.body = 'Hello World'
// })

// c.Header("Access-Control-Allow-Origin", "*")
// c.Header("Access-Control-Allow-Methods", "GET, POST")

const main = ctx => {
  ctx.response.type = 'json'
  ctx.response.body = {
    text: fs.readFileSync(path.resolve(__dirname, '../files/test.md'), 'utf-8')
  }

  ctx.response.set("Access-Control-Allow-Origin", "*")
  ctx.response.set("Access-Control-Allow-Methods", "GET, POST")
};

app.use(main);

app.listen(3000)

//

const NeDB = require('nedb')

const db = new NeDB({
  filename: path.resolve(__dirname, '../data/rhaego.db'),
  autoload: true,
})

// db.insert({
//   name: 'Alice',
//   age: 20
// }, function (err, doc) {
//   console.log(':', doc)
// })

db.find({
  name: 'Alice',
}, function(err, docs) {
  console.log('Alice found:', docs)
})
