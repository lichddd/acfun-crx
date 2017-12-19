'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const glob = require('glob')
// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

let entryarr=glob.sync(path.resolve("src/entry/**/*.js"));
let entrys=[];
console.log(entryarr);
entryarr.forEach((en)=>{
  entrys.push(new HtmlWebpackPlugin({
      filename: `${path.relative(path.resolve("src/entry/"),en).replace(".js","")}.html`,
      template: 'index.html',
      inject: true,
      chunks:[path.relative(path.resolve("src/entry/"),en).replace(".js","")]
    }));

});


module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    ...entrys,
    new FriendlyErrorsPlugin()
  ]
})
