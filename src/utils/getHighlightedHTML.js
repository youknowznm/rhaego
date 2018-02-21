// 处理 ReactDOMServer.renderToString 得到的 html 
const getHighlightedHTML = (str) => {
	var a = str.replace(/&amp;/g, '&')
		.replace(/^<pre.*>/, '<code>')
		.replace(/<\/pre>$/, '<\/code>')
	console.log(a)
	return a
}

module.exports = getHighlightedHTML
