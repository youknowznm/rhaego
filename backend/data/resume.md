# white-space: pre-wrap;


# CSS 要点

- 动画
  - 用 chrome performance 查看性能
  - css 改变 margin / top 等, 造成回流, 而且占用了主线程 main
    - 有 js 阻塞, 会卡顿动画
    - js setInterval 控制 margin / top 等, 与此类似
  - css transform, 硬件加速, 体现在 GPU 线程上
    - 有 js 阻塞, 也不影响动画
    - 问题: 所有值都在一个 transform 属性内, 难以只修改指定的值
  - js `requestAnimationFrame`
    - 用一部分 GPU
    - 多个调用时, 把所有 dom 操作集中在一帧中, 在一次回流中完成, 紧跟设备刷新率
    - 非活跃的 tab 页会暂停
    - 也可用于大数据渲染(如大量列的 table)
    - 取消使用 cancelAnimationFrame
  - `Element.animate()` 兼容很差

### css module
- 用 webpack loader 实现
- 按配置的 localIdentName 转换 class 和 id, 保证不重复
- 扁平化, 无嵌套, 用 `composes` 复用

### 回流和重绘

- 回流（必定产生重绘）
  渲染树中的元素因尺寸、布局、显隐的改变重新构建，产生回流
  每页至少需一次回流（加载时）
  发生时，渲染树中受影响的部分（和后面的元素）被重新构造
  1. 调整窗口的大小
  2. 改变字体，如果用rem  设置了根目录的字体大小，这样就减少了回流的次数
  3. 增加或者移除样式表
  4. 内容的变化，用户在input中输入了文字（这是不可避免的）
  5. 激活CSS的伪类
  6. 操作class属性
  7. 基本操作DOM(包括js中的domcument等)
  8. 计算offsetWidth与offsetHeight 属性，获取元素在窗口中的位置
  9. 在html代码中直接设置 style 属性的值，这个降低了代码的利用率，还影响性能
- 重绘（不一定产生回流）
  渲染树中的元素更新不影响布局和尺寸的可见属性（background、visibility）等时，产生重绘
- 如何减少
  减少对渲染树的操作（合并多次多DOM和样式的修改）和对一些style值的请求
  1. 对尺寸、布局改动频繁的元素abosolute或fixed定位，使之脱离渲染树
  2. 样式表放在head标签中，脚本放在body结束前。
  3. 避免多次获取、操作dom节点
  4. 修改元素的class而不是直接操作样式
- 例子
  top/left是布局类的样式，这个样式的变化会导致回流 - 即指对这些节点以及受这些节点影响的其它节点，进行CSS计算->布局->重绘过程，这个过程的前2步是消耗大量资源的
  translate导致重绘- 即在屏幕上重新画一下，不会进行CSS计算和布局这2个性能大户，所以我们认为translate性能上要明显好于top/left

### `box-sizing` 决定一个元素 width 和 height 的计算方式

- content-box 标准的、默认的。只计算元素宽高，不包含内边距、边框、外边距
- padding-box 包含内容和内边距，不包含编剧和外边距（非标准，已废弃）
- border-box 包含内容、内边距、边框，不包括外边距（ie 怪异模式）

### 单行溢出省略号

```css
{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}
```

word-break ??

### 多行溢出省略号
```css
{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
}
```

## BFC 触发条件
- body 根元素
- 浮动元素：float 除 none 以外的值
- 绝对定位元素：position (absolute、fixed)
- display 为 inline-block、table-cells、flex
- overflow 除了 visible 以外的值 (hidden、auto、scroll)

## BFC 用处
- 为避免垂直外边距折叠，将两个 div 放在不同的 bfc 中
- 清除浮动。bfc 可包含浮动的元素
- bfc 阻止元素被浮动元素覆盖

### `flex` 弹性布局

容器元素：
- display: flex
- flex-direction: row | row-reverse | column | column-reverse 决定内部元素的主轴方向
- flex-wrap: nowrap | wrap | wrap-reverse 决定内部元素是否换行显示
- justify-content: center | start | end | left | right 决定内部元素在主轴方向的分布方式
- align-items: center | start | end | left | right | stretch 侧轴

内部元素：
- flex-basis 在主轴方向的初始大小
- flex-grow 主轴方向的扩大比例，默认0
- order 调整主轴上的显示顺序（不影响 dom 树的结构）

### 设置与包含框四边的距离**在非静态定位时**才有效。

### 高度一致且可随包含内容自适应的一行元素：
- 浮动定位，设置极大的负底外边距和同样大的正底内边距，并使包含框的溢出隐藏。

### 优先级
`important` > 行内 > id > class > [data-attr] > tag ； 行内 > style 标签 > style 引入

