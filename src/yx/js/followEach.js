
((Win,$)=>{

	$.fn.extend({
		'followEach':function($eles,str_class){
			let
				_this=this,
				getIndex=()=>{
					let
						parent_nav  =$eles.parent().get(0),
						top_nav     =parent_nav.getBoundingClientRect().top+parent_nav.clientHeight/2,
						aTop_follow =[];
					$.each(_this,function(){
						aTop_follow.push(this.getBoundingClientRect().top);
					})
					aTop_follow.push(top_nav);
					aTop_follow.sort((a,b)=>a-b);

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

			$eles.on('click',function(){
				$('html,body').stop(!0).animate({'scrollTop':_this.eq($(this).index()).offset().top},666,()=>{
					$(this).addClass(str_class).siblings().removeClass(str_class);
				})
			});
		}
	})
})(window,jQuery)
