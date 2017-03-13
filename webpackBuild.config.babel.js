const webpack = require('webpack'),
      config = require('./webpackBase.config.babel.js'),
      path = require('path'),
      HtmlWebpackPlugin = require('html-webpack-plugin'),  //autoCreate Html
      CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin"),  //separate js
      ExtractTextPlugin = require('extract-text-webpack-plugin');  //separate css

//动态生成html&&生成项目路径&&自动打开窗口的地址
for(var key of Object.keys(config.entry)){
  config.output.path=path.resolve(__dirname,`build/${key}`);

  if(key == 'YW')
  {
    console.log('base; jump!!');
    config.plugins.push(
        new CommonsChunkPlugin('YW', 'js/YW.baseBundle.js')
    );
    continue;
  }
  console.log(`正在生成的项目是${key}...主人请耐心等待呃...`);
  config.plugins.push(
        new HtmlWebpackPlugin({
          filename:`view/index.html`,
          template:`src/${key}/view/index.html`,
        })
  );
}

//css separate
config.module.loaders.push(
      {
        test: /\.css$/,
        //值得注意的是这里的参数似乎是有规定的，第三个参数不能为loader
        loader: ExtractTextPlugin.extract('style-loader','css-loader!postcss-loader'),
      }
  );
//add plugins
config.plugins.push(
      new ExtractTextPlugin('css/[name].min.css?[hash]')
  );
config.plugins.push(
      new webpack.optimize.UglifyJsPlugin({    //压缩
            compress: {
              warnings: false,
            }
        })
  );
config.plugins.push(
      new webpack.DefinePlugin({
          "process.env": {
             NODE_ENV: JSON.stringify("production")
           }
        })
  );

module.exports = config;