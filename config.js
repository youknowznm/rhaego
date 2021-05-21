// 展示于 header 横幅的默认标题
const bannerDefaultTitle = 'you know znm'

// 站点名, 用于页面 title
const siteName = 'youknowznm'

// github 用户名, 用于获取仓库列表
const githubUsername = 'youknowznm'

// 社交相关, 在 footer 展示, 按需增减
const email = 'znm92@icloud.com'
const zhihu = 'https://www.zhihu.com/people/youkonwznm'

// 是否在 header 导航展示简历链接
// 如不展示, 则需手动前往 `/about` 查看
const showResumeOnHeaderNav = true

// 笔记 markdown 代码的语言列表, 用以优化 hljs 的体积
const markdownCodeLanguages = ['javascript', 'scss', 'css', 'bash']

module.exports = {
 bannerDefaultTitle,
 siteName,
 githubUsername,
 email,
 zhihu,
 github: `https://github.com/${githubUsername}`,
 showResumeOnHeaderNav,
 markdownCodeLanguages,
}
