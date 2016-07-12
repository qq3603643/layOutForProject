//jq选中元素可直接通过heighLight()高亮显示
(function($){

	$.extend($.fn,{
		'heighLight':function(){
// console.log(this);
			let
				_this=this[0],
				top=_this.getBoundingClientRect().top,
				left=_this.getBoundingClientRect().left,
				bottom=$(window).height()-_this.offsetHeight-top,
				right=$(window).width()-_this.offsetWidth-left,
				$cover=$('<div>').attr('id','cover');
			$cover.css({
				'width':_this.offsetWidth,
				'height':_this.offsetHeight,
				'position':'fixed',
				'top':'0',
				'left':'0',
				'border':'0 solid #000',
				'border-width':`${top}px ${right}px ${bottom}px ${left}px`,
				'opacity':'.6',
				'z-index':'3',
				'transition':'all .4s',
			});
			let
				cssText=`#cover:after{ position:absolute;content:'';width:100%;height:100%;left:-100px;top:-100px;border:100px solid #000;border-radius:40%;box-shadow:inset 0 0 5px 2px rgba(0,0,0,.75); }
					.of_h{ overflow:hidden; }
					`;
			$('head').prepend($('<style>').attr('data_id','cover').html(cssText));
			$('body').append($cover).addClass('of_h');

			let
				$tips=$('<div>').attr('id','tips_cover').html('&#x21e6;点击继续').addClass('twinkle');
			$tips.css({
				'position':'fixed',
				'left':`${_this.getBoundingClientRect().right+20}px`,
				'top':`${top+(_this.offsetHeight-$tips[0].offsetHeight)/2-10}px`,
			});
 			setTimeout(()=>{
 				$('body').append($tips);
 			},666);
		},
		'removeHeighLight':function(){
			$('#cover').remove();
			$('#tips_cover').remove();
			$('style[data_id="cover"]').remove();
			$('body').removeClass('of_h');
		},
	})
})(Zepto);