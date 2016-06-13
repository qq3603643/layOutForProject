require('es5-shim');
require('es5-shim/es5-sham');
require('babel-polyfill');
const _=require('../../plugins/mine/tangerine.js'),
	{ID,CLASS,Q}=_;

const moveEle=CLASS('box');
_.On(moveEle,'click',function(){
	_.Animate(CLASS('box'),{
		'marginLeft':400
	},500)
	.then(()=>{
		_.Css(moveEle,{
			'display':'inline-block',
			'outline':'1px solid #0f0'
		})
	})
	.then(()=>{
		_.Animate(moveEle,{
			'marginTop':400
		},500)
	.then(()=>{
		_.Css(moveEle,{
			'outline':'none'
		})
		_.Animate(moveEle,{
		'marginLeft':0
		},500)
	})
	})
})
_.Off(moveEle,'click');