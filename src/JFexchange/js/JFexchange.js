require('plugins/css/reset.css');
require('../css/JFexchange.css');

//兼容处理
require('es5-shim');

void function($, Win, undefined){

	function JFexchange(option)
	{
		if(!(this instanceof(JFexchange))) return new JFexchange(option);
		let _default = {
			tpisTpl: `<div class="mask" id="y_mask">
				    	<div class="content scaleHide" id="y_tipscontent">
				    		<div class="hd">
				    			<span class="close" onclick="var oMask = document.querySelector('#y_mask');oMask.parentNode.removeChild(oMask);"></span>
				    		</div>
				    		<div class="bd #{type}" data-amount="#{Amount}" data-orderAmount="#{OrderAmount}"></div>
				    	</div>
				    </div>`,
		    couponTpl: `<a class="at-btn" href="#{href}" target="_blank">
							<p title="#{companyName}">#{companyName}</p>
							<span title="#{companyName}">#{fullName}</span>
						</a>`,
			timerIdForInitCoupon: null,
		};
		this.config = $.extend(_default, option);
		this.run();
	};
	JFexchange.prototype.constructor = JFexchange;
	JFexchange.prototype = {
		loadMask: {
			loadingTpl: `<div id="loaddingMask">
							<div class="contentLoad"></div>
						 </div>`,
			show: function()
			{
				$('#loaddingMask').size() == 0 && $(document.body).append(this.loadingTpl);
			},
			remove: function()
			{
				$('#loaddingMask').size() && setTimeout(function(){
					$('#loaddingMask').remove();
				}, 666);
			}
		},
		popSure: {
			popSureTpl: `<div class="maskForSure" id="y_sureMask">
							<div class="contentSure scaleHide" id="y_sureContent">
								<div class="hd-s">
									<span class="close y_popClose" onclick="var oMask = document.querySelector('#y_sureMask');oMask.parentNode.removeChild(oMask);"></span>
								</div>
								<div class="bd-s">
									<p class="tips">
										你将花费<strong><%=Quantity%></strong>积分，<br>兑换<strong><%=Amount%></strong>元平台优惠券？
									</p>
								</div>
								<div class="ft-s">
									<div class="btn_group">
										<span class="sure" id="y_popSure">确定</span>
										<span class="cancel y_popCancel" onclick="var oMask = document.querySelector('#y_sureMask');oMask.parentNode.removeChild(oMask);">取消</span>
									</div>
								</div>
							</div>
						</div>`,
			show: function(obj, fnSure)
			{
				if($('#y_sureMask').size())	return;
				$(document.body).append(
						_.template(this.popSureTpl)(obj)
					);
				_.delay(function(){
					$('#y_sureContent').removeClass('scaleHide');
				}, 233);
				$('#y_popSure').one('click', function(){
					$('#y_sureMask').remove();
					fnSure();
				})
			}
		},
		formatTpl: function(htmlTpl, deal, data)
		{
			return htmlTpl.replace(/#\{(.*?)\}/g, function($, $1){
				let result;
				if(deal.hasOwnProperty($1))
					result = typeof deal[$] == 'function' ? deal[$1]() : deal[$1];
				else
					result = data.hasOwnProperty($1) ? data[$1] : $;

				return result;
			})
		},
		getTimes: function(value)
		{
			if(!value)	return new Date() * 1;
			let _list = value.split(/[^0-9]+/g);
			return new Date(
					_list[0], _list[1] - 1, _list[2],
					_list[3], _list[4], _list[5]
				);
		},
		getCountTimes: function(value)
		{
			let _now = new Date() * 1 + this.config.timeDiff,
				_future = this.getTimes(value);

			return _future - _now;
		},
		initCountDown: function()
		{
			let _this = this;
			function _to2(str)
			{
				return str > 9 ? str + '' : '0' + str;
			};
			function showCount($ele, settingTime)
			{
				let sName = settingTime.name;

				if(_this.getCountTimes(settingTime.endTime) < 0)
				{
					$ele.text(`该${sName}已结束`);
					return;
				}
				$ele[0].timerId = setInterval(function(){
					let _t = _this.getCountTimes(settingTime.startTime) / 1000,
						_day   = ~~(_t/3600/24),
						_hour  = ~~((_t/60/60)%24),
						_min   = ~~((_t/60)%60),
						_sec   = ~~(_t%60);

						_day  = _to2(_day);
						_hour = _to2(_hour);
						_min  = _to2(_min);
						_sec  = _to2(_sec);

						if(_t <= 0)
						{
							$ele.text(`${sName}活动进行中`);
							clearInterval($ele[0].timerId);
							return;
						}
						$ele.text(`距离${sName}开始还有${_day}天${_hour}时${_min}分${_sec}秒`);
				}, 1e3);
			};
			showCount($('.y_countDown1'), {
				startTime: '2016-11-11 10:00:00',
				endTime: '2016-11-12 23:59:59',
				name: '团购'
			})
			showCount($('.y_countDown2'), {
				startTime: '2016-11-11 14:00:00',
				endTime: '2016-11-11 16:00:00',
				name: '爆品'
			})
		},
		tips: function(obj)
		{
			$('#y_mask').size() && $('#y_mask').remove();
			let _this = this;
			$(document.body).append(
					_this.formatTpl(_this.config.tpisTpl, {}, obj)
				);
			setTimeout(function()
			{
				$('#y_tipscontent').removeClass('scaleHide');
			}, 888)
		},
		initCouponStatus: function()
		{
			let _this = this;

			if(_statusCoupon() != 0)
			{
				let _cls = _statusCoupon() == -1 ? 'looking' : 'ended';

				$.each(_this.config.$JFitems, function(){
					!$(this).hasClass(_cls) && $(this).addClass(_cls);
				})
				return;
			}

			$.ajax({
				type: 'GET',
				url: _this.config.ajaxUrlForGet,
				dataType: 'jsonp',
				jsonpCallback: 'receive',
				beforeSend: function()
				{
					_this.config.$JFitems.removeClass('looking');
					clearInterval(_this.config.timerIdForInitCoupon);
				},
				success: function(t)
				{
					if(t.status != 1)
					{
						// alert(t.msg); Who Care?
						return;
					}
					_cbGet(t.coupons);
				},
				error: function()
				{
					// alert('优惠券信息加载错误！');  Who Care?
				}
			})

			function _statusCoupon()
			{
				let _t_srt = _this.getTimes('2016-11-08 00:00:00'),
					_t_nd = _this.getTimes('2016-11-11 23:59:59'),
					_t_nw = _.now() + _this.config.timeDiff;

				return _t_nw - _t_srt < 0 ? -1 : _t_nw -_t_nd > 0 ? 1 : 0;
			}

			function _cbGet(t)
			{
				t.sort((a, b) => a.Amount - b.Amount);
				$.each(t, function(i){
					_this.config.$JFitems.eq(i).data('couponId', this.Id).data('Amount', this.Amount).data('OrderAmount', this.OrderAmount).data('Quantity', this.Quantity);
					if(this.UseableCount == 0)
					{
						_this.config.$JFitems.eq(i).addClass('over');
					}
				})
			}
		},
		initLink: function()
		{
			let _areaCode = $('#area').attr('data-areaCode');
			if(!_areaCode || $('#uid').attr('data-uid') == '0')
			{
				let hrefToPass = (Win.location.href.match(/https?:\/\/\w+\.\w+\.\w+/g) || ['https://activity.ypzdw.com'])[0].replace('activity', 'pass');
				alert('尚未登录！');
				Win.location.href = hrefToPass;

				return;
			}
			let _t = require('./picUrlData.js'),
				_this = this,
				_totalHtml = '';

			if($.isEmptyObject(_t))
			{
				$(document.body).html('<div class="shade"></div>').addClass('none');
				return;
			}

			$.each(_t.coupon, function(){
				_totalHtml += _this.formatTpl(_this.config.couponTpl, {}, this);
			})
			_this.config.$couponList.html(_totalHtml);

			$.each(_t.activity, function(i){
				_this.config.$activityItems.eq(i).attr('href', this.href);
			})
		},
		exchangeEv: function(e)
		{
			let $this = $(e.target),
				isAjaxing = $this.data('isAjaxing'),
				isOver = $this.hasClass('over'),
				isLooking = $this.hasClass('looking'),
				isEnded = $this.hasClass('ended'),
				couponId = $this.data('couponId'),
				_this = this;

			if(isOver || isLooking || isEnded || isAjaxing)
				return;

			if(!couponId)
			{
				alert('优惠券信息加载错误！');
				location.reload();
				return;
			}

			this.popSure.show(
					{
						Amount: $this.data('Amount'),
						Quantity: $this.data('Quantity')
					},
					function()
					{
						$.ajax({
							type: 'GET',
							url: _this.config.ajaxUrlForExchange,
							dataType: 'jsonp',
							jsonpCallback: 'receive',
							data: {
								couponId: couponId
							},
							beforeSend: function()
							{
								$this.data('isAjaxing', !0);
								_this.loadMask.show();
							},
							success: function(t)
							{
								if(t.status != 1)
								{
									let type = t.msg == '被抢完啦，您可以兑换其他优惠券' ? 'isover' : t.msg == '您已兑过此券，单人单日限兑换1张' ? 'exchanged' : null;
									if(type)
										_this.tips(
											{
												type: type
											}
										);
									else
										setTimeout(function(){
											alert(t.msg);
										}, 666);

									return;
								}
								_this.tips(
										{
											type: 'success',
											Amount: $this.data('Amount'),
											OrderAmount: $this.data('OrderAmount')
										}
									);
							},
							error: function()
							{
								alert('兑换失败！');
							}
						}).always(function(){
							_this.loadMask.remove();
							$this.data('isAjaxing', !1);
						})
					}
				);
		},
		init: function()
		{
			let _this = this;
			_this.initLink();
			_this.initCouponStatus();
			_this.config.timerIdForInitCoupon
			=	setInterval(function(){
					_this.initCouponStatus();
				}, 1000);
			_this.initCountDown();
		},
		run: function()
		{
			this.init();
			this.config.$JFitems.on('click', this.exchangeEv.bind(this));
		}
	};

	void function()
	{
		var urlPrefix =  (Win.location.href.match(/https?:\/\/\w+\.\w+\.\w+/g) || ['https://activity.ypzdw.com'])[0].replace('activity', 'www'),
			urlGet = urlPrefix + '/jifen/GetCoupons161111',
			urlExchange = urlPrefix + '/jifen/ReceiveCoupon';

		JFexchange(
			{
				$JFitems: $('.y_couponItem'),
				$couponList: $('.y_couponList'),
				$activityItems: $('.y_activityItem'),
				ajaxUrlForGet: urlGet,
				ajaxUrlForExchange: urlExchange,
				timeDiff: (Win.time*1000 || new Date() * 1) - new Date() * 1,
			}
		);
	}();
}(jQuery, window)