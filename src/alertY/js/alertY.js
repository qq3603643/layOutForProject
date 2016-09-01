//兼容处理
require('es5-shim');
require('es5-shim/es5-sham');
require('babel-polyfill');

//css
// require('plugins/css/reset.css')
require('../css/alertY.css')

define(['tools/localStorage'],(LS)=>{

	const tmpHtml=`
				<div id="alert-Y-mark">
					<div class="alert-Y-content">
						<span class="alert-Y-close"
							  onclick="var $mark=document.querySelector('#alert-Y-mark');$mark.parentNode.removeChild($mark)">
						</span>
					</div>
				</div>
	`;
	function isShow(){

		return !LS.get('Shown_YaoYi');
	};
	function inte(){

		$('body').append(tmpHtml);
		LS.set({
			'Shown_YaoYi':!0
		});
	};

	isShow() && inte();
});