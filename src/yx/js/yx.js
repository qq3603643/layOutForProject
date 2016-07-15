//兼容处理
require('es5-shim');
require('es5-shim/es5-sham');
require('babel-polyfill');

//css
require('plugins/css/reset.css');
require('plugins/css/tangerine.css');
require('../css/yx.css');

(function(Win,$){
//引入js
const
	  tracker=require('tools/tracker.js'),
	  yjy=require('tools/config.js');

//购入车
const cart=(()=>{

	let
		url_addCart          ='/api/price/AddCart',
		timer_countDown=null,
		timers_checkStatus   =66,
		id_goods,
		clickEle_addcart,
		text_tips=[
			{
				'isSuccess':'药包加入成功',
				'suggest':'药包已经放入您的购物车中，请到<a class="blue" href="'+ yjy.config.shop +'/Cart/Default">&#x3c;我的购物车&#x3e;</a>中查看。',
			},
			{
				'isSuccess':'药包加入失败',
				'suggest':'请重新操作！',
			},
			{
				'isSuccess':'你还没登录额！',
				'suggest':'<a class="btn" href="'+ yjy.config.pass +'">登录</a>',
			},
		],
		text_btn={
			'normal':'立即购买',
			'adding':'提交中...',
		},
		tempHtml_tips=`
					<div id="mark">
						<div class="pos_f bd_d of_h" id="tips">
					        <h2 class="bd_b_e">
					        <em class="title">系统提示</em>
					        <i class="tips_close dis_ib fl_r" onclick="var self=document.querySelector('#mark');self.parentNode.removeChild(self);"></i>
					        </h2>
					        <div class="content_tips txt_c">
					            <strong class="fs_24 dis_b">{{isSuccess}}</strong>
					            <span class="fs_12 dis_b g3">{{suggest}}</span>
					        </div>
					        <div class="footer_tips txt_c gray">
					            本页面将在<em class="red" id="countDown">3</em>秒后自动关闭
					        </div>
					    </div>
				    </div>
        `,
        tips_addcartUp={

        	'0':'请重试或联系客服人员！',
        	'1':'您必须登录后才能购买！',
        	'2':'活动未开始或已结束',
        	'3':'加入购物车失败！',
        	'4':'加入购物车成功！',
        	'5':'当前库存不足！',
        	'6':'不能跨区域购买！',
        },
		cartE={
			tracker_addCart(code){

				let
					pageName      =$("#trackPn").val(),
					jDate_tracker ={};

				if(code==7){
					jDate_tracker['type']='success';
				}else{
					jDate_tracker['type']     ='failure';
					jDate_tracker['failCode'] =code;
				}
				jDate_tracker["goodsid"]=id_goods;
				tracker.trace("click_addCart_"+pageName, jDate_tracker);
			},
			showTips(index){

				$('body').append(tempHtml_tips.replace(/\{\{isSuccess\}\}/,text_tips[index].isSuccess).replace(/\{\{suggest\}\}/,text_tips[index].suggest));

				clearInterval(timer_countDown);
				timer_countDown=setInterval(()=>{
					let _text=$('#mark').find('#countDown').text()-1;
					$('#mark').find('#countDown').text(_text);
					if(_text<0){
						clearInterval(timer_countDown);
						if($('#mark').size()>0) $('#mark').remove();
					}
				},1000);
			},
			isLogin(){

				return $('#UserId').val()!=='0';
			},
			isDate(){

				let time_now=new Date()*1;
				return new Date(time_now).getMonth()==7 && new Date(time_now).getDate()>=18 && new Date(time_now)<=30;
			},
			userCheck(){

				if(!cartE.isLogin()){
					cartE.showTips(2);
					return !1;
				}
				return !0;
			},
			statusCheck(){

				let _this=this;
				clearInterval(_this.timer_checkStatus);
				this.timer_checkStatus=setInterval(()=>{
					let count_a=$(_this).data('count_a'),
						count_s=$(_this).data('count_s');

					if(count_a==5){
						cartE.callback_addCart(count_s==5);
						if(Win.console) console.log(`成功加入的数量为: ${count_s};失败加入的数量为: ${count_a-count_s}`);
						clearInterval(this.timer_checkStatus);
					}
				}, timers_checkStatus)
			},
			addCart(id,num){

				let _this =this;
				if(id>0 && num>0){
					$.ajax({
						'type':'POST',
						'url':`${url_addCart}?t=${new Date()*1}`,
						'data':{ id,num, },
						'beforeSend': function(){
							$(_this).text(text_btn.adding).removeClass('bg_red');
							id_goods=id;
						},
						'success':function(data){

							let count_s=$(_this).data('count_s');

							if(data['result']==7) $(_this).data('count_s',count_s+=1);
							cartE.tracker_addCart(data['result']+='');
						},
					}).always(()=>{

						let count_a=$(_this).data('count_a');

						$(_this).data('count_a',count_a+=1);
						if(count_a==5){
							setTimeout(()=>{
								//恢复按钮重置计数器
								$(_this).text(text_btn.normal).addClass('bg_red').data('onff_click',!0).data('count_s',0).data('count_a',0);
							},666)
						}
					});
				};
			},
			callback_addCart(isSuccessToAdd){

				if($('#mark').size()>0) $('#mark').remove();

				let index=1-isSuccessToAdd;

				cartE.showTips(index);
			},
			addCartEvent(){

				let _this=this;
				if(!cartE.userCheck()) return;
				if(!$(_this).data('onff_click')) return;
				let
				 	data = [
			            {
			                "title": "优选节药包99",
			                "salerId": 36055,
			                "goods": [
			                    { "id": 273686, "num": 2 },
			                    { "id": 276004, "num": 3 },
			                    { "id": 266598, "num": 3 },
			                    { "id": 271220, "num": 2 },
			                    { "id": 799296, "num": 1 }
			                ],
			            },
			            {
			                "title": "优选节药包499",
			                "salerId": 36055,
			                "goods": [
			                    { "id": 279140, "num": 12 },
			                    { "id": 271220, "num": 12 },
			                    { "id": 273249, "num": 10 },
			                    { "id": 802728, "num": 5 },
			                    { "id": 799296, "num": 5 }
			                ],
			            },
			            {
			                "title": "优选节药包999",
			                "salerId": 36055,
			                "goods": [
			                    { "id": 266514, "num": 20 },
			                    { "id": 528529, "num": 31 },
			                    { "id": 268419, "num": 20 },
			                    { "id": 673069, "num": 20 },
			                    { "id": 799296, "num": 10 }
			                ],
			            },
			            {
			                "title": "优选节药包1999",
			                "salerId": 36055,
			                "goods": [
			                    { "id": 276004, "num": 40 },
			                    { "id": 272240, "num": 30 },
			                    { "id": 794913, "num": 44 },
			                    { "id": 334475, "num": 50 },
			                    { "id": 799296, "num": 30 }
			                ],
			            }
			        ],
					index_btn =$(_this).index(),
					goods     =data[index_btn]['goods'];

				$(_this).data('onff_click',!1);
			    for(let item of goods)
			    	cartE.addCart.call(_this,item.id,item.num);
			    cartE.statusCheck.call(_this);
			},
			inte($ele){

				clickEle_addcart=$ele;
				clickEle_addcart.data('count_a',0).data('count_s',0).data('onff_click',!0);
			},
			run($ele){

				//初始化
				cartE.inte($ele);
				//点击加入购物车
				clickEle_addcart.on('click',cartE.addCartEvent);
			},
		};

	return {
		inte:cartE.run,
	};
})();
cart.inte($('.goBuy'));

//nav
$('.list_toGo').on('click','.item_toGo',function(){
	$('html,body').stop(!0).animate({
		'scrollTop':$(`.setion${$(this).index()+1}`).offset().top,
	},666)
})
$('#toTop').on('click',()=>{
	$('html,body').stop(!0).animate({
		'scrollTop':0,
	},666)
});
})(window,jQuery)