const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

module.exports = {
	entry: {
		app: path.resolve(__dirname, 'src/app.js'), // Entry for your main app
	},
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
	  filename: '[name].[contenthash].js', // Use contenthash for better caching
	  chunkFilename: '[name].[contenthash].js', // File name for lazy-loaded chunks
  },
  module: {
	  rules: [
		  {
			  test: /\.(woff|woff2|eot|ttf|otf)$/, // Font file extensions
			  use: [
				  {
					  loader: 'file-loader',
					  options: {
						  name: '[name].[ext]', // Preserve original file name and extension
						  outputPath: 'fonts/', // Output directory for fonts
					  },
				  },
			  ],
		  },
		  {
			  test: /\.less$/,
			  use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'], // Using MiniCssExtractPlugin for CSS extraction
		  },
      {
        test: /\.s(c|a)ss$/,
		  use: [
			  MiniCssExtractPlugin.loader, // Use MiniCssExtractPlugin for extracting CSS
			  'css-loader',
			  {
				  loader: 'sass-loader',
				  options: {
					  implementation: require('sass'),
					  sassOptions: {
						  indentedSyntax: true, // optional
					  },
				  },
			  },
		  ],
      },
      {
        test: /\.vue$/,
		  loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
		  exclude: /node_modules/,
      },
      {
        test: /\.css$/,
			  use: ['style-loader', // Add style-loader or vue-style-loader for Vue
				  'css-loader',]
		  },
	  ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
		filename: '[name].[contenthash].css', // Extracted CSS chunk with contenthash for caching
		chunkFilename: '[id].[contenthash].css', // Extracted CSS chunk for non-entry points
	}),
	  new WebpackManifestPlugin({
		  fileName: 'manifest.json', // Generate manifest.json file
		  publicPath: '/', // Specify the public path to assets
	  }),
  ],
  resolve: {
    alias: {
			'@': path.resolve(__dirname, './src'),
		},
		extensions: ['*', '.js', '.vue', '.json'],
	},
	optimization: {
		splitChunks: {
			chunks: 'all', // Split both dynamic and initial chunks
			minSize: 20000, // Only chunks over 20KB will be split
			maxSize: 50000, // Limit chunk size to 50KB if needed
			cacheGroups: {
				vendors: {
					test: /[\\/]node_modules[\\/]/,  // Vendor libraries in separate chunk
					name: 'vendors',
					chunks: 'all',
				},
				default: {
					minChunks: 2,  // At least 2 chunks should share the module
					priority: -20,
					reuseExistingChunk: true,
				},
			},
		},
		runtimeChunk: 'single',  // Create a separate runtime chunk for better caching
	},
};
