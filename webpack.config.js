var path = require('path');
 var webpack = require('webpack');
     
 module.exports = {
     entry: './src/index.js',
     output: {
         path: __dirname + '/build/',
         filename: 'app.bundle.js'
     },
     module: {
         loaders: [
             {
                 test: /\.js$/,
				exclude:/(node_modules)/,
                 loader: 'babel-loader',
                 query: {
                     presets: ['es2015', 'react']
                 }
             },
			 {
				  test: /\.css$/,
				  loader:['style-loader','css-loader']
			 },
			 {
				  test: /\.less$/,
				  loader:['style-loader','css-loader','less-loader']
			 },
         ]
     },
     stats: {
         colors: true
     },
     devtool: 'source-map'
 };