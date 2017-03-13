
//兼容处理
require('es5-shim');
require('es5-shim/es5-sham');
require('babel-polyfill');

define(['plugins/tools/localStorage.js'], (lS) =>
{
	((Win, _udf)=>
	{
		const $mobilelogin = $('#J_lg_mobile'),
			  $mobileretrieve = $('#J_mobileretrieve'),
			  $mobilelogin_guide = $('#J_login_mobile_guide'),
			  $guide_first = $('#J_guide_first'),
			  $guide_second = $('#J_guide_second'),
			  $guide_first_btn = $('#J_guide_first_btn'),
			  $guide_second_btn = $('#J_guide_second_btn');

		const guide =
		{
			isGuided()
			{
				return lS.get('login_mobile_guided') == '1';
			},
			showGuide(tag)
			{
				$mobilelogin_guide.show();
				if(tag == 'first')
				{
					$guide_second.addClass('hide');
					$guide_first.removeClass('hide');
				}
				else if(tag == 'second')
				{
					$guide_first.addClass('hide');
					$guide_second.removeClass('hide');
				}
			},
			initPos()
			{
				const rect_mobilelogin = $mobilelogin[0].getBoundingClientRect(),
					  rect_mobileretrieve = $mobileretrieve[0].getBoundingClientRect();

			    $guide_first.is(':visible') &&
				$guide_first.css(
				{
					left: rect_mobilelogin.left + 'px',
					top: rect_mobilelogin.top + 'px'
				});

				$guide_second.is(':visible') &&
				$guide_second.css(
				{
					left: (rect_mobileretrieve.left - 10) + 'px',
					top: (rect_mobileretrieve.top + 10) + 'px'
				});
			},
			guidefirstclickhandler()
			{
				guide.showGuide('second');
				guide.initPos();
			},
			guidesecondclickhandler()
			{
				$mobilelogin_guide.hide();
				lS.set('login_mobile_guided', '1');
			},
			run()
			{
				if(guide.isGuided())	return;
				guide.showGuide('first');
				guide.initPos();
				$guide_first_btn.on('click', guide.guidefirstclickhandler);
				$guide_second_btn.on('click', guide.guidesecondclickhandler);
				$(Win).on('resize scroll', (() =>
				{
					let t_s = new Date() * 1,
						timerId = null;

					return () =>
					{
						let t_n = new Date() * 1;

						clearTimeout(timerId);
						if(t_n - t_s >= 6)
						{
							guide.initPos();
							t_s = t_n;
						}
						else
							timerId = setTimeout(guide.initPos, 6);
					}
				})());
			}
		};

		return {
			init: guide.run
		};
	})(window).init();
})