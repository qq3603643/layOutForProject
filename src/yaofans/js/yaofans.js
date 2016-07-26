//兼容处理
require('es5-shim');
require('es5-shim/es5-sham');
require('babel-polyfill');

//css
require('../css/yaofans.css');
((Win,$)=>{

$('head').prepend($('<script>').attr('src','https://www.ypzdw.com/common/userInfo?callback=getArea&t='+new Date().getTime()));
const hashcode_area={
	'510000':'sc',
	'340000':'aw',
	'350000':'fj',
	'440000':'gd',
	'420000':'hb',
	'370000':'sd',
	'140000':'sx',
	'650000':'xj',
	'500000':'cq',
	},
	getArea=(data)=>{
		let
			areaCode=Math.floor((data.data.areaCode)/10000)*10000,
			value=(areaCode in hashcode_area)?hashcode_area[areaCode]:'hb',
			src=`../pics/${value}.png`;
		(Win.console) && console.log(`areaCode: ${areaCode};value: ${value};`);
		$('.ft img').attr('src',src);
	};
Win.getArea=getArea;
})(window,jQuery)