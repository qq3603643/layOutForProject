require('../css/index.css');
(function(Win){

	//globalFunction
	let fullScreen=ele=>{
		$.each(ele,function(){
			$(this).css({
			'width':$(Win).width(),
			'height':$(Win).height(),
			})
		})
	};
	let showGradually=ele=>{
		ele.removeClass('hide_dis').css('opacity','.4').animate({
			'opacity':'1',
		},1000);
	};
	let hideGradually=ele=>{
		ele.addClass('blur');
		setTimeout(()=>{
			ele.addClass('hide_dis');
		},1000)
	}
	//page1
	let page1=(function(){
		let times_Appear=500,
			times_delay=1000,
			$dialogues=$('.page1 .dialogue-item'),
			$next=$('.page1 .next'),
			self=$('.page1'),
		pageE={

			layOut:function(){
				let u=navigator.userAgent;
				if(~u.indexOf('Android') || ~u.indexOf('Adr'))
					$('.dialogue-item-right').css({
						'max-width':($('.dialogue-item').width()-68)+'px',
					});
				// console.log($('.dialogue-item').width()-68);
			},
			showEvent:function($ele,callback){
				let $left=$ele.find('.dialogue-item-left'),
					$right=$ele.find('.dialogue-item-right');

					$left.removeClass('hide_dis').animate({
						'margin':'0px',
					},times_Appear);
					$right.animate({
						'opacity':'1'
					},times_Appear,()=>{
						if(callback) setTimeout(()=>{
							callback();
						},times_delay);
					});
			},
			removeMark:function(){
				$('#heighLight_code2').removeHeighLight();
			},
			next:function(){
				self.addClass('hide_dis');
				showGradually(self.next());
				page2();
			},
			run:function(){

				//兼容android calc
				pageE.layOut();
				//对话列表的出现..
				pageE.showEvent($dialogues.eq(0),()=>{
					pageE.showEvent($dialogues.eq(1),()=>{
						pageE.showEvent($dialogues.eq(2),()=>{
							pageE.showEvent($dialogues.eq(3),()=>{
								pageE.showEvent($dialogues.eq(4),()=>{
									pageE.showEvent($dialogues.eq(5),()=>{
										$('#heighLight_code2').heighLight();
										//点击位置初始化
										$next.css({
											'left':$('#heighLight_code2').offset().left,
											'top':$('#heighLight_code2').offset().top,
											'z-index':'999',
									     });
									})
								})
							})
						})
					})
				});
				//初始高度
				$('.page1 .content').height($(Win).height());
				//移出高亮状态
				$next.on('touchstart',pageE.removeMark);
				//下一页
				$next.on('touchstart',pageE.next);
			}
		};

		return {
			'inte':pageE.run,
			'dialogueShow':pageE.showEvent,
		};
	})();
	page1.inte();

	const times_pageShow=2000;
	//page2
	function page2(){

		fullScreen($('.page2 img'));
		setTimeout(()=>{
			$('.page2').addClass('hide_dis');
			$('.page2').next().removeClass('hide_dis');
			page3();
		},times_pageShow)
	};
	//page3
	function page3(){

		fullScreen($('.page3 img'));
		let img_start=$('.page3').find('img[src*=start]'),
			img_end=$('.page3').find('img[src*=end]');
		setTimeout(function(){
			hideGradually(img_start);
			showGradually(img_end);
		},times_pageShow)
	};
	$('.page3 .next').on('touchstart',function(){
		$('.page3').addClass('hide_dis');
		$('.page3').next().removeClass('hide_dis');
		page4();
	})
	//page4
	function page4(){

		fullScreen($('.page4 img'));
		setTimeout(()=>{
			$('.page4').addClass('hide_dis');
			$('.page4').next().removeClass('hide_dis');
			page5();
		},times_pageShow)
	};
	//page5
	function page5(){

		fullScreen($('.page5 img'));
		let img_start=$('.page5').find('img[src*=start]'),
			img_end=$('.page5').find('img[src*=end]');
		setTimeout(function(){
			hideGradually(img_start);
			showGradually(img_end);
		},times_pageShow)
	}
	$('.page5 .next').on('touchstart',function(){
		$('.page5').addClass('hide_dis');
		$('.page5').next().removeClass('hide_dis');
		page6();
	});
	//page6
	function page6(){

		fullScreen($('.page6 img'));
		let img_start=$('.page6').find('img[src*=start]'),
			img_end=$('.page6').find('img[src*=end]');
		setTimeout(function(){
			hideGradually(img_start);
			showGradually(img_end);
		},times_pageShow)
	}
	$('.page6 .next').on('touchstart',function(){
		$('.page6').addClass('hide_dis');
		$('.page6').next().removeClass('hide_dis');
		page7();
	})
	//page7
	function page7(){

		fullScreen($('.page7 img'));
		let img_start=$('.page7').find('img[src*=start]'),
			img_touch=$('.page7').find('img[src*=touch]');
		setTimeout(()=>{
			hideGradually(img_start);
			showGradually(img_touch);
		},times_pageShow)
	}
	$('.page7 .next').on('touchstart',function(){
		$('.page7').find('img[src*=touch]').addClass('hide_dis');
		$('.page7').find('img[src*=end]').removeClass('hide_dis');
		setTimeout(()=>{
			$('.page7').addClass('hide_dis');
			$('.page7').next().removeClass('hide_dis');
			page8();
		},times_pageShow);
	})
	//page8
	function page8(){

		fullScreen($('.page8 img'));
		let img_start=$('.page8').find('img[src*=start]'),
			img_end=$('.page8').find('img[src*=end]');
		setTimeout(function(){
			hideGradually(img_start);
			showGradually(img_end);
		},times_pageShow)
	};
	$('.page8 .next').on('touchstart',function(){
		$('.page8').addClass('hide_dis');
		$('.page8').next().removeClass('hide_dis');
		page9();
	})
	//page9
	function page9(){

		fullScreen($('.page9 img'));
		setTimeout(()=>{
			$('.page9').addClass('hide_dis');
			$('.page9').next().removeClass('hide_dis');
			page10();
		},times_pageShow)
	}
	//page10
	function page10(){

		let $dialogues=$('.page10 .dialogue-item'),
			showEvent=page1.dialogueShow;

		$('.page10 .content').height($(Win).height());
		showEvent($dialogues.eq(0),()=>{
				showEvent($dialogues.eq(1),()=>{
					showEvent($dialogues.eq(2),()=>{
						showEvent($dialogues.eq(3),()=>{
							showEvent($dialogues.eq(4),()=>{
								setTimeout(()=>{
									$('.page10').addClass('hide_dis');
									$('.page10').next().removeClass('hide_dis');
									page11();
								},times_pageShow)
							})
						})
					})
				})
			})
	};
	//page11
	function page11(){

		fullScreen($('.page11 img'));
		alert('over');
	};
})(window)