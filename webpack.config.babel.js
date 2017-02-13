const config = require('./webpackBase.config.babel.js'),
      path = require('path'),
      HtmlWebpackPlugin = require('html-webpack-plugin');

//动态生成html&&生成项目路径&&自动打开窗口的地址
for(var key of Object.keys(config.entry)){
  config.output.path=path.resolve(__dirname,`build/${key}`);

  if(key == 'YW')
  {
    console.log('base; jump!!');
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

module.exports = config;