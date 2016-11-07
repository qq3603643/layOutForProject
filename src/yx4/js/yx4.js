//兼容处理
require('es5-shim');
require('es5-shim/es5-sham');
require('babel-polyfill');

//css
require('plugins/css/reset.css');
require('plugins/css/tangerine.css');
require('../css/yx4.css');

(function(Win,$){
//引入js
require('./followEach.js');
require('plugins/mine/clickSpecial.js');
const
	  tracker=require('tools/tracker.js'),
	  yjy=require('tools/config.js');

//购入车
const cart=(()=>{

	let
		url_addCart       ='/api/price/AddCart',
		timer_countDown   =null,
		times_checkStatus =66,
		COUNT_BAG, //药包的商品个数
		clickEle_addcart,
		text_tips=[
			{
				'isSuccess':'药包加入成功',
				'suggest':'药包已经放入您的购物车中，请到<a class="blue" href="'+ yjy.config.shop +'/Cart/Default" target="_blank">&#x3c;我的购物车&#x3e;</a>中查看。',
			},
			{
				'isSuccess':'药包加入失败',
				'suggest':'请重新操作！',
			},
			{
				'isSuccess':'您还没登录额！',
				'suggest':'<a class="btn" href="'+ yjy.config.pass +'">登录</a>',
			},
			'该优选包部分商品超出了您的经营范围,请到<a class="blue" href="' + yjy.config.pur + '/Member/Home/BusinessScope" target="_blank">会员中心&#x3e;我的资料&#x3e;经营范围</a>，进行确认！',
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
		cartE={
			tracker_addCart(code,id){

				let
					pageName      =$("#trackPn").val(),
					jDate_tracker ={};

				if(code==7){
					jDate_tracker['type']='success';
				}else{
					jDate_tracker['type']     ='failure';
					jDate_tracker['failCode'] =code;
				}
				jDate_tracker["goodsid"]=id;
				tracker.trace("click_addCart_"+pageName, jDate_tracker);
			},
			showTips(index){

				let _this=this,text_tips_error;

				if(_this.nodeType && _this.nodeType==1 && $(_this).data('isShowError')){
					text_tips_error=text_tips[3];
				};
				$('body').append(tempHtml_tips.replace(/\{\{isSuccess\}\}/,text_tips[index].isSuccess).replace(/\{\{suggest\}\}/,text_tips_error||text_tips[index].suggest));

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

					if(count_a==COUNT_BAG){
						cartE.callback_addCart.call(_this,count_s==COUNT_BAG);
						if(Win.console) console.log(`成功加入的数量为: ${count_s};失败加入的数量为: ${count_a-count_s}`);
						clearInterval(this.timer_checkStatus);
					}
				}, times_checkStatus)
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
						},
						'success':function(data){

							let count_s=$(_this).data('count_s');

							if(data['result']==7) $(_this).data('count_s',count_s+=1);
							if(data['result']==8 || data['result']==9) $(_this).data('isShowError',!0);
							cartE.tracker_addCart(data['result']+='',id);
						},
					}).always((data)=>{

						let count_a=$(_this).data('count_a');

						$(_this).data('count_a',count_a+=1);
						if(count_a==COUNT_BAG){
							setTimeout(()=>{
								//恢复按钮重置计数器等重置操作
								$(_this).text(text_btn.normal).addClass('bg_red').data('onff_click',!0).data('count_s',0).data('count_a',0).data('isShowError',!1);
							},233)
						}
					});
				};
			},
			callback_addCart(isSuccessToAdd){

				if($('#mark').size()>0) $('#mark').remove();

				let index=1-isSuccessToAdd,
					_this=this;

				cartE.showTips.call(_this,index);
			},
			addCartEvent(){

				let _this=this;
				COUNT_BAG = $(this).closest('.itemBag').attr('data-countBag') || $(this).closest('.listBag').attr('data-countBag');
				// console.log(COUNT_BAG);
				if(!cartE.userCheck()) return;
				if(!$(_this).data('onff_click')) return;

				let
		       		data=require('./data.js').data,
					index_btn =$.inArray(this, clickEle_addcart),
					goods     =data[index_btn]['goods'];

				$(_this).data('onff_click',!1);
			    for(let item of goods)
			    	cartE.addCart.call(_this,item.id,item.num);
			    cartE.statusCheck.call(_this);
			},
			inte($ele){

				clickEle_addcart=$ele;
				clickEle_addcart.data('count_a',0).data('count_s',0).data('onff_click',!0).data('isShowError',!1);
			},
			run($ele){

				//初始化(确定点击按钮及其的初始化)
				cartE.inte($ele);
				//点击加入购物车
				clickEle_addcart.on('click',cartE.addCartEvent);
			},
		};

	return {
		inte:cartE.run,
	};
})();
cart.inte($('.itemBag .btn'));

//nav导航
$('.setion').followEach($('.item_toGo'),'bg_red');
$('#toTop').on('click',()=>{ $('html,body').stop(!0).animate({
	'scrollTop':0
},666) })
//点击效果
$('.item_toGo').clickSpecial();

})(window,jQuery)