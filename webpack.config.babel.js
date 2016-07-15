const
      path              = require('path'),
      webpack           = require('webpack'),
      //html
      HtmlWebpackPlugin = require('html-webpack-plugin'),
      //文件分离打包(css)
      ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  //入口
  entry: {
    // 'guideH5':[path.resolve(__dirname,'plugins/mobile/zepto.min.js'),
    //            path.resolve(__dirname,'src/guideH5/js/heighLight.js'),
    //            path.resolve(__dirname,'src/guideH5/js/index.js'),
    //           ],
    // 'activity_0707':path.resolve(__dirname,'src/activity_0707/js/activity_0707.js'),
    // 'myTest':path.resolve(__dirname,'src/myTest/js/test.js'),
    'yx':path.resolve(__dirname,'src/yx/js/yx.js'),
    // '14year': path.resolve(__dirname,'src/14year/js/14year.js'),
  },
  //出口
  output: {
   //下面的js，css的输出路径(为文件保存路径)会在此的基础上
   // path: path.resolve(__dirname,'bulid/activity_0707'),

   //目前发现的作用是 加在css里面&&html引用的路径相关的位置(css中的url,html中link中的href,script中的src)之前
    publicPath: '../',
    filename: 'js/[name].min.js?[hash]',
  },
  //加载器
  module: {
    loaders: [
      {
        test: /\.js$/,
        //以下文件不参与js编译
        exclude: [
                  /node_modules/,
                  path.resolve(__dirname,'plugins/jquery'),
                  path.resolve(__dirname,'plugins/tools'),
                  path.resolve(__dirname,'plugins/mobile/zepto.min.js'),
                ],
        loaders: ['es3ify-loader',"babel-loader?presets[]=es2015"],
      },
      {
        test: /\.css$/,
        //值得注意的是这里的参数似乎是有规定的，第三个参数不能为loader
        loader: ExtractTextPlugin.extract('style-loader','css-loader!postcss-loader'),
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
    return [require('precss'),require('postcss-opacity'),require('autoprefixer')];
  },
  //简便设置
  resolve: {

    extensions: ['','.js','.css','.sass','.png','.jpg','.jpeg'],
    alias: {
      //设置一些快捷的路径 在js中require时便于使用
      'plugins': path.join(__dirname,'plugins'),
      'tools': path.join(__dirname,'plugins/tools'),
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
        new ExtractTextPlugin('css/[name].min.css?[hash]'),

        //html
        // new HtmlWebpackPlugin({
        //   //这个地方自己改成自动添加了,底部
        //   filename:'guideH5/index.html',
        //   template:'src/guideH5/index.html',
        // }),

        //直接从/node_modules/中提取的js，可在全局js中直接使用，用npm install *** 安装在此目录下
        new webpack.ProvidePlugin({
          '$':'jquery',
          'jQuery':'jquery',
          'window.jQuery':'jquery',
        }),
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

//动态生成html&&生成项目路径
for(let key of Object.keys(module.exports.entry)){
  console.log(`正在生成的项目是${key}...主人请耐心等待呃...`);
  module.exports.plugins.push(
        new HtmlWebpackPlugin({
          filename:`view/index.html`,
          template:`src/${key}/view/index.html`,
        })
  );
  module.exports.output.path=path.resolve(__dirname,`bulid/${key}`);
}