//兼容处理
require('es5-shim');
require('es5-shim/es5-sham');
require('babel-polyfill');

//css
require('plugins/css/reset.css');
require('../css/yearEndact.css');

//introduce
require('./followEach.js');

void function($, _root, undefined)
{
	function Log()
	{
		try{
			console.log.apply(console, _.toArray(arguments))
		}catch(er){}
	}
	//弹窗
	var tip = function()
	{
		var status = ['success', 'exchanged', 'over'],  //icon: 0 成功 1 已兑换 2 已兑完
			tplConfirm = `<div class="mask">
					    	<div class="comfirm-ct content hideS">
					    		<span class="close" onclick="var oMask=document.querySelector('.mask');oMask.parentNode.removeChild(oMask);"></span>
					    		<div class="hd"></div>
					    		<div class="bd">
					    			你将花费<span class="red"><%= jifen %></span>积分，<br>
					    			兑换<span class="red"><%= money %></span>元平台优惠券！
					    		</div>
					    		<div class="btns">
					    			<span class="btn sure" id="y_sureExchange">确定</span>
					    			<span class="btn cancel" onclick="var oMask=document.querySelector('.mask');oMask.parentNode.removeChild(oMask);">取消</span>
					    		</div>
					    	</div>
					    </div>`,
			tplAlert = `<div class="mask">
							<div class="content hideS tip-ct <%= status %>">
								<span class="close" onclick="var oMask=document.querySelector('.mask');oMask.parentNode.removeChild(oMask);"></span>
								<div class="hd"></div>
								<div class="bd">
									<h4><%= tit %></h4>
									<%= content %>
								</div>
							</div>
						</div>`,
			tplLoad = `<div class="mask maskLoad"></div>`,

		tipE = {
			showMt: function()
			{
				_.delay(function(){
					$('.mask .content').removeClass('hideS');
				}, 233)
			},
			confirm: function(opts, fnS)
			{
				$('body').append(
						_.template(tplConfirm)(opts)
					);
				tipE.showMt();

				document.querySelector('#y_sureExchange').onclick = function()
				{
					fnS.call(this);
					_.delay(function(){
						$('.mask').remove();
					}, 0);
				};

			},
			alert: function(opts)
			{
				var _status = status[opts.icon],
					_tit = opts.tit,
					_content = opts.content;

				$('body').append(
						_.template(tplAlert)({ status: _status, content: _content, tit: _tit })
					);
				tipE.showMt();
			},
			load: function(opt)
			{
				if(opt == undefined || opt == true)
					$('body').append(tplLoad);
				else
					$('.maskLoad').remove();
			}
		};

		return {
			confirm: tipE.confirm,
			alert: tipE.alert,
			load: tipE.load
		}
	}();

	// tip.alert({
	// 	icon: '2',
	// 	content: `今天已经没有可兑换的优惠券了，<br>
	// 			  请明天再来。`
	// })
	// tip.confirm({
	// 	jifen: 1000,
	// 	money: 10
	// }, function(){
	// 	alert();
	// })
	// tip.load();
	//Main
	var cpExcg = function()
	{
		var ajaxUrl= {
				getCpStatus: $('#shopDomain').attr('data-domain') + '/jifen/GetTopicActivityCoupons',
				exchangeCp: $('#shopDomain').attr('data-domain') + '/jifen/ReceiveCoupon'
			},
			DATA = require('./data.js'),
			tDiff = ((_root.time * 1e3) || _.now()) - _.now(),
			getTimes = function(t)
			{
				if(!t)	return _.now();

				var _aT = t.split(/[^\d]+/g);

				return new Date(
						_aT[0], _aT[1] - 1, _aT[2],
						_aT[3], _aT[4], _aT[5]
					) * 1;
			},
			tplCode = `<div class="mask_code">
					    	<div class="ct_code hideS">
					    		<span class="close" onclick="var oMask=document.querySelector('.mask_code');oMask.parentNode.removeChild(oMask);"></span>
					    	</div>
					    </div>`,
		    tplCompany = ` <li class="salerCp">
							<p class="shortName" title="<%= companyName %>"><%= companyName %></p>
							<p class="fullname" title="<%= fullName %>"><%= fullName %></p>
							<a class="goShop" target="_blank" href="<%= href %>">进店领券</a>
						  </li> `,

		cpE = {
			userCheck: function()
			{
				var _areaCode = $('#area').attr('data-areaCode');
				if(!_areaCode || $('#uid').attr('data-uid') == '0')
				{
					var hrefToPass = (_root.location.href.match(/https?:\/\/\w+\.\w+\.\w+/g) || ['https://activity.ypzdw.com'])[0].replace('activity', 'pass');
					alert('尚未登录！');
					_root.location.href = hrefToPass;

					return false;
				}

				if(_.isEmpty(DATA))
				{
					alert('你所在区域暂无法参加该活动！');
					var hrefToIndex = _root.location.href.match(/https?:\/\/\w+\.\w+\.\w+/g) || ['https://activity.ypzdw.com'][0].replace('activity', 'www');
					_root.location.href = hrefToIndex;

					return false;
				}

				return true;
			},
			fetchCps: function()
			{
				$.ajax({
					type: 'GET',
					url: ajaxUrl.getCpStatus,
					dataType: 'jsonp',
					jsonpCallback: 'receive',
					data: {
						activityCode: '20161212'
					},
					beforeSend: function()
					{},
					success: function(t)
					{
						Log('This Is couponsData: ', t);
						if(t.status != 1)
						{
							$.each($('.st2 .jifenCps .jifenCp > span'), function(){
								$(this).addClass('now');
							})
							return;
						}

						_cbGetCps(t.coupons);
					},
					error: cpE.initCps
				});

				function _cbGetCps(t)
				{
					t.sort((a, b) => a.Amount - b.Amount);
					var $cpEles = $('.st2 .jifenCps .jifenCp');
					_.each(t, function(o, i){
						$cpEles.eq(i).attr({
							'data-restAmount': o.UseableCount,
							'data-couponId': o.Id
						})
					})
					cpE.initCps();
				}
			},
			initCps: function()
			{
				var _t = '2016-12-05-00-00-00 2016-12-09-23-59-59',
					_ts = _t.split(/\s+/),
					_now = _.now() + tDiff,
					_index,
					_status;

				_ts = _.chain(_ts)
						.map(function(v){
							return getTimes(v)
						})
						.push(_now)
						.sort()
						.value();

				_index = _.indexOf(_ts, _now);
				_status = _index == 0 ? 'look' : _index == 1 ? 'now' : _index == 2 ? 'end' : null;

				$.each($('.st2 .jifenCp'), function()
				{
					if(_status == 'look')
					{
						$(this).find('.btn').addClass('looking');
					}else if(_status == 'now')
					{
						$(this).find('.btn').addClass('now');
						if($(this).attr('data-restAmount') == 0)
							$(this).addClass('over');
					}else if(_status == 'end')
					{
						$(this).addClass('end')
							   .find('.btn').addClass('now');
					}
				})
			},
			exchangeCp: function()
			{
				var $this = $(this),
					$li = $this.closest('li');

				if($this.hasClass('looking') || $li.hasClass('end') || $li.hasClass('over'))
					return;

				if($this.data('isAjaxing'))	return;

				var _jifen = $li.attr('data-jfTake'),
					_money = $li.attr('data-moenyCp'),
					_amount = $li.attr('data-amount');

				tip.confirm({
					jifen: _jifen,
					money: _money
				}, function(){
					_excgEv();
				})

				function _excgEv()
				{
					$.ajax({
						type: 'GET',
						url: ajaxUrl.exchangeCp,
						dataType: 'jsonp',
						jsonpCallback: 'receive',
						data: {
							couponId: $li.attr('data-couponId')
						},
						beforeSend: function()
						{
							$this.data('isAjaxinig', !0);
							tip.load();
						},
						success: _cbExcg
					}).always(function(){
								$this.data('isAjaxinig', !1);
								tip.load(false);
							})
					}
				function _cbExcg(t)
				{
					var _status = t.status;

					if(_status == 1)
						tip.alert({
							icon: 0,
							tit: '兑换成功！',
							content: `${_money}元优惠券，满${_amount}元可用`
						})
					else
						tip.alert({
							icon: _.random(1, 2),
							tit: '很遗憾！',
							content: t.msg
						})
				}
			},
			initTopic: function()
			{
				var _now = _.now() + tDiff,
					_banClick = 'javascript:;',
					_text = ['即将开始', '马上进入', '已结束'];

				function _timeRang($e, tr)
				{
					var $bar = $e.find('.ft a'),
						_list = tr.split(/\s+/g),
						_tsrt = getTimes(_list[0]),
						_tend = getTimes(_list[1]);

					//安徽地区活动 秒杀爆品 无法征集 全部显示下架
					if($('#area').attr('data-areaCode') == '340000' && $e.hasClass('st7'))
					{
						$bar.text('已下架');
						return;
					}

					if(_now < _tsrt)
						$bar.text(_text[0]);
					else if(_now > _tsrt && _now < _tend)
						$bar.text(_text[1]);
					else if(_now > _tend)
						$bar.text(_text[2]);
				}
				function _timeDays($e, tr)
				{
					var $bar = $e.find('.ft a'),
						_oneDay = 24 * 60 * 60 * 1e3,
						_list = tr.split(/\s+/g);

					_.chain(_list)
						.map(function(v){
							return [getTimes(v), getTimes(v) + _oneDay];
						})
						.each(function(list, index, ts){
							if(_now > list[0] && _now < list[1])
							{
								$bar.text(_text[1]);
								return false;
							}

							if(index == (ts.length-1) && _now > list[1])
								$bar.text(_text[2]);
						})
						.value();

				}
				_timeRang($('.setion.st3'), '2016-12-05-00-00-00 2016-12-11-23-59-59');
				_timeRang($('.setion.st4'), '2016-12-12-00-00-00 2016-12-18-23-59-59');
				_timeRang($('.setion.st9'), '2016-12-19-00-00-00 2016-12-23-23-59-59');
				_timeDays($('.setion.st5'), '2016-12-05-00-00-00 2016-12-12-00-00-00 2016-12-19-00-00-00');
				_timeRang($('.setion.st7'), '2016-12-05-00-00-00 2016-12-25-23-59-59');
			},
			initSaler: function()
			{
				var _cps = DATA.coupons;

				Log('This Is CompanyData: ', _cps);
				$('.st2 .salerCps').prepend(
						_.reduce(_cps, function(t, o){
							t += _.template(tplCompany)(o);
							return t;
						},
						new String())
					)
			},
			initLink: function()
			{
				var _topic = DATA.topics;

				function filterHref(arr)
				{
					var _ts = '2016-12-05-00-00-00 2016-12-12-00-00-00 2016-12-19-00-00-00',
						_oneDay = 24 * 60 * 60 * 1e3,
						_tnow = _.now() + tDiff,
						_index = null;

					_.chain(_ts.split(/\s+/g))
						.map(function(v){
							return [getTimes(v), getTimes(v) + _oneDay];
						})
						.each(function(list, i){
							if(_tnow > list[0] && _tnow < list[1])
							{
								_index = i;
								return false;
							}
						})
						.value();

					return _index == null ? 'javascript:;' : arr[_index];
				}
				Log('This Is TopicData: ', _topic)
				_.each(_topic, function(v, k){
					if(k == 'scdSkill')	v = filterHref(v);
					$.trim($('.updateHref').filter('.' + k).text()) == '马上进入' && $('.updateHref').filter('.' + k).attr('href', v);
				})
			},
			showCode: function()
			{
				$('body').append(tplCode);
				_.delay(function(){
					$('.mask_code .ct_code').removeClass('hideS');
				}, 233)
			},
			init: function()
			{
				Log('NOW TIME: ', new Date());
				if(!cpE.userCheck())	return;
				cpE.fetchCps();
				cpE.initSaler();
				cpE.initTopic();
				cpE.initLink();
			},
			run: function()
			{
				cpE.init();
				$('.st2 .jifenCp .btn').on('click', cpE.exchangeCp);
				$('.st6 .scanCode').on('click', cpE.showCode);
			}
		};

		return {
			init: cpE.run
		};
	}();

	cpExcg.init();

	//nav导航
	void function()
	{
		$('.modelFollw').followEach($('.model'),'on');
		$('#toTop').on('click',()=>{ $('html,body').stop(!0).animate({
			'scrollTop':0
		},666) });
		$(_root).on('scroll', function(){
			var _sclTop = $(this).scrollTop(),
				_modelTop = 1000;

			if(_sclTop > _modelTop)	$('.sdNav').removeClass('hideS');
			else $('.sdNav').addClass('hideS');
		})
		$('html, body').scrollTop($(_root).scrollTop() + 1);
	}();
}(jQuery, window);
