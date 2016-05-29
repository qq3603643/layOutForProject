//数组
window.onload = function(){
	{
		let $Div = document.querySelectorAll('div');
		$Div = Array.from($Div);
		//$Div.forEach(item=>console.log(item));
		let likeArr = {'1': 'apple','2': 'tangerine','length': '3'};
		likeArr = Array.from(likeArr);

		//console.log(likeArr);
		let arr=[1,-4,9];
		let item = arr.find(item=>item<0);
		let index = arr.findIndex(item=>item<-2);
		//console.log(item);
		//console.log(index);
		//console.log(arr.includes(-4));
	}
}