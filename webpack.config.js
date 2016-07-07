var path = require('path'),
    srcJsPath = path.resolve(__dirname,'src/js'),
    webpack = require('webpack'),
    //html
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    //文件分离打包(css)
    ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  //入口
  entry: {
    'guideH5':[path.resolve(__dirname,'plugins/mobile/zepto.min.js'),
               path.resolve(__dirname,'src/guideH5/js/heighLight.js'),
               path.resolve(__dirname,'src/guideH5/js/index.js'),
              ],
    // 'activity_0707':path.resolve(__dirname,'src/activity_0707/js/activity_0707.js'),
  },
  //出口
  output: {
   //下面的js，css的输出路径(为文件保存路径)会在此的基础上
    path: path.resolve(__dirname,'bulid'),
   //目前发现的作用是设置css里面的url路径相关的位置(为url路径)暂时理解为加在文件保存路径前面的东东
    publicPath: '../',
    filename: '[name]/js/[name].min.js?[hash]',
  },
  //加载器
  module: {
    loaders: [
      {
        test: /\.js$/,
        //以下文件不参与js编译
        exclude: [/node_modules/,path.resolve(__dirname,'plugins/jquery'),path.resolve(__dirname,'plugins/tools')],
        loaders: ['es3ify-loader',"babel-loader?presets[]=es2015"],
      },
      {
        test: /\.css$/,
        //-url可以保持原来css文件内地的url地址原样(css-loader-url)
        loader: ExtractTextPlugin.extract('style-loader','css-loader!postcss-loader'),
      },
      {
        test: /\.scss/,
        loader: 'style!css!sass',
      },
      {
        test: /\.(jpg|png|jpeg|svg)$/,
        //小于8172b的将压缩成base64格式大于则保存至output下的path下的制定目录
        loader: 'url-loader?limit=8172&name=pics/[name].[ext]',
      },
    ]
  },
  postcss: function() {
    //precss 可在.css文件中以scss形式书写css; autoprefixer可自动添加css3的一些前缀
    console.log('正在调用postcss编译css,耐心等待你是最棒的...');
    return [require('precss'),require('autoprefixer')];
  },
  //简便设置
  resolve: {

    extensions: ['','.js','.css','.sass','.png','.jpg','.jpeg'],
    alias: {
      //设置一些快捷的路径 在js中require时便于使用
      'plugins': path.join(__dirname,'plugins'),
      'tools': path.join(__dirname,'plugins/tools'),
      'js': path.join(__dirname,'src/js'),
    }
  },
  //插件
  plugins: [
        //删除重复
        new webpack.optimize.DedupePlugin(),
        //压缩代码 开发环境时可不开启（便于查看源码）
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false,
          }
        }),

        //分离css（这里面的路径是在output的path基础上设置的）
        new ExtractTextPlugin('[name]/css/[name].min.css?[hash]'),

        //html
        // new HtmlWebpackPlugin({
        //   //这个地方怎么改成自动,如下
        //   filename:'guideH5/index.html',
        //   template:'src/guideH5/index.html',
        // }),

        //直接从/node_modules/中提取的js，可在全局js中直接使用，用npm install *** 安装在此目录下
        // new webpack.ProvidePlugin({
        //   '$':'jquery',
        //   'jQuery':'jquery',
        //   'window.jQuery':'jquery',
        // }),
        new webpack.NoErrorsPlugin(),
  ],
  //服务
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
  },
  watch: !0
}

//动态生成html...
for(var attr in module.exports.entry){
  console.log('正在生成'+attr+'所需html...主人请耐心等待呃...');
  module.exports.plugins.push(
        new HtmlWebpackPlugin({
          filename:attr+'/index.html',
          template:'src/'+attr+'/index.html',
        })
  );
}