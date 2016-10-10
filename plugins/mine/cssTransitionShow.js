
(function(factory){

	if(typeof define == 'function' && define.amd)
		define(['jquery'],factory);
	else if(typeof module == 'object' && module.export)
		factory(require('jquery'));
	else
		factory(jQuery);
})(function($){

	$.fn.extend({
		'cssTransitionShow': function(fn){

			function handleShow()
					 {
					 	var _this = this,
					 		$this = $(_this);

				 		if($this.is(':visible')) return;
				 		fn && fn();
				 		$this.show();
				 		var _heightTarget = _this.clientHeight;
				 		$this.css({
				 			'height': '0px',
				 			'transition': 'height 0s'
				 		});

				 		setTimeout(function(){
				 			$this.css({
					 			'height': _heightTarget + 'px',
					 			'transition': 'height .6s'
					 		});
				 		},0);
					 };
			this.each(handleShow);
		}
	});
})