# Rhaego

个人开发和设计, 基于 react + koa, 开箱即用的 Material Design 风格博客系统.  
基于嵌入式数据库 NeDB.  
未使用任何组件库 / 样式库 / 动画库.

### 功能

- 响应式布局的单页应用
- [Material Design](https://material.io/) 风格
- 访客无需注册即可对文章点赞和评论
- 编辑文章时, 粘贴上传剪贴板的图片内容
- 编辑文章时, 实时预览 markdown 
- 按文章的类别标签筛选展示
- 阅读文章时展示索引
- 根据配置展示 GitHub 仓库, 社交资料和个人简历

### 技术要点

- **未使用任何组件库 / 样式库 / 动画库**
- 交互和样式设计参考 [Google Design 旧站](https://web.archive.org/web/20170516175305/https://design.google.com), [AngularJS Material](https://material.angularjs.org/latest/), [Google 开发者](https://developer.chrome.com/) 等站点
- 依赖尽可能少的前端工具库
- 基于嵌入式数据库 [NeDB](https://github.com/louischatriot/nedb), 即插即用
- 根据真实客户端 IP 限制访客的有效请求次数

### 使用姿势

#### 1. 服务器需求

- 较新的 LTS 版本 nodejs
  - 支持类的箭头方法即可, 亲测`14.16.0`可用
- 全局安装 [PM2](https://www.npmjs.com/package/pm2)
- nginx 关键配置:
  ```nginx
  http {
    server {
      location / {
  
        # 反向代理至 koa 服务
        proxy_pass http://localhost:4000;
   
        # 提供 koa 真实的客户端 IP, 而不是反向代理的
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  
      }
    }
  }
  ```

#### 2. 部署

- fork 此仓库
- 在 `config.js` 按需配置站点信息
- 克隆至远端服务器
- `npm run deploy`
- 在远端 `backend/secret.json` 配置管理员账户和 koa 秘钥
- Ready to roll!

### 二次开发

- fork 此仓库
- 克隆至本地
- 全局安装 [nodemon](https://www.npmjs.com/package/nodemon)
- `npm run setup`
- `npm run server` 启动后端
- `npm run dev` 启动前端开发环境

### What is Rhaego?

**Rhaego (雷戈)** 是小说冰与火之歌中丹妮莉丝·坦格利安与卓戈卡奥之子的名字.

> 「至于卓戈之子雷戈，骑着世界的骏马，我也要送他一件礼物。我要送他那张他母亲的父亲坐过的铁椅子，我要送他七大王国。我，卓戈，卡奥，要做这件事。」他的音量渐高，举起拳头对天呼喊，「我要带着我的卡拉萨向西走到世界尽头，骑着木马横渡黑色咸水，做出古往今来其他卡奥都从来没有做过的事。我要杀死穿铁衣服的人，拆了他们的石头房子。我要强奸他们的女人，抓他们的小孩来做奴隶，把他们无用的神像带回维斯·多斯拉克，向圣母山行礼。我，拔尔勃之子卓戈在此发誓，在圣母山前发誓，以天上群星为证。」  
> 
> _《冰与火之歌 · 卷一 · 权力的游戏》_

> And to Rhaego son of Drogo, the stallion who will mount the world, to him I also pledge a gift. To him I will give this iron chair his mother's father sat in. I will give him Seven Kingdoms. I, Drogo, khal, will do this thing. I will take my khalasar west to where the world ends, and ride the wooden horses across the black salt water as no khal has done before. I will kill the men in the iron suits and tear down their stone houses. I will rape their women, take their children as slaves, and bring their broken gods back to Vaes Dothrak to bow down before the Mother of Mountains, as the stars look down to witness.
> 
> _A Game of Thrones_
