const config = require('./webpackBase.config.babel.js'),
  	  webpack = require('webpack'),
  	  path = require('path'),
  	  WebpackDevServer = require('webpack-dev-server');

//插件的定义
const OpenBrowserPlugin = require('open-browser-webpack-plugin'),  //打开窗口
      HtmlWebpackPlugin = require('html-webpack-plugin');  //html打包

//
const NET_PORT = '2333';
var   SERVER_CFG;

//动态生成html&&生成项目路径&&自动打开窗口的地址
for(var key of Object.keys(config.entry)){
  config.output.path=path.resolve(__dirname,`build/${key}`);
  var value = config.entry[key];

  if(typeof(value) == 'object')
  	config.entry[key].unshift(`webpack-dev-server/client?http://localhost:${NET_PORT}/`);
  else
  	config.entry[key] = [`webpack-dev-server/client?http://localhost:${NET_PORT}/`, value];

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
  SERVER_CFG = {
  	noInfo: true,
   	publicPath: config.output.publicPath,
    contentBase: `./src/${key}/`,
    headers: { "X-Custom-Header": "yes" },
    hot: !0,
    stats: {
        colors: true
    }
  };
  //打开窗口的动态路径
  config.plugins.push(
      new OpenBrowserPlugin
      (
          {
            url: `http://localhost:2333/view`
          }
      )
    );
}

const compiler = webpack(config);
var server = new WebpackDevServer(compiler, SERVER_CFG);
server.listen(NET_PORT);