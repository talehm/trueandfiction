const path = require('path');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader'); // For Vue 2

module.exports = {
	entry: path.resolve(__dirname, 'src/app.js'),
	mode: 'development',
	devServer: {
		hot: true,
		headers: { 'Access-Control-Allow-Origin': '*' }
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		publicPath: 'http://localhost:8080/',
		filename: 'vue-wordpress.js'
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/, // Font file extensions
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]', // Preserve original file name and extension
							outputPath: 'fonts/',  // Output directory for fonts
						},
					},
				],
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader'
				]
			},
			{
				test: /\.less$/,
				use: [
					'style-loader',
					'css-loader',
					'less-loader'
				]
			},
			{
				test: /\.s(c|a)ss$/,
				use: [
					'style-loader',
					'css-loader',
					'sass-loader'
				]
			}
		]
	},
	plugins: [
		new VueLoaderPlugin(),
		new webpack.HotModuleReplacementPlugin()
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src')
		},
		extensions: ['*', '.js', '.vue', '.json']
	}
};
