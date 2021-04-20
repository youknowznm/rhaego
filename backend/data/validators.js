// nedb 好像没有 Schema, 手动验证

const validateArticleDoc = fields => {
  const {
    title,
    tags,
    dateString,
    content
  } = fields
  let errMsg = ''
  switch (true) {
    case (!(/^.{5,40}$/.test(title))):
      errMsg = ('输入 20~40 字的标题')
      break
    case (
      !Array.isArray(tags)
      || tags.length > 3
      || tags.length < 1
    ):
      errMsg = ('输入 1~3 个#分隔的标签')
      break
    case (!(/^\d{4}-\d{2}-\d{2}$/.test(dateString))):
      errMsg = ('输入 YYYY-MM-DD 格式的发布日期')
      break
    case (!(/\S/.test(content))):
      errMsg = ('输入非空的文章内容')
      break
    default:
  }
  if (errMsg !== '') {
    return new Error(errMsg)
  }
  return null
}

const validateCommentDoc = fields => {
  const {
    articleId,
    clientId,
    author,
    email,
    content,
    createDate
  } = fields
  let errMsg = ''
  switch (true) {
    case (!(/\S/.test(articleId))):
      errMsg = ('缺少文章 id')
      break
    case (!(/\S/.test(clientId))):
      errMsg = ('缺少客户端 id')
      break
    case (!(/^.{4,16}$/.test(author))):
      errMsg = ('输入 4~16 字的称呼')
      break
    case (!(/^\w+@\w+\.\w+$/.test(email))):
      errMsg = ('输入合法的邮箱格式')
      break
    case (!(/^.{2,120}$/.test(content))):
      errMsg = ('输入 2~120 字符的评论')
      break
    // case (!(/^\d+$/.test(createDate))):
    //   errMsg = ('缺少合法的评论时间')
    //   break
    default:
  }
  if (errMsg !== '') {
    return new Error(errMsg)
  }
  return null
}

module.exports = {
  validateArticleDoc,
  validateCommentDoc,
}