//兼容处理
require('es5-shim');
require('es5-shim/es5-sham');
require('babel-polyfill');

//css
require('../css/test.css');

//tangerine.js
const _=require('plugins/mine/tangerine.js'),
	  {ID,CLASS,Q}=_;

//localstorage
const localStorage=require('plugins/tools/localStorage.js'),
	  data_Local={'name':'apple','sex':'girl'};
localStorage.set(data_Local);
console.log(localStorage.get('sex'));

// templata
const template=require('plugins/tools/template.js'),
	  data_Html={
			'status':1,
			'data':[{'title':'apple'},{'title':'tangerinfe'}],
		   },
	  tempHtml=
	  		`{{if status}}
		  		<ul>
					{{each data}}
						<li>{{$value.title}}<li>
					{{/each}}
				</ul>
			{{/if}}`;
//$value为each中的item
console.log(template.compile(tempHtml)(data_Html));

//值得注意的是tempHtml中的变量默认已经是data.***  如：status默认是data.status
let html2=`<div>
			{{name}}
		   </div>`;
let value={'name':'tangerine'};
console.log(template.compile(html2)(value));

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

class Alert{

	constructor(className='alert'){
		Object.assign(this, {className})
		this.alertOnff=!0;
	}
	createClass(){
		const defaultClass=`.alert{  position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);padding:4px 10px;box-shadow:0 0 4px #000;font:16px/16px 'microsoft yahei';border-radius:2px;opacity:0; }`;
		const style=document.createElement('style');

		style.innerHTML=defaultClass;
		_.Prepend(Q('head'),style);
	}
	layOut(alertStr){
		if(this.isLayOut()) return;
		this.createClass();
		const tempHtml=`<div class="${this.className}" dataId="tangerineAlert">${alertStr}</div>`;
		_.Prepend(Q('body'),tempHtml);
	}
	isLayOut(){
		return !!Q(`.${this.className}`).filter(item=>_.Attr([item],'dataId')=='tangerineAlert').length;
	}
	show(alertStr){
		if(!this.alertOnff) return;
		this.alertOnff=!1;
		this.layOut(alertStr);
		const self=Q(`.${this.className}`).filter(item=>_.Attr([item],'dataId')=='tangerineAlert');

		_.Animate(self,{
			'opacity':100
		},500)
		.then(()=>{
			_.Animate(self,{
			'opacity':0
			},500)
			.then(()=>{
				this.alertOnff=!0;
			})
		})
	}
}

const myAlert=new Alert();
_.Click(CLASS('box'),()=>{
	myAlert.show('apple');
})

//快速排序
const qSort=arr=>{
	if(arr.length<=1) return arr;
	let left=[],right=[],_middleValue=arr[0];
	for(let i=1,len=arr.length;i<len;i+=1){
		(arr[i]<_middleValue)&&(left[left.length]=arr[i],true)||(right[right.length]=arr[i]);
	}
	return qSort(left).concat(_middleValue, qSort(right));
};
let arrSorted=qSort([1,4,6,2,1,7,2,14]);
console.log(arrSorted);
let arr_JsonPerson=[{
	'name':'tangerine',
	'sex':'man'
}];
// $.each(arr_JsonPerson,function(){
// 	console.log(this.name); //this==item
// })
const exchange=(arr,index1,index2)=>{
	arr[index2]=[arr[index1],arr[index1]=arr[index2]][0];
};
let arr_exchange=[0,1,2,3,4,5];
exchange(arr_exchange,3,5);
console.log(arr_exchange);