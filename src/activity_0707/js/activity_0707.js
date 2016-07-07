//兼容处理
require('es5-shim');
require('es5-shim/es5-sham');
require('babel-polyfill');

//css
require('plugins/css/tangerine.css');
require('../css/activity_0707.css');

(function(Win,$){

//商品初始化
let  tempHtml_itemgoods=`
			<li class="wrap_center wd_246 dis_ib">
				<h3 class="dis_ib wrap_center txt_c">
					<dl class="fs_24 lh_24"><dt class="yellow dis_ib">{{time_day}}</dt> <dd class="dis_ib white">{{time_hour}}</dd></dl>
					<span class="white">({{amout_act}})</span>
				</h3>
				<div class="item_goods bg_white wd_i">
					<h2 class="mg_0 icon_limit"></h2>
					<a class="pic_item dis_b wrap_center txt_c" href="{{link_goods}}" target="_blank"><img src="{{src_goods}}" alt=""></a>
					<p class="fs_16 txt_of_e"><a href="{{link_goods}}" target="_blank">{{name_goods}}</a></p>
					<p class="fs_12 txt_of_e">规格：{{rule_goods}}<strong class="red">({{count_limit}})</strong></p>
					<p class="fs_12 txt_of_e">厂家：{{name_shop}}</p>
					<p class="fs_20 red keepblank">￥{{price_now}}  <em class="fs_12 c99 txt_dct_lt">￥{{price_old}}</em></p>
				</div>
				<div class="btn_group wrap_center bg_white wd_i txt_c pd_b_10 pd_t_10">
					<a id="toBuy" class="btn wd_110 fs_16 pd_t_5 pd_b_5 bg_g9" <a href="{{link_goods}}" target="_blank">立即购买</a>
				</div>
			</li>
	 `,
	 tempHtml_hotgoods=`
			<li class="wrap_center wd_246 dis_ib">
				<div class="item_goods bg_white wd_i">
					<a class="pic_item dis_b wrap_center txt_c" href="{{link_goods}}" target="_blank"><img src="{{src_goods}}" alt=""></a>
					<p class="fs_16 txt_of_e"><a href="{{link_goods}}" target="_blank">{{name_goods}}</a></p>
					<p class="fs_12 txt_of_e">规格：{{rule_goods}}</p>
					<p class="fs_12 txt_of_e">厂家：{{name_shop}}</p>
					<p class="fs_20 red keepblank">￥{{price_now}}  <em class="fs_12 c99 txt_dct_lt">￥{{price_old}}</em></p>
				</div>
				<div class="btn_group wrap_center bg_white wd_i txt_c pd_b_10 pd_t_10">
					<a id="toBuy" class="btn wd_110 fs_16 pd_t_5 pd_b_5 bg_g9 btn_active" <a href="{{link_goods}}" target="_blank">立即购买</a>
				</div>
			</li>
	`,
	 tempHtml_itemgoodsFix=`
			<li class="wd_246 dis_ib vtc_t">
	 `,
	 data_timeGoods=[
		{
			'time_day':'7月12号',
			'time_hour':'下午两点开抢',
			'name_goods':'小柴胡颗粒',
			'name_shop':'广州白云山光华制药股份有限公司',
			'rule_goods':'10g*10袋/盒',
			'price_old':'12.25',
			'price_now':'6.40',
			'count_limit':'限购10',
			'amout_act':'限量2500盒',
			'link_goods':'https://caizhilin01.ypzdw.com/19198/773186',
			'src_goods':'https://static.ypzdw.com/Handler/FileHandler.ashx?fid=9ceaa49e-9dae-4b60-aea7-e20075193fe8_300X300&ShopUserId=67945',
		},
		{
			'time_day':'7月15号',
			'time_hour':'下午两点开抢',
			'name_goods':'气血和胶囊',
			'name_shop':'陕西摩美得制药有限公司',
			'rule_goods':'0.4g*12粒*3板*6袋',
			'price_old':'244.80',
			'price_now':'180.00',
			'count_limit':'限购1',
			'amout_act':'限量250盒',
			'link_goods':'https://caizhilin01.ypzdw.com/19205/794909',
			'src_goods':'http://image.360kad.com/group1/M00/33/AF/CgAgEVdO6emAPQ1kAAHA2gZu8Dc476.jpg',
		},
		{
			'time_day':'7月19号',
			'time_hour':'下午两点开抢',
			'name_goods':'咳特灵胶囊',
			'name_shop':'广州白云山医药集团股份有限公司白云山制药总厂',
			'rule_goods':'0.36g:1.4mg*30粒',
			'price_old':'6.90',
			'price_now':'4.00',
			'count_limit':'限购20',
			'amout_act':'限量5000盒',
			'link_goods':'https://caizhilin01.ypzdw.com/22332/794917',
			'src_goods':'https://static.ypzdw.com/Handler/FileHandler.ashx?fid=2aea7921-eead-4129-bbab-a979704f242b_300X300&ShopUserId=67945',
		},
		{
			'time_day':'7月22号',
			'time_hour':'下午两点开抢',
			'name_goods':'硫酸氢氯吡格雷片(波立维)',
			'name_shop':'赛诺菲(杭州)制药有限公司',
			'rule_goods':'75MG*7片/盒',
			'price_old':'123.90',
			'price_now':'90.50',
			'count_limit':'限购2',
			'amout_act':'限量500盒',
			'link_goods':'https://caizhilin01.ypzdw.com/19205/794927',
			'src_goods':'http://image.360kad.com/group1/M00/37/BB/CgAgEFdlaiyAAiDHAAGU519Lz5g536.jpg',
		},
		{
			'time_day':'7月26号',
			'time_hour':'下午两点开抢',
			'name_goods':'布洛芬缓释胶囊(芬必得胶囊)',
			'name_shop':'中美天津史克制药有限公司',
			'rule_goods':'300MG×20粒',
			'price_old':'14.80',
			'price_now':'8.80',
			'count_limit':'限购10',
			'amout_act':'限量2500盒',
			'link_goods':'https://caizhilin01.ypzdw.com/19198/776726',
			'src_goods':'https://static.ypzdw.com/Handler/FileHandler.ashx?fid=33d59e6b-ffea-4fb1-9a3e-7d5b3f1ce691_300X300_1&ShopUserId=67945',
		},
		{
			'time_day':'7月29号',
			'time_hour':'下午两点开抢',
			'name_goods':'安宫牛黄丸',
			'name_shop':'北京同仁堂股份有限公司同仁堂制药厂',
			'rule_goods':'3g',
			'price_old':'458.00',
			'price_now':'388.00',
			'count_limit':'限购1',
			'amout_act':'限量250盒',
			'link_goods':'https://caizhilin01.ypzdw.com/22279/794935',
			'src_goods':'http://image.360kad.com/group1/M00/37/B2/CgAgEFdlW9WAEP3lAAHHMN-W4Nk740.jpg',
		},
		{
			'time_day':'8月02号',
			'time_hour':'下午两点开抢',
			'name_goods':'虎标万金油',
			'name_shop':'厦门虎标医药有限公司',
			'rule_goods':'4g',
			'price_old':'4.60',
			'price_now':'2.50',
			'count_limit':'限购30',
			'amout_act':'限量7500盒',
			'link_goods':'https://caizhilin01.ypzdw.com/19198/772036',
			'src_goods':'http://image.360kad.com/group1/M00/09/D1/CgAgEFW4LrCANNviAAlmgIfOQtM70.jpeg',
		},
		{
			'time_day':'8月05号',
			'time_hour':'下午两点开抢',
			'name_goods':'丙酸氟替卡松鼻喷雾剂(辅舒良)',
			'name_shop':'葛兰素史克公司',
			'rule_goods':'50ug*120喷/盒',
			'price_old':'77.75',
			'price_now':'43.80',
			'count_limit':'限购2',
			'amout_act':'限量500盒',
			'link_goods':'https://caizhilin01.ypzdw.com/22289/794939',
			'src_goods':'http://image.360kad.com/group1/M00/37/B5/CgAgEFdlYBCAbSK9AAGbt02bDII369.jpg',
		},
	],
	data_hotGoods=[
		{
			'name_goods':'多维元素片(29)(善存片)',
			'name_shop':'惠氏制药有限公司',
			'rule_goods':'30片',
			'price_old':'39.63',
			'price_now':'30.48',
			'link_goods':'https://caizhilin01.ypzdw.com/19198/796932',
			'src_goods':'http://image.360kad.com/group1/M00/27/7F/CgAgEVcNqAOAMm_rAAHWwFZQB2E058.jpg',
		},
		{
			'name_goods':'孟鲁司特钠咀嚼片(顺尔宁)',
			'name_shop':'杭州默沙东制药有限公司',
			'rule_goods':'5mg*5片',
			'price_old':'36.80',
			'price_now':'35.23',
			'link_goods':'https://caizhilin01.ypzdw.com/19198/796923',
			'src_goods':'https://static.ypzdw.com/Handler/FileHandler.ashx?fid=808037f5-eb1e-493d-a4b7-fe675e5b2bed_300X300&ShopUserId=67945',
		},
		{
			'name_goods':'红色正金软膏',
			'name_shop':'广州白云山医药集团股份有限公司白云山何济公制药厂',
			'rule_goods':'4G精装',
			'price_old':'1.60',
			'price_now':'1.57',
			'link_goods':'https://caizhilin01.ypzdw.com/22241/797682',
			'src_goods':'https://static.ypzdw.com/Handler/FileHandler.ashx?fid=61252628-2197-40d5-bd98-b6e2dff532ee_300X300_1&ShopUserId=67945',
		},
		{
			'name_goods':'风油精',
			'name_shop':'广州白云山医药集团股份有限公司白云山何济公制药厂',
			'rule_goods':'3ml',
			'price_old':'2.10',
			'price_now':'1.75',
			'link_goods':'https://caizhilin01.ypzdw.com/19198/796931',
			'src_goods':'http://image.360kad.com/group1/M00/1C/F1/CgAgEVacuOKAb0pyAAJ6oBGXiIk68.jpeg',
		},
		{
			'name_goods':'贺普丁(拉米夫定片)',
			'name_shop':'葛兰素史克制药(苏州)有限公司',
			'rule_goods':'100MG×14片',
			'price_old':'185.00',
			'price_now':'175.35',
			'link_goods':'https://caizhilin01.ypzdw.com/19198/796921',
			'src_goods':'http://image.360kad.com/group1/M00/37/B3/CgAgEFdlXUuAfdVcAAGuPFzkxMU449.jpg',
		},
		{
			'name_goods':'多维元素片(29)(善存片)',
			'name_shop':'惠氏制药有限公司',
			'rule_goods':'60片',
			'price_old':'72.00',
			'price_now':'58.80',
			'link_goods':'https://caizhilin01.ypzdw.com/19198/796917',
			'src_goods':'http://image.360kad.com/group1/M00/07/76/CgAgEVWKQ1yANv4yAAF-FJI4wyQ943.jpg',
		},
		{
			'name_goods':'阿苯达唑片(肠虫清片)',
			'name_shop':'中美天津史克制药有限公司',
			'rule_goods':'0.2G*10片',
			'price_old':'9.50',
			'price_now':'8.80',
			'link_goods':'https://caizhilin01.ypzdw.com/19198/776694',
			'src_goods':'https://static.ypzdw.com/Handler/FileHandler.ashx?fid=7049bcf7-90d7-40ab-b4d3-b12b914a6f11_300X300&ShopUserId=67945',
		},
		{
			'name_goods':'莫匹罗星软膏',
			'name_shop':'中美天津史克制药有限公司',
			'rule_goods':'5G 2%',
			'price_old':'13.3',
			'price_now':'11.80',
			'link_goods':'https://caizhilin01.ypzdw.com/19198/796929',
			'src_goods':'http://image.360kad.com/group1/M00/07/9D/CgAgEFWKRFyAPHmhAAJcCJEpSUw794.jpg',
		},
		{
			'name_goods':'安宫牛黄丸',
			'name_shop':'天津中新药业集团股份有限公司达仁堂制药厂',
			'rule_goods':'3g',
			'price_old':'188.00',
			'price_now':'160.00',
			'link_goods':'https://caizhilin01.ypzdw.com/19198/776657',
			'src_goods':'http://img.800pharm.com/images/20160314/20160314173455_357.jpg',
		},
		{
			'name_goods':'氯沙坦钾片(科素亚)',
			'name_shop':'杭州默沙东制药有限公司',
			'rule_goods':'50mg×7片',
			'price_old':'44.60',
			'price_now':'39.38',
			'link_goods':'https://caizhilin01.ypzdw.com/19198/796919',
			'src_goods':'http://image.360kad.com/group1/M00/37/B5/CgAgEFdlYA2AeZqjAAHGvbh9rEM348.jpg',
		},
		{
			'name_goods':'氨咖黄敏胶囊(速效伤风胶囊)',
			'name_shop':'广州白云山光华制药股份有限公司',
			'rule_goods':'12粒/盒',
			'price_old':'3.80',
			'price_now':'3.70',
			'link_goods':'https://caizhilin01.ypzdw.com/19199/798121',
			'src_goods':'http://image.360kad.com/group1/M00/07/75/CgAgEFWKQ1WAJRODAAKl9Et3HHE601.jpg',
		},
		{
			'name_goods':'优信维生素C泡腾片',
			'name_shop':'江苏汉典生物科技有限公司',
			'rule_goods':'4g*10片(甜橙味)',
			'price_old':'16.24',
			'price_now':'6.00',
			'link_goods':'https://caizhilin01.ypzdw.com/22256/797673',
			'src_goods':'54',
			'src_goods':'http://image.qumaiyao.com/images/goods/20150924/small_734746FBCA460A96E529530D3E92E5A3D57D5F.JPG',
		},
	];
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
	total_limitHtml+=tempHtml_itemgoodsFix.repeat(3);
	$('.setion1').find('ul').html(total_limitHtml);

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
						 .replace(/\{\{src_goods\}\}/,item.src_goods)
	}
	total_hotHtml+=tempHtml_itemgoodsFix.repeat(3);
	$('.setion2').find('ul').html(total_hotHtml);

//初始化商品状态
const
	  // time_server=Win.time*1000;
	  time_server=new Date()*1;
	  // console.log(`month: ${new Date().getMonth()+1}; day: ${new Date().getDate()}`);
let times_activity=[
	   '2016-07-12 14:00:00',
	   '2016-07-15 14:00:00',
	   '2016-07-19 14:00:00',
	   '2016-07-22 14:00:00',
	   '2016-07-26 14:00:00',
	   '2016-07-29 14:00:00',
	   '2016-08-02 14:00:00',
	   '2016-08-05 14:00:00',
	  ];
   times_activity=times_activity.map(item=>new Date(item)*1).concat(time_server).sort();
   // console.log(times_activity);
let index=times_activity.findIndex(item=>item==time_server);
	// console.log(index);
if(index>0){
	//限时抢购开始
	index-=1;
	$.each($('.setion1 ul li'),(i,item)=>{
		let goods_now=$(item);
		if(i==index){
			// console.log(goods_now);
			goods_now.find('.item_goods').addClass('today');
			goods_now.find('#toBuy').addClass('btn_active');
		}else{
			goods_now.find('a').attr('href','javascript:0');
			if(i>index) goods_now.find('#toBuy').html('即将开抢');
			if(i<index) goods_now.find('#toBuy').html('活动已结束');
		}
	})
}else{
	$('.setion1').find('ul li').find('a').attr('href','javascript:0');
	$.each($('.setion1').find('ul li'),(i,item)=>{
		$(item).find('#toBuy').html('即将开抢');
	})
}

})(window,jQuery)