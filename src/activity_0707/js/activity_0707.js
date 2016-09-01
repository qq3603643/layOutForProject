//兼容处理
require('es5-shim');
require('es5-shim/es5-sham');
require('babel-polyfill');

//css
require('plugins/css/tangerine.css');
require('../css/activity_0707.css');

(function(Win,$){

//商品初始化
let
	getTimes=value=>{
		if(!isNaN(new Date(value)*1)) return new Date(value)*1;
		let a=value.split(/[^0-9]+/);

		return new Date(
			a[0],a[1]-1,a[2],
			a[3],a[4],a[5]
			)*1;
	},
	tempHtml_itemgoods=`
			<li class="wrap_middle wd_246 dis_ib">
				<h3 class="dis_ib wrap_middle txt_c">
					<dl class="fs_24 lh_24"><dt class="yellow dis_ib">{{time_day}}</dt> <dd class="dis_ib white">{{time_hour}}</dd></dl>
					<span class="white">({{amout_act}})</span>
				</h3>
				<div class="item_goods bg_white wd_i">
					<h2 class="mg_0 icon_limit"></h2>
					<a class="pic_item dis_b wrap_middle txt_c" href="{{link_goods}}" target="_blank"><img src="{{src_goods}}" alt=""></a>
					<p class="fs_16 txt_of_e"><a href="{{link_goods}}" target="_blank">{{name_goods}}</a></p>
					<p class="fs_12 txt_of_e">规格：{{rule_goods}}<strong class="red">({{count_limit}})</strong></p>
					<p class="fs_12 txt_of_e">厂家：{{name_shop}}</p>
					<p class="fs_20 red keepblank">￥{{price_now}}  <em class="fs_12 c99 txt_dct_lt">￥{{price_old}}</em></p>
				</div>
				<div class="btn_group wrap_middle bg_white wd_i txt_c pd_b_10 pd_t_10">
					<a id="toBuy" class="btn wd_110 fs_16 pd_t_5 pd_b_5 bg_g9" href="{{link_goods}}" target="_blank">即将开抢</a>
				</div>
			</li>
	 `,
	 tempHtml_hotgoods=`
			<li class="wrap_middle wd_246 dis_ib">
				<div class="item_goods bg_white wd_i">
					<a class="pic_item dis_b wrap_middle txt_c" href="{{link_goods}}" target="_blank"><img src="{{src_goods}}" alt=""></a>
					<p class="fs_16 txt_of_e"><a href="{{link_goods}}" target="_blank">{{name_goods}}</a></p>
					<p class="fs_12 txt_of_e">规格：{{rule_goods}}</p>
					<p class="fs_12 txt_of_e">厂家：{{name_shop}}</p>
					<p class="fs_20 red keepblank">￥{{price_now}}  <em class="fs_12 c99 txt_dct_lt">￥{{price_old}}</em></p>
				</div>
				<div class="btn_group wrap_middle bg_white wd_i txt_c pd_b_10 pd_t_10">
					<a id="toBuy" class="btn wd_110 fs_16 pd_t_5 pd_b_5 bg_g9 btn_active" href="{{link_goods}}" target="_blank">立即购买</a>
				</div>
			</li>
	`,
	 tempHtml_itemgoodsFix=`
			<li class="wd_246 dis_ib vtc_t">
	 `,
	 {data_timeGoods,data_hotGoods}=require('./data.js');

//限时抢购html
let total_limitHtml='';
	for(let item of data_timeGoods){
		total_limitHtml+=tempHtml_itemgoods
						 .replace(/\{\{time_day\}\}/,item.time_day)
						 .replace(/\{\{time_hour\}\}/,item.time_hour)
						 .replace(/\{\{name_goods\}\}/,item.name_goods)
						 .replace(/\{\{name_shop\}\}/,item.name_shop)
						 .replace(/\{\{rule_goods\}\}/,item.rule_goods)
						 .replace(/\{\{price_old\}\}/,item.price_old)
						 .replace(/\{\{price_now\}\}/,item.price_now)
						 .replace(/\{\{count_limit\}\}/,item.count_limit)
						 .replace(/\{\{amout_act\}\}/,item.amout_act)
						 .replace(/\{\{link_goods\}\}/g,item.link_goods)
						 .replace(/\{\{src_goods\}\}/,item.src_goods)
	}
	$('.setion1').find('ul').html(total_limitHtml+=tempHtml_itemgoodsFix.repeat(3));

//凑单热品html
let total_hotHtml='';
	for(let item of data_hotGoods){
		total_hotHtml+=tempHtml_hotgoods
						 .replace(/\{\{name_goods\}\}/,item.name_goods)
						 .replace(/\{\{name_shop\}\}/,item.name_shop)
						 .replace(/\{\{rule_goods\}\}/,item.rule_goods)
						 .replace(/\{\{price_old\}\}/,item.price_old)
						 .replace(/\{\{price_now\}\}/,item.price_now)
						 .replace(/\{\{link_goods\}\}/g,item.link_goods)
						 .replace(/\{\{src_goods\}\}/,item.src_goods+'_220x220')
	}
	$('.setion2').find('ul').html(total_hotHtml+=tempHtml_itemgoodsFix.repeat(3));

//商品状态timeGoods
(()=>{

	const
		  time_server=Win.time*1000 || new Date()*1,
		  times_delay=15*3600*1000;  //活动持续时间
	let times_activity=[
		   '2016-08-09 09:00:00',
		   '2016-08-12 09:00:00'
		  ];
	   times_activity=times_activity.map(item=>getTimes(item)).concat(time_server).sort();
	let index=times_activity.findIndex(item=>item==time_server);

	if(index>0){
		//限时抢购开始
		index-=1;
		$.each($('.setion1 ul li'),(i,item)=>{
			let goods_now=$(item);
			if(i==index){
				if(time_server-times_activity[i]<times_delay){
					goods_now.find('.item_goods').addClass('today');
					goods_now.find('#toBuy').addClass('btn_active').html('立即购买');
				}else{
					goods_now.find('a').attr('href','javascript:0');
					goods_now.find('#toBuy').html('活动已结束');
				}
			}else{
				goods_now.find('a').attr('href','javascript:0');
				if(i>index) goods_now.find('#toBuy').html('即将开抢');
				if(i<index) goods_now.find('#toBuy').html('活动已结束');
			}
		})
	}else{
		$('.setion1').find('ul li').find('a').attr('href','javascript:0');
		$('.setion1').find('ul li').find('#toBuy').html('即将开抢');
	}
})();

//商品状态hotGoods
(()=>{

	const
		  time_server=Win.time*1000 || new Date()*1,
		  timeAct_start='2016-08-09 00:00:00',
		  timeAct_end='2016-08-15 23:59:59',
		  isEnd=()=>time_server-getTimes(timeAct_end)>0,
		  isStart=()=>time_server-getTimes(timeAct_start)>0 && !isEnd();

    if(isEnd()){
    	$('.setion2').find('ul li').find('#toBuy').html('活动已结束').removeClass('btn_active');
    }else if(!isStart()){
    	$('.setion2').find('ul li').find('#toBuy').html('即将开抢').removeClass('btn_active');
    }else{
    	$('.setion2').find('ul li').find('#toBuy').html('立即购买')
    }
})();

})(window,jQuery)