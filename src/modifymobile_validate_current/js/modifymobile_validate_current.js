/**
	gamble a gamble; bicycle will be to motro;
	by xjc;
*/
/* 兼容处理 **/
require('es5-shim');
require('es5-shim/es5-sham');
require('babel-polyfill');

/* css **/
require('../css/modifymobile.css');

define(['plugins/tools/localStorage.js', 'plugins/tools/tracker.js', 'plugins/jquery/placeholder.js'], (Ls, Tracker) =>
{
	(() =>
	{
		let $ipt_vcode = $('#J_vcode'),
			$btn_getvcode = $('#J_getvcode'),
			$btn_submitmobile = $('#J_ensuremobile'),
			vCode_count_id,
			$count_vCode,
			$CONFIG_G =
			{
				btn_getvcode:['获取短信验证码', '<span class="red" id="J_vcode_count">120</span>秒后可重新获取'],
				difftime_getvcode: 120  // 单位：s
			},
			Main =
			{
				initPlaceholder($ele)
				{
					$ele.placeholder();
				},
				initCount()
				{
					let ensuremobile_vCode_starttime = Ls.get(`validatecurrentmobile_vCode_starttime_${ $.trim($('#J_orginalmobile').text()) }`);

					if(!ensuremobile_vCode_starttime)
						return;

					let diff = Math.floor((new Date() * 1 - ensuremobile_vCode_starttime * 1) / 1e3);

					if(diff >= $CONFIG_G.difftime_getvcode)
						return;

					$btn_getvcode.addClass('count')
								 .html($CONFIG_G.btn_getvcode[1].replace('120', 120-diff));

					Main.startCount();
				},
				startCount()
				{
					vCode_count_id = setInterval(() =>
						{
							let ensuremobile_vCode_starttime = Ls.get(`validatecurrentmobile_vCode_starttime_${ $.trim($('#J_orginalmobile').text()) }`),
								diff = Math.floor((new Date() * 1 - ensuremobile_vCode_starttime * 1) / 1e3);

							if(diff >= $CONFIG_G.difftime_getvcode)
							{
								clearInterval(vCode_count_id);
								$btn_getvcode.removeClass('count')
											 .html($CONFIG_G.btn_getvcode[0]);
							}
							else
							    $('#J_vcode_count').text($CONFIG_G.difftime_getvcode - diff * 1);
						}, 1000)
				},
				vcodeLimit()
				{
					Main.hidevCodeError();
					let $this = $(this),
						_val = $this.val();

					$this.val(_val = $.trim(_val));

					let _isEmpty = _val.length == 0,
						_isCorrect = /^\d+$/.test(_val);

					if(_isEmpty || _isCorrect)
						return;
					$this.val(_val.replace(/[^0-9]/g, ''));
				},
				showvCodeError(text)
				{
					text && $('#J_vcodeErrorInfo').text(text);

					$('#J_vcodeErrorInfo').css('display', 'inline-block');
					setTimeout(() =>
					{
						$('#J_vcodeErrorInfo').removeClass('hide');
					}, 10)
				},
				hidevCodeError()
				{
					$('#J_vcodeErrorInfo').css('display', 'none');
					$('#J_vcodeErrorInfo').addClass('hide');
				},
				getvCode()
				{
					let $this = $(this),
						_isCount = $this.hasClass('count');

					if(_isCount)
						return;

					let _isAjax = !!$this.data('isAjaxing');

					if(_isAjax)
					{
						layer.msg('验证码获取中！');
						return;
					}

					$.ajax(
					{
						url: '/account/sendSms',
						type: 'POST',
						data: { mobile: $.trim($('#J_orginalmobile').text()), type: 'VALIDATE_CURRENT_MOBILE_FOR_CHANGE' },
						beforeSend()
						{
							$this.data('isAjaxing', !0);
							$this.addClass('count')
						      	 .html($CONFIG_G.btn_getvcode[1]);

					      	//init count
					      	Ls.set(`validatecurrentmobile_vCode_starttime_${ $.trim($('#J_orginalmobile').text()) }`, new Date() * 1);
					      	$btn_getvcode.addClass('count')
					      			     .html($CONFIG_G.btn_getvcode[1]);

					      	Main.startCount();
						}
					})
					.done((da) =>
					{
						if(da.status != 1)
						{
							layer.msg('', { content: da.msg, icon: '0' });
							Ls.set(`validatecurrentmobile_vCode_starttime_${ $.trim($('#J_orginalmobile').text()) }`, new Date() * 1 - $CONFIG_G.difftime_getvcode * 1e3);
							return;
						}
					})
					.fail(() =>
					{
						layer.msg('', { content: 'Unknown Error', icon: '0' });
						Ls.set(`validatecurrentmobile_vCode_starttime_${ $.trim($('#J_orginalmobile').text()) }`, new Date() * 1 - $CONFIG_G.difftime_getvcode * 1e3);
					})
					.always(() =>
					{
						$this.data('isAjaxing', !1);
					})
				},
				validatevCode()
				{
					let _vcode = $ipt_vcode.val();
					return _vcode.length == 6;
				},
				trackerValidateCurrentMobile(resultcode)
				{
					Tracker.trace('click', 'clickvalidatecurrentmobile',
					{
						resultcode: resultcode
					})
				},
				submitMobile()
				{
					if(!Main.validatevCode())
					{
						$ipt_vcode.focus();
						Main.showvCodeError('验证码格式错误');
						return;
					}
					let $this = $(this),
						_isAjax = !!$this.data('isAjaxing');

					if(_isAjax)
						return;

					let load_id;
					$.ajax(
					{
						url: '/account/validateCurrentMobile',
						type: 'POST',
						data: { code: $.trim($ipt_vcode.val()) },
						beforeSend()
						{
							$this.data('isAjaxing', !0);
							load_id = layer.load(1, { shade: .3 });
						}
					})
					.done((da) =>
					{
						if(da.status != 1)
						{
							layer.msg('', { content: da.msg, icon: '2' });
							Main.trackerValidateCurrentMobile('-1');
							return;
						}

						Main.trackerValidateCurrentMobile('0');

						let href_jump = $('#changeMobileUrl').val();

						location.href = href_jump;
					})
					.fail(() =>
					{
						layer.msg('', { content: 'Unknown Error', icon: '0' });
						Main.trackerValidateCurrentMobile('-1');
					})
					.always(() =>
					{
						$this.data('isAjaxing', !1);
						layer.close(load_id);
					})
				},
				run()
				{
					Main.initPlaceholder($('input[type=text]'));
					Main.initCount();
					$ipt_vcode.on('propertychange input', Main.vcodeLimit);
					$btn_getvcode.on('click', Main.getvCode);
					$btn_submitmobile.on('click', Main.submitMobile);
				}
			}
		return {
			init: Main.run
		}
	})().init();
})