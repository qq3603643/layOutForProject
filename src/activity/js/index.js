
	window.CreateListGood=(function(Win){

		var
			timeStart,timeEnd,$ListWrap,
			numOneDay,//每天更新的个数
			arrGoods,isLimitCount=!0,
			isLimitBtn=!0,
			isWithDay=!1,
			txt_btn={
				'isLooking':'即将开抢',
				'isDoing':'立即购买',
				'isEnd':'活动已结束',
			},
			time_now=Win.time*1000||new Date()*1,
			html_itemGoods=[
					' <li class="item_wrap {{hasDay}} {{today}}" data-day="{{dataDay}}">',
						'<div class="item_goods">',
							'<a href="{{link_goods}}" class="pic_item" target="_blank"><img src="{{src_goods}}_220x220" alt=""></a>',
							'<p class="fs_16 txt_of_e"><a href="{{link_goods}}" target="_blank">{{name_goods}}</a></p>',
							'<p class="fs_12 txt_of_e">规格：{{rule_goods}}<strong class="red">(限购{{count_limit}})</strong></p>',
							'<p class="fs_12 txt_of_e">厂家：{{name_shop}}</p>',
							'<p class="fs_20 red">￥{{price_now}}  <em class="fs_12 del">{{price_old}}</em></p>',
						'</div>',
						'<div class="btn_group">',
							'<a class="btn {{classBtn}}" href="{{link_goods}}" target="_blank">{{txtBtn}}</a>',
						'</div>',
					' </li> '].join(''),
			html_itemGoodsNoCountLimit=html_itemGoods.replace('<strong class="red">(限购{{count_limit}})</strong>',''),
			tempHtml_goodFix=' <li class="item_wrap_fix"></li> ',
			preventLink='javascript:;',
		actE={

			getTimes:function(value){

				if(!isNaN(new Date(value)*1)) return new Date(value)*1;
				var a=value.split(/[^0-9]+/);
				return new Date(
					a[0],a[1]-1,a[2],
					a[3],a[4],a[5]
					)*1;
			},
			formatTimes:function(times)
			{
				var _t = new Date(times),
					_y = _t.getFullYear(),
					_m = _t.getMonth() + 1,
					_d = _t.getDate();

				return [_y, _m, _d].join('-');
			},
			isStart:function(){

				return time_now > actE.getTimes(timeStart);
			},
			isEnd:function(){

				return time_now > actE.getTimes(timeEnd);
			},
			getIndex:function(){

				if(!actE.isStart()) return -10000;
				if(actE.isEnd()) return 10000;
				var
					time_pass=time_now-actE.getTimes(timeStart);
					day_pass=~~(time_pass/1000/60/60/24);

				return day_pass;
			},
			layOut:function(){

				var html='',txtBtn='',classBtn='',classToday='',isPreventLink=!1,
					startHour=timeStart.split(/[^0-9]+/)[3],
					index_start=~~(actE.getIndex()*numOneDay),
					index_end=(index_start+numOneDay);
				$.each(arrGoods,function(index,item){
					//end
					if(index<index_start){
						txtBtn=txt_btn.isEnd;
						classBtn='bg_gray';
						classToday='';
						isPreventLink=!0;
					}
					//looking
					if(index>=index_end){
						txtBtn=txt_btn.isLooking;
						classBtn='bg_gray';
						classToday='';
						isPreventLink=!0;
					}
					//doing&&end
					if(index>=index_start && index<index_end){
						if(new Date(time_now).getHours()<startHour){
							txtBtn=txt_btn.isEnd;
							classBtn='bg_gray';
							classToday='';
							isPreventLink=!0;
						}
						if(new Date(time_now).getHours()>=startHour){
							txtBtn=txt_btn.isDoing;
							classBtn='bg_active';
							classToday='today';
							isPreventLink=!1;
						}
					}

					var dataDay = actE.formatTimes(actE.getTimes(timeStart) + 1/numOneDay * 24 * 60 * 60 *1e3 * index);

					html+=(isLimitCount ? html_itemGoods : html_itemGoodsNoCountLimit)
									 .replace(/\{\{name_goods\}\}/,item.name_goods)
									 .replace(/\{\{name_shop\}\}/,item.name_shop)
									 .replace(/\{\{rule_goods\}\}/,item.rule_goods)
									 .replace(/\{\{price_old\}\}/,item.price_now ? item.price_old : '')
									 .replace(/\{\{price_now\}\}/,item.price_now ? item.price_now : item.price_old)
									 .replace(/\{\{link_goods\}\}/g,
									 	(isLimitBtn&&isPreventLink) ? preventLink : item.link_goods
									 	// item.link_goods
									 	)
									 .replace(/\{\{src_goods\}\}/,item.src_goods)
									 .replace(/\{\{count_limit\}\}/,item.count_limit)
									 .replace(/\{\{today\}\}/,classToday)
									 .replace(/\{\{classBtn\}\}/,classBtn)
									 .replace(/\{\{txtBtn\}\}/,txtBtn)
									 .replace(/\{\{hasDay\}\}/,isWithDay ? 'hasDay' : '')
									 .replace(/\{\{dataDay\}\}/,dataDay);
				})

				$ListWrap.html(html+=new Array(5).join(tempHtml_goodFix));
			},
			inte:function(obj){

				timeStart=obj.time_start;
				timeEnd=obj.time_end;
				arrGoods=obj.data;
				numOneDay=obj.amount_oneDay;
				$ListWrap=obj.container_list;
				isLimitCount=obj.isCountLimit;
				isLimitBtn=obj.isBtnLimit;
				isWithDay=obj.isHasDay;
			},
			run:function(obj){

				actE.inte(obj);
				actE.layOut();
			},
			run2:function(obj){

				arrGoods=obj.data;
				$ListWrap=obj.container_list;
				isLimitCount=obj.isCountLimit;
				isWithDay = obj.isHasDay;
				var html='',classBtn='bg_active',
				    classToday='',txtBtn=txt_btn.isDoing;
				$.each(arrGoods,function(index,item){
					html+=(isLimitCount ? html_itemGoods : html_itemGoodsNoCountLimit)
									 .replace(/\{\{name_goods\}\}/,item.name_goods)
									 .replace(/\{\{name_shop\}\}/,item.name_shop)
									 .replace(/\{\{rule_goods\}\}/,item.rule_goods)
									 .replace(/\{\{price_old\}\}/,item.price_now ? item.price_old : '')
									 .replace(/\{\{price_now\}\}/,item.price_now ? item.price_now : item.price_old)
									 .replace(/\{\{link_goods\}\}/g,item.link_goods)
									 .replace(/\{\{src_goods\}\}/,item.src_goods)
									 .replace(/\{\{today\}\}/,classToday)
									 .replace(/\{\{classBtn\}\}/,classBtn)
									 .replace(/\{\{txtBtn\}\}/,txtBtn)
									 .replace(/\{\{dataDay\}\}/, '2016-08-15');
				});

				$ListWrap.html(html+=new Array(5).join(tempHtml_goodFix));
			}
		};

		return {
			inteWithLimit:actE.run,
			inteNoLimit:actE.run2
		};

	})(window);