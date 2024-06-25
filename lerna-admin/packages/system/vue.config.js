const { name } = require('./package.json');

module.exports = {
	publicPath: './',
	productionSourceMap: false,
	configureWebpack: {
		output: {
			library: `${name}-[name]`,
			libraryTarget: 'umd', // 把微应用打包成 umd 库格式
			jsonpFunction: `webpackJsonp_${name}`,
		},
		devtool: false,
		plugins: [],
	},
	devServer: {
		port: 7001,
		disableHostCheck: true,
		headers: { 'Access-Control-Allow-Origin': '*' },
	},
	lintOnSave: false,
};
