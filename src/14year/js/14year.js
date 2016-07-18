//兼容处理
require('es5-shim');
require('es5-shim/es5-sham');
require('babel-polyfill');

//css
require('plugins/css/reset.css');
require('plugins/css/tangerine.css');
require('../css/14year.css');
((Win,$)=>{

	const data_goods=require('../js/goodData.js'),
		  {boomGoods,hotGoods,finallyGoods}=data_goods,
		  tempHtml_good=`
		  			<li class="wrap_middle wd_246 dis_ib">
						<div class="item_goods bg_white wd_i">
							<a href="{{link_goods}}" class="pic_item dis_b wrap_middle txt_c" target="_blank"><img src="{{src_goods}}_220x220" alt=""></a>
							<p class="fs_16 txt_of_e"><a href="{{link_goods}}" target="_blank">{{name_goods}}</a></p>
							<p class="fs_12 txt_of_e">规格：{{rule_goods}}<strong class="red">(限购{{count_limit}})</strong></p>
							<p class="fs_12 txt_of_e">厂家：{{name_shop}}</p>
							<p class="fs_20 red keepblank">￥{{price_now}}  <em class="fs_12 c99 txt_dct_lt">{{price_old}}</em></p>
						</div>
						<div class="btn_group wrap_middle bg_white wd_i txt_c pd_b_10 pd_t_10">
							<a class="btn wd_110 fs_16 pd_t_5 pd_b_5 bg_g9 btn_active" href="{{link_goods}}" target="_blank">立即购买</a>
						</div>
					</li>
		  `,
		  tempHtml_hotgood=`
		  			<li class="wrap_middle wd_246 dis_ib">
						<div class="item_goods bg_white wd_i">
							<a href="{{link_goods}}" class="pic_item dis_b wrap_middle txt_c" target="_blank"><img src="{{src_goods}}_220x220" alt=""></a>
							<p class="fs_16 txt_of_e"><a href="{{link_goods}}" target="_blank">{{name_goods}}</a></p>
							<p class="fs_12 txt_of_e">规格：{{rule_goods}}</p>
							<p class="fs_12 txt_of_e">厂家：{{name_shop}}</p>
							<p class="fs_20 red keepblank">￥{{price_now}}  <em class="fs_12 c99 txt_dct_lt">{{price_old}}</em></p>
						</div>
						<div class="btn_group wrap_middle bg_white wd_i txt_c pd_b_10 pd_t_10">
							<a class="btn wd_110 fs_16 pd_t_5 pd_b_5 bg_g9 btn_active" href="{{link_goods}}" target="_blank">立即购买</a>
						</div>
					</li>
		  `,
		  tempHtml_goodFix=`
		  			<li class="wd_246 dis_ib vtc_t"></li>
		  `,
		  getTimes=(value)=>{

		  		if(!value) return new Date()*1;
				if(!isNaN(new Date('1970-01-01 08:00:00')*1)) return new Date(value)*1;
				let
				    aValue=value.split(/\s+/),
					[iYear,iMouth,iDay]=aValue[0].split('-'),
					[iHour,iMin,iSec]=aValue[1].split(':');

				return new Date(iYear,iMouth-1,iDay)-new Date(1970,0,1)+(iSec*1+iMin*60+(iHour-8)*3600)*1000;
			},
		  // time_server=new Date()*1;
		  time_server=Win.time*1000;
// boomGoods && hotGoods
  (()=>{
  	//boomGoods
  	let
  		  wrap_boomGoods=$('.boomGoods .list_goods'),
  		  act_start='2016-07-21 10:00:00',
  		  startIndex=0,html_boomGoods='',
  		  isStart=()=>time_server-getTimes(act_start)>=0;

    if(isStart()) startIndex=Math.min(new Date(time_server).getDate()-21,6)*2;

    boomGoods.forEach(item=>{
    	html_boomGoods+=tempHtml_good
    					 .replace(/\{\{name_goods\}\}/,item.name_goods)
						 .replace(/\{\{name_shop\}\}/,item.name_shop)
						 .replace(/\{\{rule_goods\}\}/,item.rule_goods)
						 .replace(/\{\{price_old\}\}/,item.price_old)
						 .replace(/\{\{price_now\}\}/,item.price_now)
						 .replace(/\{\{link_goods\}\}/g,item.link_goods)
						 .replace(/\{\{src_goods\}\}/,item.src_goods)
						 .replace(/\{\{count_limit\}\}/,item.count_limit);
    })
    wrap_boomGoods.html(html_boomGoods+=tempHtml_goodFix.repeat(3));
    if(!isStart()) wrap_boomGoods.find('.btn').html('即将开抢').removeClass('btn_active');
    if(isStart()) $.each(wrap_boomGoods.find('li'),(i,item)=>{
    	if(i<startIndex) $(item).find('.btn').html('活动已结束').removeClass('btn_active');
    	if(i>startIndex+1) $(item).find('.btn').html('即将开抢').removeClass('btn_active');
    });
    //倒计时
    let
    	time_showEles=$('.boomGoods h2 em');
    //不在活动 未开始
	if(!isStart()){
		let
			times_diff=(getTimes(act_start)-time_server)/1000,
			day_diff=~~(times_diff/(3600*24)),
			hour_diff=~~(times_diff%(3600*24)/3600);

		hour_diff=hour_diff<10?'0'+hour_diff:hour_diff+'';
		time_showEles.eq(0).text(day_diff);
		time_showEles.eq(1).text(hour_diff[0]);
		time_showEles.eq(2).text(hour_diff[1]);
	}else{
		time_showEles.eq(0).text(0);
		time_showEles.eq(1).text(0);
		//在活动 未开始
		if(new Date(time_server).getHours()<10){
			time_showEles.eq(2).text(10-new Date(time_server).getHours()-1);
			$.each(wrap_boomGoods.find('.btn'),(i,item)=>{
				if(i>=startIndex&&i<startIndex+2) $(item).html('即将开抢').removeClass('btn_active');
			})
		}else{
		//在活动 进行中
			time_showEles.eq(2).text(0);
		}
		//在活动 已结束
		if(new Date(time_server).getDate()>27 || new Date(time_server).getMonth()+1>7){
			time_showEles.text(0);
			wrap_boomGoods.find('.btn').html('活动已结束').removeClass('btn_active');
		}
	};

	//hotGoods
	let
		wrap_hotGoods=$('.hotGoods .list_goods'),
		index_startHot=0,
		html_hotGoods='';

	if(isStart()) index_startHot=Math.min(new Date(time_server).getDate()-21,6)*10;

	hotGoods.splice(index_startHot, 10).forEach(item=>{
    	html_hotGoods+=tempHtml_hotgood
    					 .replace(/\{\{name_goods\}\}/,item.name_goods)
						 .replace(/\{\{name_shop\}\}/,item.name_shop)
						 .replace(/\{\{rule_goods\}\}/,item.rule_goods)
						 .replace(/\{\{price_old\}\}/,item.price_old)
						 .replace(/\{\{price_now\}\}/,item.price_now)
						 .replace(/\{\{link_goods\}\}/g,item.link_goods)
						 .replace(/\{\{src_goods\}\}/,item.src_goods);
    })
    wrap_hotGoods.html(html_hotGoods+=tempHtml_goodFix.repeat(3));
    if(!isStart()) wrap_hotGoods.find('.btn').html('即将开抢').removeClass('btn_active');
    if(new Date(time_server).getDate()>27 || new Date(time_server).getMonth()+1>7) wrap_hotGoods.find('.btn').html('活动已结束').removeClass('btn_active');

  })();

  //finallyGoods
  (()=>{

  	//content
  	let
  		wrap_finallyGoods=$('.finallyGoods .content_point .list_goods'),
  		html_finallyGoods='';

	finallyGoods.forEach(item=>{
		html_finallyGoods+=tempHtml_hotgood
		 				 .replace(/\{\{name_goods\}\}/,item.name_goods)
						 .replace(/\{\{name_shop\}\}/,item.name_shop)
						 .replace(/\{\{rule_goods\}\}/,item.rule_goods)
						 .replace(/\{\{price_old\}\}/,item.price_old)
						 .replace(/\{\{price_now\}\}/,item.price_now)
						 .replace(/\{\{link_goods\}\}/g,item.link_goods)
						 .replace(/\{\{src_goods\}\}/,item.src_goods);
	})
	wrap_finallyGoods.html(html_finallyGoods+=tempHtml_goodFix.repeat(3));

  	//倒计时
  	let
  		time_start='2016-07-28 00:00:00',
  		time_eles=$('.finallyGoods>h2').find('em'),
  		isStart=()=>time_server-getTimes(time_start)>=0;
	//在活动
  	if(isStart()){
  		//进行中
  		time_eles.text(0);
  		//已结束
		if(new Date(time_server).getDate()>28 || new Date(time_server).getMonth()+1>7) wrap_finallyGoods.find('.btn').html('活动已结束').removeClass('btn_active');
  	}else{
	//未进行
		let
			times_diff=(getTimes(time_start)-time_server)/1000,
			day_diff=~~(times_diff/(3600*24)),
			hour_diff=~~(times_diff%(3600*24)/3600);

		hour_diff=hour_diff<10 ? '0'+hour_diff : hour_diff+'';
  		time_eles.eq(0).text(day_diff);
		time_eles.eq(1).text(hour_diff[0]);
		time_eles.eq(2).text(hour_diff[1]);
		wrap_finallyGoods.find('.btn').html('即将开抢').removeClass('btn_active');
  	}

Win.console && console.log(`day: ${new Date(time_server).getDate()};hour: ${new Date(time_server).getHours()}`);
  })()


})(window,jQuery);

