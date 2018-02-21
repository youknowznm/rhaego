import marked from 'marked'
import {formatDate} from '../../utils'
import {
  UPDATE_TITLE_FIELD,
  UPDATE_SUMMARY_FIELD,
  UPDATE_CONTENT_FIELD,
  UPDATE_CREATED_DATE_FIELD,

  ADD_TAG,
  REMOVE_TAG,
  ADJUST_TAG_INPUT_INDENT,
  PREVIEW_CONTENT,
} from './actionTypes'

const defaultState = {
  articleFields: {
    id: '',
    title: {
      value: '1',
      error: false,
    },
    tags: {
      value: ['react', 'express'],
      // value: [],
      error: false,
    },
    summary: {
      value: '2',
      error: false,
    },
    createdDate: {
      value: formatDate(new Date()),
      error: false,
    },
    content: {
      value: `# 教育经历
- **首都师范大学／本科／英语语言文学** *2010 - 2014*
# h1
## h2

paragraph

> 熟悉 Node.js 和 Express 框架熟悉 Node.js 和 Express 框架熟悉 Node.js 和 Express 框架熟悉 Node.js 和 Express 框架熟悉 Node.js 和 Express 框架熟悉 Node.js 和 Express 框架

\`code\`

\`\`\`javascript

import SyntaxHighlighter from 'react-syntax-highlighter/prism';
import { dark } from 'react-syntax-highlighter/styles/prism';
const Component = () => {
  const codeString = '(num) => num + 1';
  return <SyntaxHighlighter language='javascript' style={dark}>{codeString}</SyntaxHighlighter>;  
}
\`\`\`

# 个人技能
- **后端**
  - 熟悉 Node.js 和 Express 框架
  - 能通过 Mongoose ODM 进行 MongoDB 的常用操作
- **其它**
  - 熟悉 Git 的常用操作
  - 熟悉 macOS 下的开发
  - 英语专业八级

# 工作经历

## **国美互联网／前端开发** *2016.12 至今*
1. 创新型社交电商网站 Gomeplus
  - 主要负责该项目 PC 站的维护和迭代
  - 使用 Gulp + SCSS 编写样式以提高开发效率
  - 使用 jQuery 库，通过 Webpack + ES6 实现模块化
2. 面向海外市场的电商应用
  - 主要负责该项目手机站及原生应用内嵌页的开发和维护


## **留彼工坊／前端开发** *2015.03 - 2016.12*
1. 留彼工坊是一个面向英国留学生群体的短租服务应用
  - 主要负责房源搜索结果、个人档案、订购流程等页面的样式和逻辑的实现
  - 在不同尺寸和设备的浏览器内精确还原设计图的视觉和交互效果
  - 对部分旧脚本进行了模块化处理，对站点的大部分旧样式进行了重构，便于团队后续的开发和维护
  - 使用 jQuery + Bootstrap 编写前端，同时维护部分后端的 PyJade 模板</a>

# 开源项目

## *[Rhaego](https://github.com/youknowznm/rhaego)*
- Material Design 风格的 Node.js 博客系统
- 未使用任何非原创的样式库、登录方案或评论组件
- 基于 Express 框架和 [jQueryMaterial.js](https://github.com/youknowznm/jQueryMaterial.js)（我的另一个项目）
- 线上地址在[这里](http://140.143.188.149/)

## *[jqueryMaterial.js](https://github.com/youknowznm/jQueryMaterial.js)*
- Material Design 风格的 jQuery 组件库，适用于桌面端和移动端的快速建站
- 交互行为和样式参考了若干 Google 的设计相关站点
- 包含：页头、背景生成器、按钮、输入框、对话框、单选组、标签组、页脚和富文本编辑器
- 使用 Webpack + ES6 模块化图片、样式和脚本
- Demo 地址在[这里](https://youknowznm.github.io/demos/jquery-material)


`,
      error: false,
    },
  },
  tagsWidth: 0,
  parsedHTMLContent: '',
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case UPDATE_TITLE_FIELD:
      let fields_1 = state.articleFields
      fields_1.title.value = action.newValue
      return {
        ...state,
        articleFields: fields_1,
      }
    case UPDATE_SUMMARY_FIELD:
      let fields_2 = state.articleFields
      fields_2.summary.value = action.newValue
      return {
        ...state,
        articleFields: fields_2,
      }
    case UPDATE_CREATED_DATE_FIELD:
      let fields_3 = state.articleFields
      fields_3.createdDate.value = action.newValue
      return {
        ...state,
        articleFields: fields_3,
      }
    case UPDATE_CONTENT_FIELD:
      let fields_4 = state.articleFields
      fields_4.content.value = action.newValue
      let parsedHTMLContent = marked(action.newValue)
      return {
        ...state,
        articleFields: fields_4,
        parsedHTMLContent,
      }

    case ADD_TAG:
      let tags_1 = state.articleFields.tags
      tags_1.value.push(action.tagContent)
      return {
        ...state,
        tags: tags_1,
      };
    case REMOVE_TAG:
      let tags_2 = state.articleFields.tags
      tags_2.value.splice(action.tagIndex, 1)
      return {
        ...state,
        tags: tags_2,
      };
    case ADJUST_TAG_INPUT_INDENT:
      let tagsWidth = getComputedStyle(document.querySelector('.tags-container')).width
      document.querySelector('.editor-tags-input > input').style['text-indent'] = tagsWidth
      return {
        ...state,
        tagsWidth,
      }

    default:
      return state;
  }
}
