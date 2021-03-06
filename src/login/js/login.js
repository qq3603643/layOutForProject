/**
	gamble a gamble; bicycle will be to motro;
	by xjc;
*/
//兼容处理
require('es5-shim');
require('es5-shim/es5-sham');
require('babel-polyfill');

require('../css/login.css');

define(['plugins/tools/localStorage.js', 'plugins/tools/tracker.js', 'plugins/jquery/placeholder.js', './guide.js'],function(lS, Tracker)
{
	var login = function()
	{
		var $lgForm    = $('#J_login_form'),
			$sumbitBtn = $('#J_login'),
			$usNmIpt = $('#J_lg_usNm'),
			$psWdIpt = $('#J_lg_psWd'),
			$ntcInfo = $('#J_lg_ntc'),
			$lgMdIpt  = $('#J_login_method'),
			$lgHdusername = $('#J_login_hd_username'),
			da_tracker = {},
			$GLOBAL_INFO = {
				mobile: { name: 'mobileNm', placeholder: '请输入手机号', usNm: '', psWd: '', maxLen: 11 },
				account: { name: 'username', placeholder: '请输入帐号',  usNm: '', psWd: '', maxLen: 20 }
			},
			loginE = {
				initAccount: function()
				{
					var loginMethod = $lgMdIpt.val()
					                  || (location.href.indexOf('mobile') > -1 ? 'mobile' : '')
									  || lS.get('loginLastMethod')
									  || 'mobile',
						loginMobile, loginAccount;

					try
					{
						loginMobile = location.href.match(/mobile=(\w+)/)[1];
					}
					catch(er)
					{
						loginMobile  = lS.get('loginMobile');
					}

					loginAccount = lS.get('loginAccount');

					/* tracker **/
					da_tracker.tab = loginMethod;

					if(loginMethod == 'mobile')
					{
						$usNmIpt.val(loginMobile);
						return
					}
					if(loginMethod == 'account')
					{
						$('#J_lg_account').addClass('active')
						                  .siblings('span').removeClass('active');
	                    $usNmIpt.attr('placeholder', '请输入帐号')
                    			.attr('maxlength', $GLOBAL_INFO[loginMethod]['maxLen'])
                				.attr('name', $GLOBAL_INFO[loginMethod]['name'])
	                    		.closest('dd').siblings('dt').attr('class', 'account');
		                $usNmIpt.val(loginAccount);
					}
				},
				initHoldplacer: function()
				{
					$usNmIpt.add($psWdIpt).placeholder();
				},
				tabMethod: function()
				{
					var $this = $(this),
						isOn  = $this.hasClass('active'),
						method = this.id == 'J_lg_mobile'
								 ? 'mobile'
								 : this.id == 'J_lg_account'
								 ? 'account'
								 : null,
						otherMethod = method == 'mobile'
									  ? 'account'
									  : 'mobile';

				    if(isOn)	return;
				    if(!method) return;

				    $ntcInfo.addClass('hide');
				    $this.addClass('active').siblings('span').removeClass('active');
				    $usNmIpt.attr('placeholder', $GLOBAL_INFO[method]['placeholder'])
				    		.attr('name', $GLOBAL_INFO[method]['name'])
				            .closest('dd').siblings('dt').attr('class', method);
			    	// record
				    $GLOBAL_INFO[otherMethod]['usNm'] = $usNmIpt.val();
				    $GLOBAL_INFO[otherMethod]['psWd'] = $psWdIpt.val();
				    //recovery
				    $usNmIpt.val(
				    	$GLOBAL_INFO[method]['usNm']
				    	).attr('maxlength', $GLOBAL_INFO[method]['maxLen']);
				    $psWdIpt.val(
				    	$GLOBAL_INFO[method]['psWd']
				    	);
				},
				throughClick: function()
				{
					$(this).siblings('input').focus();
				},
				typeLimit: function()
				{
					var $this = $usNmIpt,
						_sVal = $this.val(),
						_method = $this.closest('dd').siblings('dt')[0].className,
						_isEmpty = _sVal.length == 0,
						_isMobile = _method == 'mobile',
						_isAccount = _method == 'account',
						_isNull = !_isMobile && !_isAccount,
						_isCorrectMobile = _isMobile && (/^\d+$/).test(_sVal),
						// _isCorrectAccount = _isAccount && (/^\w+$/).test(_sVal);
						/* 2017/4/5 解除帐号输入限制 **/
						_isCorrectAccount = _isAccount;

					if(_isNull || _isEmpty || _isCorrectMobile || _isCorrectAccount)
						return;

					var re = _isMobile
					         ? /[^0-9]/g
					         // : /[^0-9a-zA-Z]/g
					         /* 2017/4/5 解除帐号输入限制 **/
					         : null
					        ;
			        /* 2017/4/5 解除帐号输入限制 **/
			        re &&
					$this.val(
						_sVal.replace(re, '')
						);
				},
				hideNt: function()
				{
					$(this).val() && $ntcInfo.addClass('hide');
				},
				validateMobile: function()
				{
					var _method = $usNmIpt.closest('dd').siblings('dt')[0].className,
					    _val = $usNmIpt.val();

					if(_method == 'mobile'
					   && _val
					   && (_val.length !=11
					   || !(/^(((13[0-9]{1})|(15[0-3,5-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/).test(_val))
				      )
					{
						$ntcInfo.css('display', 'block');
						setTimeout(function(){
							$ntcInfo.removeClass('hide')
								    .find('.nt-txt').text('请输入有效的手机号码');
						}, 22)
						return false;
					}

					return true;
				},
				validateHandler: function()
				{
					var _isFull = true;
					$.each([$usNmIpt, $psWdIpt], function()
					{
						var _this = this,
							_val = _this.val(),
							// _isOnlyMobile = (this.attr('id') == 'J_lg_usNm') && !!_val && !(/^\d+$/).test(_val);
							_isOnlyMobile = false;

						if(!_val || _isOnlyMobile)
						{
							_isFull = !1;
							_this.focus();
							$ntcInfo.css('display', 'block');
							setTimeout(function(){
								$ntcInfo.removeClass('hide')
									    .find('.nt-txt').text(
									    	_isOnlyMobile ? '只能通过手机帐号登录'
									    				: _this.attr('placeholder')
									    	);
							}, 22)

							return false;
						}

					})

					return _isFull && loginE.validateMobile();
				},
				fetchDate: function()
				{

				},
				submitHandler: function(e)
				{

					var $this = $(this);

					if(!loginE.validateHandler())
					{
						e.preventDefault();
						return;
					}
					if($this.data('isAjaxing'))
					{
						e.preventDefault();
						return;
					}

					$this.data('isAjaxing', !0);

					var method = $usNmIpt.closest('dd').siblings('dt')[0].className,
						userName = $usNmIpt.val();

					if(method == 'mobile')
					{
						const mobile_username = lS.get(`${ userName }_username`);

						$lgHdusername.val(mobile_username);
						lS.set('loginMobile', userName);
					}
					else
					{
						$lgHdusername.remove();
						lS.set('loginAccount', userName);
					}

					lS.set('loginLastMethod', method);
					$lgMdIpt.val(method);

					/* tracker **/
					da_tracker.lasttab = method;
					Tracker.trace('click', 'clicklogin', da_tracker);

					return true;
				},
				run: function()
				{
					loginE.initHoldplacer();loginE.initAccount();
					$('#J_lg_mobile, #J_lg_account').on('click', loginE.tabMethod);
					$lgForm.on('submit', loginE.submitHandler);
					$usNmIpt.on('propertychange input', loginE.typeLimit);
					$usNmIpt.on('blur', loginE.validateMobile);
					$usNmIpt.add($psWdIpt).on('propertychange input', loginE.hideNt);
					$('.border_heightLight').on('click', loginE.throughClick);
				}
			};
		return {
			init: loginE.run
		}
	}();

	login.init();
})