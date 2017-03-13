/**
	gamble a gamble; bicycle will be to motro;
	by xjc;
*/
//兼容处理
require('es5-shim');
require('es5-shim/es5-sham');
require('babel-polyfill');

require('../css/login.css');

define(['plugins/tools/localStorage.js', 'plugins/jquery/placeholder.js', './guide.js'],function(lS)
{
	var login = function()
	{
		var
			$sumbitBtn = $('#J_login'),
			$usNmIpt = $('#J_lg_usNm'),
			$psWdIpt = $('#J_lg_psWd'),
			$ntcInfo = $('#J_lg_ntc'),
			$lgMdIpt  = $('#J_login_method'),
			$GLOBAL_INFO = {
				mobile: { placeholder: '请输入手机号', usNm: '', psWd: '', maxLen: 11 },
				account: { placeholder: '请输入帐号',  usNm: '', psWd: '', maxLen: 20 }
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
						_isCorrectAccount = _isAccount && (/^\w+$/).test(_sVal);

					if(_isNull || _isEmpty || _isCorrectMobile || _isCorrectAccount)
						return;

					var re = _isMobile
					         ? /[^0-9]/g
					         : /[^0-9a-zA-Z]/g
					         ;
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
				submitHandler: function()
				{
					var $this = $(this);

					if($this.data('isAjaxing'))	return;
					if(!loginE.validateHandler())
						return false;
					else
						$this.data('isAjaxing', !0).addClass('gray');

					var method = $usNmIpt.closest('dd').siblings('dt')[0].className,
						userName = $usNmIpt.val();

					if(method == 'mobile')
						lS.set('loginMobile', userName);
					else
						lS.set('loginAccount', userName);

					lS.set('loginLastMethod', method);
					$lgMdIpt.val(method);
				},
				run: function()
				{
					loginE.initHoldplacer();loginE.initAccount();
					$('#J_lg_mobile, #J_lg_account').on('click', loginE.tabMethod);
					$sumbitBtn.on('click', loginE.submitHandler);
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