### 获取浏览器滚动条的宽度?
1. 放置溢出 body, 不可见的元素, 其 `overflow: scroll`
2. 计算 div.offsetWidth - div.clientWidth
3. 移除此元素
  - 即布局宽度(顾名思义, 含滚动条的) - 内容宽度

- - - -

### 判断元素是否滚动到底部

TODO: offsetTop 是啥?


元素滚动到底部时，它的 scrollHeight - scrollTop 等于 clientHeight。
- `scrollHeight` 只读的元素全部高度，包括overflow: hidden隐藏掉的部分
- `scrollTop` 元素顶部的滚动距离
- `clientHeight` 只读的元素内部的高度，不包括overflow: hidden隐藏掉的部分

### 左右两栏布局，左侧定宽，右侧随窗口大小缩放

	1. body flex，.left width 200px，.right flex-grow=1
	2. 两栏均float left，.left width 200px，.right宽度 calc(100% - 200px)
	3. 两栏均position absolute，.left width 200px; left 0，.right right 0; left 200px

### 三栏布局，左右定宽中间自适应

	1. 左右float 中间width calc（或设置左右margin）
	2. flex 中间 flex-grow 1
	3. absolute 中间设置left和right（或设置左右margin） 左边设left和width 右边设right和width

### 未知宽高元素的居中
- flex
- absolute t50% l50% translate(-50% -50%)
- b0 t0 l0 r0 absolute marginAuto
  - 一个绝对定位元素，其对立定位方向属性同时有具体定位数值的时候，流体特性就发生了
  - 流体元素两侧都是 auto，平分剩余空间

---

- 预编译
  - 用 sass等, 产生 css;
- postcss
  - 对产生的 css 进行处理:
    1. 添加前缀 Autoprefix (calc transition user-select 等)
    2. 移动端适配 postcss-px-to-viewport
    3. cssnano 去空格; 缩减体积;

- 移动端适配方案
  - css 像素: 指编辑代码时的像素; 相对的是物理像素, 高分屏的一个 css 像素等于多个物理像素.
  - 视口
    1. 布局视口 body.clientWidth, 默认远大于屏幕宽度
    2. 视觉视口 innerWidth,
    3. 理想视口 通过 meta viewport 定义; 一般设为取 device-width, 即设备宽度 screen.width (随 orientationChange 改变)
      - vw 相对于这个
  - 适配方案
    - rem:
      1. 设一个基准值(如 750px, ip6 宽度)
      2. 取得设备 screenWidth 与其之比例
      3. 设置 html fontsize 为 1/2 * 100
      4. 按设计稿还原时, 设置长度单位为 像素数/100 rem
      5. 问题: rem 是本质是根元素字体大小, 是描述字体的, 用它布局不合适; 手工换算很麻烦; 多个库可能不都以 750 作为基准;
    - 更健壮的 postcss-px-to-viewport:
      - 作为 postcss 的 plugin 使用, 转换 px 为 vw
      - 原理?
  - 高分屏的 1px 变宽问题
    - 原因: css 像素基于设备的 devicePixelRatio 被映射成了倍数的物理像素
    - 不好的方案:
      - scaleY(.5)
      - 说服 u 不要用 1px 设计
    - 好方案:
      - 动态设置 initial-scale 为 1 / window.devicePixelRatio 即可, 把 dpr 的倍数缩小回来

- innerHeight 视口宽高


- 懒加载
  - 图片很多时, 在滚动进入视口时, 替换 src 为 data-src 的内容
  - 何时进入视口? getBoundingClientRect 获取相对于视口的坐标, 比较 innerWH

- 预加载
  - preloadJS; 触发 onProgress 得到百分比

- 上传/下载进度? XHR.progress 事件监听; 上传可自动获取; 下载的话, 需要后端在响应头写 content-length

- jsbridge
  - 提供内嵌的页面 访问 native 的能力(hi 已封装)


### 折叠屏的适配

- UI 提供的背景图是 16:9 的, 前端按此比例填充, 更`瘦高`的屏幕底端以背景色填充.
- 没想到用户有折叠手机, 宽高比几乎 1:1 了, 此时就占不满全屏了
- 方案:
  1. 取得 背景图的宽高比;
  2. 再根据设备 innerHeight 计算出目标宽度;
  3. 目标宽度 / 100vw, 作为容器的新宽度;
  4. 给 body 缩放 100/目标宽度
  5. 基于容器 (新宽度 - 100 /2)vw 的 margin-left

### 问题

- 动画关键字和用法
- 文档流
- 重绘重排
- flex
- BFC
- IFC
- before/after
- keyframe
- 画三角
- 优先级矩阵
- 左图右文的布局
  - > 我自己总结过7种方案，其中比较好用的是基于BFC的，float的以及flex的三种