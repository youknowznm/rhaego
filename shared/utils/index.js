const general = require('./general')
const ajax = require('./ajax')
const url = require('./url')
const dom = require('./dom')
const lodash = require('./lodash')
const date = require('./date')

module.exports = {
  ...general,
  ...dom,
  ...date,
  ...url,
  ...ajax,
  ...lodash,
}