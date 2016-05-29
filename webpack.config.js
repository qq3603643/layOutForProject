var path = require('path'),
    srcJsPath = path.resolve(__dirname,'src/js'),
    webpack = require('webpack'),
    //文件分离打包
    ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  //入口
  entry: {
    'one': path.resolve(srcJsPath,'1.js'),
    'two': path.resolve(srcJsPath,'two.js'),
    'three': path.resolve(srcJsPath,'three.js'),
    'jq-es': path.resolve(srcJsPath,'jq-es.js')
  },
  //出口
  output: {
    path: path.resolve(__dirname,'bulid'),
    //下面的js，css的输出路径会在此的基础上
    publicPath: path.resolve(__dirname,'bulid'),
    filename: "js/[name].min.js?[hash]"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: [/node_modules/,/plugins/],
        loader:'babel',
        query: {
          presets: ['es2015']
        },
      },
      {
        test: /.css$/,
        //-url可以保持原来css文件内地的url地址原样
        loader:  ExtractTextPlugin.extract("style-loader","css-loader?-url",'autoprefixer-loader')
      },
      { test: /\.(png|jpg)$/,
        loader: "file-loader?name=pics/[name].[ext]" 
      }
    ]
  },
  resolve: {
    root: [],
    alias: {
      'jquery': path.join(__dirname,'plugins/jquery/jquery.js')
    }
  },
  plugins: [
        //删除重复
        new webpack.optimize.DedupePlugin(),
        //压缩代码
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false
          }
        }),
        new webpack.NoErrorsPlugin(),
        //分离css（这里面的路径是在output的基础上设置的）
        new ExtractTextPlugin('/css/[name].min.css?[hash]'),
        //直接从/node_modules/中提取的js，可在全局js中直接使用，用npm install *** 安装在此目录下
        new webpack.ProvidePlugin({
          '$':'jquery',
          'jQuery':'jquery',
          'window.jQuery':'jquery'
        }),
    ],
  watch: !0
}