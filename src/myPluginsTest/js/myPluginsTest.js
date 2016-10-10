
require('plugins/mine/scrollUnique.js');
require('plugins/mine/clickSpecial.js');
require('plugins/mine/cssTransitionShow.js');
require('plugins/mine/titleFollow.js');

$(()=>{

	$('.inner').scrollUnique();
	$('.btn').clickSpecial();
	$.fn.placeHolder = function(){

		var inte = function()
				   {
					   var $this = $(this),
					   	   txtPlaceHolder = $this.attr('data-placeholder');

				   	   !$this.val() && $this.siblings('.tplPlaceHolder').text(txtPlaceHolder);
				   };
	   this.each(inte);
	   var inputWatch = function()
	   					{
	   						var $this = $(this),
	   							txtPlaceHolder = $this.attr('data-placeholder'),
	   							value = $this.val(),
	   							$label = $this.siblings('.tplPlaceHolder');

   							if(value) $label.text('');
   							else $label.text(txtPlaceHolder);

	   					};
		this.on('propertychange input',inputWatch);
	};

	$('.text').placeHolder();

	$('#t_toggle').on('click',function(){

		function beforeShow()
				 {
				 	console.log('beforeShow');
				 };
		var $ele = $('.toggle');
		if($ele.is(':visible')) $ele.hide();
		else $ele.cssTransitionShow(beforeShow);
	})

	$('.btn').titleFollow();
})