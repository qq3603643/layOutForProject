//不需要引入jquery就可以直接使用了，爽歪歪啊，哈哈哈哈；

require('../css/index.css');
$(()=>{

	$('body').css({'height':'2000px'});
	$('body').on('click',()=>{
		alert('click');
	})
	$.each($('div'),(i,item)=>{
		$(item).css({'background': '#f00'});
	})

{
	let myName = 'tangerine',
		yourName = 'apple';
	//对象的扩展
	var mineAlert = {
		showMyName(){
			alert(myName);
		},
		showYourNamfe(){
			alert(yourName);
		}
	};

}
	//mineAlert.showMyName();
	mineAlert.showYourNamfe();

})