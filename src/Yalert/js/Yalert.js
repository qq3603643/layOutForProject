require('../css/TaxTips.css');
require('../css/AptitudeTips.css');
(function($, Win, undefined){

	var YWalert = function(){
		var hrefPrefix = (Win.location.href.match(/https?:\/\/\w+\.\w+\.\w+/g) || ['https://www.ypzdw.com'])[0].replace('www', 'pur'),
			hrefToSettax = hrefPrefix + '/Member/Tax',
			hrefToMemberCenter = hrefPrefix + '',
			hrefToAptitude = hrefPrefix + '/Member/Aptitude',
			isShowClose = Win.location.href.indexOf('Order/Tax') == -1,
			ajaxUrlForGetAddress = Win.location.href.indexOf('www.ypzdw') > -1 ? '/common/getAptitudeAddress' : '/main/common/getAptitudeAddress/',
			tplClose = isShowClose ? '<span class="close" id="y_taxClose" onclick="var oMask = document.querySelector(\'#maskForTax\');oMask.parentNode.removeChild(oMask)"></span>' : '',
			tplTips = `<div id="maskForTax">
					    	<div class="content scaleHide">
					    		${tplClose}
					    		<div class="taxLogo"></div>
						    	<div class="inner">
						    		<p class="wordsTips">
						    			亲，请及时更新发票资料，以便您更快收到发票！
						    		</p>
						    		<div class="btn_group">
						    			<a class="btn" id="y_taxGoto" href="${hrefToSettax}">前往更新发票资料</a>
						    		</div>
						    	</div>
					    	</div>
					    </div>`,
		    tplAptitude = `<div id="maskForAptitude">
					    	<div class="content scaleHide">
					    		<span class="close" onclick="var oMask = document.querySelector('#maskForAptitude');oMask.parentNode.removeChild(oMask);"></span>
					    		<div class="hd">纸质资料不足</div>
					    		<div class="bd">
					    			<div class="top">
					    				<h4>您的剩余资质&#x3c;3份</h4>
					    				<p>请尽快向药品终端网邮寄合格资质，否则将导致商家没有您的资质不能出库，延误您的收货时间。</p>
					    			</div>
					    			<div class="bottom">
					    				<h4>您的纸质资质邮寄地址：</h4>
					    				<div class="info">
						    				<div class="list">
							    				<p title="#{address}">地址：#{address}</p>
							    				<p>邮编：#{zipCode}</p>
							    				<p>收件人：#{receiver}</p>
							    				<p>电话：#{phoneNumber}</p>
						    				</div>
					    				</div>
					    			</div>
					    		</div>
					    		<div class="ft">
					    			<p>您也可以在<span class="blue"><a class="link" href="${hrefToMemberCenter}" target="_blank">会员中心</a>—<a class="link" href="${hrefToAptitude}" target="_blank">我的资质</a></span>页面底部查看</p>
					    		</div>
					    	</div>
					     </div>`,
			tipsE = {
				userCheck: function(obj)
				{
					if(obj.hasOwnProperty('userTP'))	return obj.userID != '0' && obj.userTP == 1;
					return obj.userID != '0';
				},
				show: function()
				{
					$('body').append(tplTips);
					setTimeout(function(){
						$('#maskForTax .content').removeClass('scaleHide');
					}, 666)
				},
				run: function(obj, isNoShow)
				{
					if(isNoShow == true) return;
					$('#isTaxSetted').val() == '0' && tipsE.userCheck(obj) && tipsE.show();
				}
			},
			tipsE2 = {
				userCheck: tipsE.userCheck,
				formatTpl: function(htmlTpl, deal, data)
				{
					return htmlTpl.replace(/#\{(.*?)\}/g, function($, $1){
						var value = new String;
						if(deal.hasOwnProperty($1))
							value = typeof(deal[$1]) == 'function' ? deal[$1]() : deal[$1];
						else
							value = data.hasOwnProperty($1) ? data[$1] : $;

						return value;
					})
				},
				getAddress: function()
				{
					$.ajax({
						type: 'GET',
						url: ajaxUrlForGetAddress,
						success: function(t)
						{
							var data = t.status == 1 ? t.data : {};
							tipsE2.showEv(data);
							try{
								console.log(data);
							}
							catch(e)
							{
								//Who Care?
							}
						},
						error: function()
						{
							tipsE2.showEv({});
						}
					})
				},
				showEv: function(t)
				{
					$('body').append(
							tipsE2.formatTpl(tplAptitude, {}, t)
						);
					setTimeout(function(){
						$('#maskForAptitude .content').removeClass('scaleHide');
					}, 666)
				},
				run: function(obj, isNoShow)
				{
					if(isNoShow == true) return;
					$('#isShowAptitudeDialog').val() =='1' && tipsE.userCheck(obj) && tipsE2.getAddress();
				}
			};

		return {
			inte: tipsE.run,
			inte2: tipsE2.run
		}
	}();
	void function()
	{
		var validateObj,MaskExisted,
			isIndex = Win.location.href.indexOf('www.ypzdw') > -1,
			$hideIptAptitude = $('#isShowAptitudeDialog'),
			$hideIptScope = $('#isCompleteScope');

		if(isIndex)
			validateObj = {
				userID: $('body').attr('data-u'),
				userTP: $('body').attr('data-usertype')
			};
		else
			validateObj = {
				userID: $('#UserId').val()
			};

		if(isIndex && (Win.localStorage.getItem('welcome') == undefined || $hideIptAptitude.val() == '1' || $hideIptScope.val() == '0'))
			MaskExisted = true;
		else if($hideIptAptitude.val() == '1' || $hideIptScope.val() == '0')
			MaskExisted = true;
		//税票
		YWalert.inte(validateObj, MaskExisted);
		//资质
		YWalert.inte2(validateObj, isIndex ? Win.localStorage.getItem('welcome') == undefined : false);
	}();
})(jQuery, window)