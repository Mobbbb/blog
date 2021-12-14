module.exports = {
    presets: [
    	'@vue/cli-plugin-babel/preset'
  	],
  	plugins: [
		"@vue/babel-plugin-jsx", 
		[
			"prismjs", {
				"languages": ["javascript", "css", "markup", "nginx", "bash"],
				"plugins": ["line-numbers"],
				"theme": "solarizedlight", // default|coy|twillight|tomorrow|solarizedlight|okaidia|funky|dark
				"css": true
			}
		]
	]
}
