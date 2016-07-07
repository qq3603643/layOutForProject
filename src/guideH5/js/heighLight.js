//jq选中元素可直接通过heighLight()高亮显示
//样式请设置在该元素的class上，id只用于js操作
(function($){

	$.extend($.fn,{
		'heighLight':function(){
			let _this=$(this),
				_id=this[0].id,
				cssText=`
				 		#${_id}:after{display:block;content:'';position:absolute;top:-1000px;bottom:-1000px;left:-1000px;right:-1000px;background:rgba(0,0,0,.6); }
					 	`;
			$('head').append($('<style>').html(cssText));
			$(this).find('*').css({
				'position':'relative',
				'z-index':'10',
			});
			let tips=$('<div>').html('&#x21d0; 点击继续').addClass('twinkle');
			tips.css({
				'position':'fixed',
				'left':(_this.offset().left+_this.width()+10)+'px',
				'top':(_this.offset().top+(_this.height()-tips.height())/2-10)+'px',
			});
			setTimeout(()=>{
				$('body').append(tips);
			},999)
		},
		'removeHeighLight':function(){
			let _id=this[0].id;
			$.each($('style'),function(){
				if(this.innerHTML.includes(`#${_id}`)) $(this).remove();
			})
			$('div.twinkle').remove();
		},
		'mark':function(){
			let _id=this[0].id,
				cssText=`
				 		#${_id}:after{display:block;content:'';position:absolute;top:0px;bottom:0px;left:0px;right:0px;background:rgba(0,0,0,.6);}
					 	`;
			$('head').append($('<style>').html(cssText));
		},
		'removeMark':function(){
			let _id=this[0].id;
			$.each($('style'),function(){
				if(this.innerHTML.includes(`#${_id}`)) $(this).remove();
			})
		},
	})
})(Zepto);