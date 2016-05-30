var path = require('path'),
    srcJsPath = path.resolve(__dirname,'src/js'),
    webpack = require('webpack'),
    //文件分离打包
    ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  //入口
  entry: {
    // 'one': path.resolve(srcJsPath,'1.js'),
    'two': [path.resolve(srcJsPath,'two.js')],
    // 'three': path.resolve(srcJsPath,'three.js'),
    // 'jq-es': path.resolve(srcJsPath,'jq-es.js'),
    // 'drag': path.resolve(srcJsPath,'drag.js')
  },
  //出口
  output: {
   //下面的js，css的输出路径(为文件保存路径)会在此的基础上
    path: path.resolve(__dirname,'bulid'),
   //目前发现的作用是设置css里面的url路径相关的位置(为url路径)暂时理解为加在文件保存路径前面的东东
    publicPath: '../',
    filename: "js/[name].min.js?[hash]"
  },
  //加载器
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
        //-url可以保持原来css文件内地的url地址原样(css-loader-url)
        loader:  ExtractTextPlugin.extract("style-loader","css-loader",'postcss-loader')
      },
      { 
        test: /\.(jpg|png|jpeg)$/,
        //小于8172b的将压缩成base64格式大于则保存至output下的path下的制定目录
        loader: "url-loader?limit=8172&name=pics/[name].[ext]"
      },
    ]
  },
  resolve: {

    extensions: ['','.js','.css','.png','.jpg','.jpeg'],
    alias: {
      //设置一些快捷的路径 在js中require时便于使用
      'jquery': path.join(__dirname,'plugins/jquery/jquery.js'),
      'js': path.join(__dirname,'src/js')
    }
  },
  //插件
  plugins: [
        //删除重复
        new webpack.optimize.DedupePlugin(),
        //压缩代码 开发环境时可不开启（便于查看源码）
        // new webpack.optimize.UglifyJsPlugin({
        //   compress: {
        //     warnings: false
        //   }
        // }),
        //分离css（这里面的路径是在output的path基础上设置的）
        new ExtractTextPlugin('css/[name].min.css?[hash]'),
        //直接从/node_modules/中提取的js，可在全局js中直接使用，用npm install *** 安装在此目录下
        new webpack.ProvidePlugin({
          '$':'jquery',
          'jQuery':'jquery',
          'window.jQuery':'jquery'
        }),
        new webpack.NoErrorsPlugin()
  ],
  //服务
  // devServer: {
  //   historyApiFallback: true,
  //   hot: true,
  //   inline: true,
  //   progress: true,
  // },
  watch: !0
}