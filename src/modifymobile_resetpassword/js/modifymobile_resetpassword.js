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

define(['plugins/tools/tracker.js'], (Tracker) =>
{
	(() =>
	{
		let $ipt_password = $('#J_password'),
			$ipt_passwordrepeat = $('#J_repeatpassword'),
			$btn_submit = $('#J_submit'),
			Main =
			{
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
				validatePassword()
				{
					let _valOrigin = $ipt_password.val(),
						_valRepeat = $ipt_passwordrepeat.val();

					if(_valOrigin.length == 0)
					{
						Main.showvCodeError('密码不能为空');
						$ipt_password.focus();
						return false;
					}
					if(_valRepeat.length == 0)
					{
						Main.showvCodeError('请确认密码');
						$ipt_passwordrepeat.focus();
						return false;
					}
					if(_valOrigin != _valRepeat)
					{
						Main.showvCodeError('两次密码输入不一致');
						$ipt_password.focus();
						return false;
					}

					return true;
				},
				trackerChangepassword(resultcode)
				{
					if(!resultcode)
						return;

					Tracker.trace('click', 'clickchangepassword',
					{
						resultcode: resultcode
					})
				},
				submitHandler()
				{
					if(!Main.validatePassword())
						return;

					let $this = $(this),
						_isAjax = !!$this.data('isAjaxing');

					if(_isAjax)
						return;

					let load_id;
					$.ajax(
					{
						url: '/account/changePassword',
						type: 'POST',
						data: { password: $ipt_password.val(), confirmPassword: $ipt_passwordrepeat.val() },
						beforeSend()
						{
							$this.data('isAjaxing', !0);
							load_id = layer.load(1, { shade: .3 })
						}
					})
					.done((da) =>
					{
						if(da.status != 1)
						{
							layer.msg('', { content: da.msg, icon: '2' });
							Main.trackerChangepassword('-1');
							return;
						}

						Main.trackerChangepassword('0');

						let href_jump = $('#tipsUrl').val();

						location.href = href_jump;
					})
					.fail(() =>
					{
						layer.msg('', { content: 'Unknow Error', icon: '0' });
						Main.trackerChangepassword('-1');
					})
					.always(() =>
					{
						$this.data('isAjaxing', !1);
						layer.close(load_id);
					})
				},
				run()
				{
					$ipt_password.add($ipt_passwordrepeat).on('propertychange input', Main.hidevCodeError);
					$btn_submit.on('click', Main.submitHandler);
				}
			}

		return {
			init: Main.run
		}
	})().init();
})