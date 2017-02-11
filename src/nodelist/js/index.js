//兼容处理
require('es5-shim');
require('es5-shim/es5-sham');
require('babel-polyfill');

//css
require('plugins/css/reset.css');

//js
require('plugins/mine/nodelist.js');

console.log($$('.list_item').className)