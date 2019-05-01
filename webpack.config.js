const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: "development",
  // @see 开启会在 .js 中生成source-map, 生成环境不需要使用.
  // devtool: "inline-source-map",
  entry: "./src/index.ts",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, 'dist'),
    // library: 'jsUtilsHelper',
    // libraryTarget: 'umd'
  },
  // devServer: {
  //   contentBase: path.resolve(__dirname, 'dist'),
  //   hot: true
  // },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: [".ts", ".tsx", ".js"]
  },
  plugins: [
    new CleanWebpackPlugin(),
    // new htmlWebpackPlugin({
    //   filename:'index.html',
    //   template:'./src/index.html'//模板路径
    // }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // new BundleAnalyzerPlugin()
  ],
  optimization: {
    // @see https://webpack.js.org/plugins/uglifyjs-webpack-plugin
    minimizer: [new UglifyJsPlugin()],
  },
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.tsx?$/, loader: "ts-loader" }
    ]
  }
};