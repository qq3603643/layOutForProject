require('plugins/css/tangerine.css');

//兼容处理
require('es5-shim');
require('es5-shim/es5-sham');
require('babel-polyfill');

((Win,$)=>{

	let getStyle=(()=>{

		if(Win.getComputedStyle) return (ele,key)=>Win.getComputedStyle(ele)[key];
		return (ele,key)=>ele.currentStyle[key];
	})();

	let changeHeightAfter=(ele,fn)=>{

		let height_start=getStyle(ele,'height');
		fn.call(ele);
		ele.style.height='auto';
		let height_end=getStyle(ele,'height');

		ele.style.height=height_start;
		ele.style.transition='height 0.8s';
		setTimeout(()=>{
			ele.style.height=height_end;
		},16)
	}

	// document.body.onclick=()=>{
	// 	changeHeightAfter(document.querySelector('.container'),()=>{

	// 	let 
	// 		child=document.createElement('div'),
	// 		html=`i love you`.repeat(10);

	// 	child.innerHTML=html;
	// 	document.querySelector('.container').appendChild(child);
	// })
	// };
	$.fn.extend({
		'followEach':function($eles,str_class){

			let getIndex=()=>{
				let parent_nav=$eles.parent().get(0),
					top_nav=parent_nav.getBoundingClientRect().top+parent_nav.clientHeight/2,
					aTop_follow=[];
				$.each(this,function(){
					aTop_follow.push(this.getBoundingClientRect().top);
				})
				aTop_follow.push(top_nav);
				aTop_follow=aTop_follow.sort((a,b)=>a-b);
				return Math.max(0,aTop_follow.findIndex(item=>item==top_nav)-1);
			};
			$eles.removeClass(str_class).eq(getIndex()).addClass(str_class);
			$(Win).on('scroll',(()=>{

				let time_start=new Date()*1,
					timer=null;
				return ()=>{
					let time_now=new Date()*1;

					clearTimeout(timer);
					if(time_now-time_start>=233){
						$eles.removeClass(str_class).eq(getIndex()).addClass(str_class);
						time_start=time_now;
					}else {
						setTimeout(()=>{
							$eles.removeClass(str_class).eq(getIndex()).addClass(str_class);
						},233);
					}
				};
			})());
			let _this=this;
			$eles.on('click',function(){
				$('html,body').stop(!0).animate({'scrollTop':_this.eq($(this).index()).offset().top},666,()=>{
					$(this).addClass(str_class).siblings().removeClass(str_class);
				})
			})
		},
	})

	$('.setion').followEach($('.toGo'),'bg_red');
	
	let getTimes=(value)=>{

		let 
		    aValue=value.split(/\s+/),
			[iYear,iMouth,iDay]=aValue[0].split('-'),
			[iHour,iMin,iSec]=aValue[1].split(':');

		return new Date(iYear,iMouth-1,iDay)-new Date(1970,0,1)+(iSec*1+iMin*60+(iHour-8)*3600)*1000;
	};
	// console.log(new Date('2016-07-17')-new Date(2016,6,17)) //前者默认8点 后者默认0点
	if(Win.console) console.log(new Date('2016-07-17 01:01:01')*1);
	console.log(getTimes('2016-07-17 01:01:01'));
})(window,jQuery);