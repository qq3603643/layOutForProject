const
      path              = require('path'),
      webpack           = require('webpack'),
      //自动打开一个浏览器窗口
      OpenBrowserPlugin = require('open-browser-webpack-plugin'),
      //html
      HtmlWebpackPlugin = require('html-webpack-plugin'),
      //分离js文件
      CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin"),
      //文件分离打包(css)
      ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  cache: !0,
  //入口
  entry: {
          'YW': [
            'react', 'react-dom', 'jquery'
          ],
          // 'yx': [path.resolve(__dirname,'src/yx/js/yx.js')],
          // 'react_1': path.resolve(__dirname,'src/react_1/js/react_1.jsx'),
          // 'jifen': path.resolve(__dirname,'src/jifen/js/jinfen.jsx'),
          // 'guideH5': [
          //             path.resolve(__dirname,'plugins/mobile/zepto.min.js'),
          //             path.resolve(__dirname,'src/guideH5/js/index.js'),
          //             path.resolve(__dirname,'src/guideH5/js/heighLight.js')
          //           ],
          // 'reactUI': path.resolve(__dirname,'src/reactUI/js/reactUi.jsx'),
          // 'yx2': path.resolve(__dirname,'src/yx2/js/yx2.js')
          // 'activity_0707': path.resolve(__dirname,'src/activity_0707/js/activity_0707.js')
          // 'alertY': path.resolve(__dirname,'src/alertY/js/alertY.js'),
          // 'yx3': path.resolve(__dirname,'src/yx3/js/yx3.js'),
          // 'myPluginsTest': path.resolve(__dirname, 'src/myPluginsTest/js/myPluginsTest.js'),
          // 'yx4': path.resolve(__dirname, 'src/yx4/js/yx4.js')
          // 'Yalert': path.resolve(__dirname, 'src/Yalert/js/Yalert.js')
          'JFexchange': path.resolve(__dirname, 'src/JFexchange/js/JFexchange.js')
          // 'uS_tst': path.resolve(__dirname, 'src/uS_tst/js/uS_tst.js')
          // 'yearEndact': path.resolve(__dirname, 'src/yearEndact/js/yearEndact.js')
  },
  //出口
  output: {
   //下面的js，css的输出路径(为文件保存路径)会在此的基础上已在下面动态生成
   // path: path.resolve(__dirname,'build/activity_0707'),

   //publicPath目前发现的作用是 加在css里面&&html引用的路径相关的位置(css中的url,html中link中的href,script中的src)之前
    publicPath: '../',
    filename: 'js/[name].min.js?[hash]',
  },
  //加载器
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
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
        test: /\.less$/,
        loader: 'style-loader!css-loader!postcss-loader!less-loader'
      },
      {
        test: /\.css$/,
        //值得注意的是这里的参数似乎是有规定的，第三个参数不能为loader
        // loader: 'style-loader!css-loader!postcss-loader',
        loader: ExtractTextPlugin.extract('style-loader','css-loader!postcss-loader'),
      },
      {
        test: /\.(jpg|png|jpeg|svg|gif)$/,
        //小于8172b的将压缩成base64格式大于则保存至output下的path下的制定目录
        loader: 'url-loader?limit=8172&name=pics/[name].[ext]',
      },
    ]
  },
  postcss: function() {
    //precss 可在.css文件中以scss形式书写css; autoprefixer可自动添加css3的一些前缀
    console.log('正在调用postcss编译css,耐心等待你是最棒的...');
    return [require('precss'),require('autoprefixer')];  //require('postcss-opacity'),
  },
  //简便设置
  resolve: {

    extensions: ['','.js','jsx','.css','.sass','.png','.jpg','.jpeg'],
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

        //分离基础js
        new CommonsChunkPlugin('YW', 'YW.baseBundle.js'),
        //直接从/node_modules/中提取的js，可在全局js中直接使用，用npm install *** 安装在此目录下
        new webpack.ProvidePlugin({
          '$':'jquery',
          'jQuery':'jquery',
          'window.jQuery':'jquery',
          '_': 'underscore',
          'uS': 'underscore'
        }),
        new webpack.NoErrorsPlugin(),
        //热加载
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
          "process.env": {
             NODE_ENV: JSON.stringify("production")
           }
        }),
  ],
  //服务
  devtool: 'source-map',
  watch: !0
}