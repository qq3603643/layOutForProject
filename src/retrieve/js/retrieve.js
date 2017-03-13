/**
	gamble a gamble; bicycle will be to motro;
	by xjc;
*/
//兼容处理
require('es5-shim');
require('es5-shim/es5-sham');
require('babel-polyfill');

require('../css/retrieve.css');

define(['plugins/jquery/placeholder.js'], function()
{
	var retrieve = function()
	{
		var $submitBtn = $('#J_rt_submit'),
			$usNmIpt = $('#J_rt_usNm'),
			$codeIpt = null,
			$codeResetBtn = $('#J_rt_resetCode'),
			$notice = $('#J_rt_notice'),
			retrieveE =
			{
				initHoldplacer: function()
				{
					$usNmIpt.add($codeIpt).placeholder();
				},
				hideNt: function()
				{
					$(this).val() && $notice.addClass('hide');
				},
				typeLimit: function()
				{

				},
				validateHandler: function()
				{
					var _isPass = !0;

					$.each([$usNmIpt], function()
					{
						var $this = $(this),
							val = $this.val();

						$this.val(
								val = $.trim(val)
							);

						if(!val)
						{
							$this.focus();
							$notice.text($this.attr('placeholder')).css('transition', '.4s');
							setTimeout(function(){
								$notice.removeClass('hide');
							}, 22);
							_isPass = false;
							return false;
						}
					})

					return _isPass;
				},
				submitHandler: function()
				{
					if(!retrieveE.validateHandler())
						return;
					if($(this).data('isAjaxing'))
						return;

					retrieveE.fetchDate.call(this);
				},
				preventForm: function(e)
				{
					var keycode = (e.keyCode ? e.keyCode : e.which);

				    if(keycode == '13')
			    	{
			    		retrieveE.submitHandler.call($submitBtn[0]);
						return false;
			    	}
				},
				fetchDate: function()
				{
					var $this = $(this),
						senData = { account: $usNmIpt.val() };

					$.ajax(
					{
						url: '/retrieveMobileByAccount',
						type: 'POST',
						data: senData,
						beforeSend: function()
						{
							$this.addClass('gray').text('提交中');
						}
					})
					.done(
							function(data)
							{
								if(data.status != 1)
								{
									alert(data.msg);
									return false;
								}

								$('#J_rt_from').addClass('hide')
											   .siblings('#J_rt_result').css('display', 'block');

							    setTimeout(function(){
							    	$('#J_rt_result').removeClass('hide');
							    }, 22)

						    	var sAccount = data.data || '{ NULL }';

						    	$('#J_usMobile').text(sAccount);
							    localStorage.setItem('loginMobile', sAccount);
							}
						)
					.fail(
							function()
							{
								alert('Unkown Error!')
							}
						)
					.always(
							function()
							{
								$this.removeClass('gray').text('下一步');
							}
						)
				},
				run: function()
				{
					retrieveE.initHoldplacer();
					$submitBtn.on('click', retrieveE.submitHandler);
					// $codeIpt.on('propertychange input', retrieveE.typeLimit);
					$usNmIpt.add($codeIpt).on('propertychange input', retrieveE.hideNt);
					$usNmIpt.on('keypress', retrieveE.preventForm);
				}
			};

		return {
			init: retrieveE.run
		};
	}();


	retrieve.init();
})