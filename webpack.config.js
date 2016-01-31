var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

module.exports = {
	devtool: 'inline-source-map',
	entry: [
		'webpack-hot-middleware/client?reload=true',
		path.resolve(__dirname, 'src/main.jsx')
	],
	output: {
		path: path.resolve(__dirname, 'dist'),
    filename: '[name]-[hash].js',
    publicPath: '/'
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './index.html'
		}),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
	],
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loaders: ['eslint-loader'],
        exclude: /node_modules/
      }
    ],
    loaders: [
      { test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
	resolve: {
		extensions: ['','.json','.js','.jsx']
	}
};
