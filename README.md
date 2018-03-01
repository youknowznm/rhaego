# React Material BLog

**完全原创、独立完成** 的[个人站点](https://www.youknowznm.com/)的前端。

## 特点：

  - Material Design 风格，自适应于不同设备的浏览器
  - 可编辑和展示文章标题、摘要、内容、标签和创建日期，在编辑器内实时预览 Markdown 内容
  - 支持图片的上传和托管
  - 管理员可新建、修改文章，管理访客在文章下的评论
  - 访客无需注册即可对文章进行点赞、评论
  - 根据浏览器指纹控制访客在一定时间内的评论数
  - 支持按指定的标签类别展示文章
  - 根据配置的 GitHub 用户名展示作品
  - 展示后端提供的 Markdown 格式简历

## 技术栈：

前端：

  - 使用 [react-redux](https://github.com/reactjs/react-redux) 处理数据的渲染和单向流动
  - 使用 [redux-thunk](https://github.com/troch/react-thunk) 和 [redux-action-tools](https://github.com/kpaxqin/redux-action-tools) 处理异步 action
  - 使用 [material-ui](https://github.com/mui-org/material-ui) 组件库实现全部元素的 Material Design 风格
