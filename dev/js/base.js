/**
 * [基础模块]
 * @param  {String} $               [jquery]
 * @param  {String} ls              [本地存储]
 * @param  {String} cookie          [cookie]
 * @param  {String} t               [基础方法]
 * @param  {String} tracker         [打桩]
 * @param  {String} Ajax            [Ajax方法]
 * @param  {String} template		[数据模板]
 * @return {Object}                 [返回module]
 */
requirejs.config({
	baseUrl: '../js',
	paths : {
		//scrollLoading : '../libs/scrollLoading/jquery.scrollLoading'  //插件的使用
		//,rap : 'http://192.168.0.244/rap.plugin.js?projectId=1&mode=3'
	}
});
define([
	'localStorage',
	'cookie',
	'tool',
	'template',
	//'scrollLoading'  插件
	//,'rap'
	],
	function(ls,cookie,t,Ajax,template,common){
	var module = {
        ls: ls,
        cookie: cookie,
        t: t,
        template: template
    };
    return module;
});