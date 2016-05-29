//函数的默认值
{
	function showWords(x,y='apple'){
		//console.log(x,y);
	}
	showWords('i love ,');
	showWords('i love ,','tangerine');
	let show = item => alert(item);
	//show('apple');
}
window.onload = function(){
{
	let $box = Array.from(document.querySelectorAll('div'));
	// $box.forEach(item=>item.onclick=(e)=>{
	// 	//console.log($box.indexOf(e.target));
	// })
	for(let i=0,len=$box.length;i<len;i+=1){
		$box[i].onclick = ()=>{
			//console.log(i);
		}
	}
}
{
	let show = (s,...names)=>{
		let result='';
		for(let item of names) result+=','+item;
		//console.log(s+result);
	}
	show('i love you','apple','tangerine');
	let add = (...values)=>eval( values.join('+') );
	//console.log(add(1,2,3));
	let arr=[1,2,3],
		arr2=[4,5,6];
	let minArr=(arr1,arr2)=>[...arr1,...arr2];
	//console.log(minArr(arr,arr2));
}
	let BoxArr = [...document.querySelectorAll('div')];
	//console.log(BoxArr);
	let name="tangerine";
	function f(a=()=>name){
		let name="apple";
		//console.log(a());
	}
	f();
}
window.onload = function()
{
	var tragable = function(){
		let self,$rootEle = document.documentElement,
			addEvent = (obj,event,fn)=>{
				$rootEle.addEventListener ? obj.addEventListener(event,()=>{fn&&fn.call(obj)},false)
						 : obj.attachEvent('on'+event,()=>{fn&&fn.call(obj)},false)
			},
			trag = {
				clickEvent: function(){
					//console.log(self.indexOf(this));
				},
				run: function($ele){
	
					self=[...$ele];
					self.forEach(item=>{
						addEvent(item,'click',trag.clickEvent);
					})
				}
			};
		
		return {

			inte: trag.run
		};
	}();
	tragable.inte(document.querySelectorAll('div'));
}

