require('../css/TaxTips.css');

(function($, Win, undefined){

	var TaxTips = function(){
		var hrefPrefix = (Win.location.href.match(/https?:\/\/\w+\.\w+\.\w+/g) || ['https://www.ypzdw.com'])[0].replace('www', 'pur'),
			hrefToSettax = hrefPrefix + '/Member/Tax',
			isShowClose = Win.location.href.indexOf('Order/Tax') == -1,
			tplClose = isShowClose ? '<span class="close" id="y_taxClose"></span>' : '',
			tplTips = '<div id="maskForTax">'+
					    	'<div class="content scaleHide">'+
					    		tplClose+
					    		'<div class="taxLogo"></div>'+
						    	'<div class="inner">'+
						    		'<p class="wordsTips">'+
						    			'亲，请及时更新发票资料，以便您更快收到发票！'+
						    		'</p>'+
						    		'<div class="btn_group">'+
						    			'<a class="btn" id="y_taxGoto" href="'+ hrefToSettax +'">前往更新发票资料</a>'+
						    		'</div>'+
						    	'</div>'+
					    	'</div>'+
					    '</div>',
			tipsE = {
				userCheck: function(obj)
				{
					if(obj.hasOwnProperty('userTP'))	return obj.userID != '0' && obj.userTP == 1 && $('#isTaxSetted').val() == '0';
					return obj.userID != '0' && $('#isTaxSetted').val() == '0';
				},
				show: function()
				{
					$('body').append(tplTips);
					setTimeout(function(){
						$('#maskForTax .content').removeClass('scaleHide');
					}, 666)
				},
				hide: function()
				{
					$('#maskForTax').remove();
				},
				run: function(obj, isNoShow)
				{
					if(isNoShow == true) return;
					tipsE.userCheck(obj) && tipsE.show();
					$('#y_taxClose').on('click', tipsE.hide);
				}
			};

		return {
			inte: tipsE.run
		}
	}();
	var validateObj,MaskExisted,
		isIndex = Win.location.href.indexOf('www.ypzdw') > -1;

	if(isIndex)
		validateObj = {
			userID: $('body').attr('data-u'),
			userTP: $('body').attr('data-usertype')
		};
	if(isIndex && Win.localStorage.getItem('welcome') == undefined)
		MaskExisted = true;
	else
		validateObj = {
			userID: $('#UserId').val()
		};

	TaxTips.inte(validateObj, MaskExisted);
})(jQuery, window)