import React from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import {atomOneDark} from 'react-syntax-highlighter/styles/hljs'
import ReactDOMServer from 'react-dom/server'

// 处理 ReactDOMServer.renderToString 得到的 html
const getHighlightedHTML = (str) => {
	return str.replace(/&amp;/g, '&')
		.replace(/^<pre.*>/, '<code>')
		.replace(/<\/pre>$/, '</code>')
}

// 把指定区域的 pre 标签内容替换为 SyntaxHighlighter 高亮过的 html
const highlightAllPre = (selector) => {
  const preArr = document.querySelector(selector).getElementsByTagName('pre')
  Array.prototype.forEach.call(preArr, ((preEle) => {
    const codeEle = preEle.querySelector('code')
    const highlightedJSX = (
      <SyntaxHighlighter language="javascript" style={atomOneDark}>
        {codeEle.innerHTML}
      </SyntaxHighlighter>
    )
    codeEle.innerHTML = getHighlightedHTML(ReactDOMServer.renderToString(highlightedJSX))
  }))
}

export default highlightAllPre
