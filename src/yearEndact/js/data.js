define([],function()
{

	var areaCode = $('#area').attr('data-areaCode'),
		data = {
		'510000': {
			coupons:[
				
{ companyName: '贝尔康医药', fullName: '四川贝尔康医药有限公司', href: 'https://scbekyy.ypzdw.com/' },

{ companyName: '振康医药', fullName: '广州市振康医药有限公司', href: 'https://yunyaoku.ypzdw.com/' },

{ companyName: '国森医药', fullName: '四川国森医药有限公司', href: 'https://gsyy.ypzdw.com/' },

{ companyName: '本草堂药业', fullName: '四川本草堂药业有限公司', href: 'https://bctyy.ypzdw.com/' },

{ companyName: '玉马医药', fullName: '重庆玉马医药有限公司', href: 'https://cqymyy02.ypzdw.com/' },

{ companyName: '中联四药', fullName: '国药集团武汉中联四药药业有限公司', href: 'https://zlsy2015.ypzdw.com/' },

{ companyName: '众源药业', fullName: '四川众源药业有限公司', href: 'https://277374249.ypzdw.com/' },

{ companyName: '博爱药业', fullName: '四川博爱药业有限责任公司', href: 'https://scbayyyxzrgs.ypzdw.com/' },

{ companyName: '佳能达医药', fullName: '四川佳能达医药贸易有限公司', href: 'https://jnd.ypzdw.com/' },
			],
			topics:{
				//冬季专场
				winter: 'https://static.ypzdw.com/topic/12dongji-sc',
				//清仓
				clearStore: 'https://static.ypzdw.com/topic/12dijia-sc',
				//感恩
				thxNumber: 'https://static.ypzdw.com/topic/12fudai-sc',
				//秒杀（三个链接依次写入）
				scdSkill: 

                          ['https://www.ypzdw.com/MemberDay?ActivityId=2965',                                            
                           'https://www.ypzdw.com/MemberDay/Activity?aid=3080',                                           
                           'https://www.ypzdw.com/MemberDay?ActivityId=3110',

                           'https://www.ypzdw.com/MemberDay?ActivityId=3111',  

                           'https://www.ypzdw.com/MemberDay?ActivityId=3112'],

				//团购
				group: 'https://static.ypzdw.com/topic/12xbtg-sc',
				//爆品
				boom: 'https://static.ypzdw.com/topic/12xbbp-sc'
			}
		},
        '500000': {
			coupons:[
				
{ companyName: '真善美医药', fullName: '重庆真善美医药有限公司', href: 'https://cqzsm.ypzdw.com/' },

{ companyName: '玉马医药', fullName: '重庆玉马医药有限公司', href: 'https://cqymyy.ypzdw.com/' },

{ companyName: '中润医药', fullName: '重庆中润医药有限公司', href: 'https://zryycai.ypzdw.com/' },

{ companyName: '恒德医药', fullName: '重庆恒德医药有限公司', href: 'https://cqhdyy.ypzdw.com/' },

{ companyName: '汉洲医药', fullName: '重庆市汉洲医药有限公司', href: 'https://tjzsm.ypzdw.com/' },

{ companyName: '洪瑞医药', fullName: '重庆市洪瑞医药有限公司', href: 'https://hryy.ypzdw.com/' },
			],
			topics:{
				//冬季专场
				winter: 'https://static.ypzdw.com/topic/12dongji-cq',
				//清仓
				clearStore: 'https://static.ypzdw.com/topic/12dijia-cq',
				//感恩
				thxNumber: 'https://static.ypzdw.com/topic/12fudai-cq',
				//秒杀（三个链接依次写入）
				scdSkill:
                          ['https://www.ypzdw.com/MemberDay?ActivityId=3090',                                            
                           'https://www.ypzdw.com/MemberDay/Activity?aid=2955',                                           
                           'https://www.ypzdw.com/MemberDay?ActivityId=3092',

                           'https://www.ypzdw.com/MemberDay?ActivityId=3100',  

                           'https://www.ypzdw.com/MemberDay?ActivityId=3101'],

				//团购
				group: 'https://static.ypzdw.com/topic/12xbtg-cq',
				//爆品
				boom: 'https://static.ypzdw.com/topic/12xbbp-cq'
                
                }
	},
     '140000': {
			coupons:[
				
{ companyName: '荣康药业', fullName: '长治市荣康药业有限公司', href: 'https://rkyy.ypzdw.com/' },

{ companyName: '莱克医药', fullName: '山西莱克医药有限公司', href: 'https://sxlkyyyxgs.ypzdw.com/' },

{ companyName: '泰和康药业', fullName: '临汾市泰和康药业有限公司', href: 'https://thkyy.ypzdw.com/' },

{ companyName: '众康中药材', fullName: '长治市众康中药材', href: 'https://czszkyy.ypzdw.com/' },

{ companyName: '厚德兴盛', fullName: '山西厚德兴盛医药有限公司', href: 'https://hdxsyy.ypzdw.com/' },

{ companyName: '鹤福药业', fullName: '山西鹤福药业有限公司', href: 'https://sxhfyy.ypzdw.com/' },
			],
			topics:{
				//冬季专场
				winter: 'https://static.ypzdw.com/topic/12dongji-sx',
				//清仓
				clearStore: 'https://static.ypzdw.com/topic/12dijia-sx',
				//感恩
				thxNumber: 'https://static.ypzdw.com/topic/12fudai-sx',
				//秒杀（三个链接依次写入）
				scdSkill: 
                          ['https://www.ypzdw.com/MemberDay?ActivityId=2976',                                            
                           'https://www.ypzdw.com/MemberDay/Activity?aid=2964',                                           
                           'https://www.ypzdw.com/MemberDay?ActivityId=3076',

                           'https://www.ypzdw.com/MemberDay?ActivityId=3086',  

                           'https://www.ypzdw.com/MemberDay?ActivityId=3088'],

				//爆品
				boom: 'https://static.ypzdw.com/topic/12xbbp-sx	'
                
                }
	},
    
     '440000': {
			coupons:[
				
{ companyName: '康泽药业', fullName: '康泽药业连锁有限公司', href: 'https://kzyyls.ypzdw.com/' },
{ companyName: '泰盛医药', fullName: '深圳市泰盛医药有限公司', href: 'https://sztsyy.ypzdw.com/' },
{ companyName: '东泰医药', fullName: '深圳市东泰医药有限公司', href: 'https://szdtyy.ypzdw.com/' },
{ companyName: '振康医药', fullName: '广州市振康医药有限公司', href: 'https://yunyaoku.ypzdw.com/' },
{ companyName: '平安药业', fullName: '深圳平安药业有限公司', href: 'https://szpayy.ypzdw.com/' },

			],
			topics:{
				//冬季专场
				winter: 'https://static.ypzdw.com/topic/12dongji-gd',
				//清仓
				clearStore: 'https://static.ypzdw.com/topic/12dijia-gd',
				//感恩
				thxNumber: 'https://static.ypzdw.com/topic/12fudai-gd',
				//秒杀（三个链接依次写入）
				scdSkill: 

                          ['https://www.ypzdw.com/MemberDay?ActivityId=2969',                                            
                           'https://www.ypzdw.com/MemberDay/Activity?aid=3094',                                           
                           'https://www.ypzdw.com/MemberDay?ActivityId=3120',

                           'https://www.ypzdw.com/MemberDay?ActivityId=3053',  

                           'https://www.ypzdw.com/MemberDay?ActivityId=3121'],

				//团购
				group: 'https://static.ypzdw.com/topic/12xbtg-gd',
				//爆品
				boom: 'https://static.ypzdw.com/topic/12xbbp-gd	'
                
                }
	},
    
    
         '340000': {
			coupons:[
				
{ companyName: '恒宇药业', fullName: '安徽恒宇药业销售有限公司', href: 'https://ahhyyy.ypzdw.com/' },

{ companyName: '百惠医药', fullName: '湖北百惠医药有限公司', href: 'https://bhyy.ypzdw.com/' },

{ companyName: '华源医药', fullName: '安徽华源医药股份有限公司', href: 'https://ahhy.ypzdw.com/' },

			],
			topics:{
				//冬季专场
				winter: 'https://static.ypzdw.com/topic/12dongji-ah',
				//清仓
				clearStore: 'https://static.ypzdw.com/topic/12dijia-ah',
				//感恩
				thxNumber: 'https://static.ypzdw.com/topic/12fudai-ah',
				//秒杀（三个链接依次写入）
				scdSkill: 
                          ['https://www.ypzdw.com/MemberDay?ActivityId=2959',                                            
                           'https://www.ypzdw.com/MemberDay/Activity?aid=3016',                                           
                           'https://www.ypzdw.com/MemberDay?ActivityId=3114',

                           'http://www.ypzdw.com/MemberDay?ActivityId=3116',  

                           'https://www.ypzdw.com/MemberDay?ActivityId=3118'],

				//团购
				group: 'https://static.ypzdw.com/topic/12xbtg-ah',
				//爆品
				boom: 'https://static.ypzdw.com/topic/12xbbp-ah	'
                
                }
	},
 '420000': {
			coupons:[
				
{ companyName: '千瑞铭医药', fullName: '湖北千瑞铭医药有限公司', href: 'https://hbqrmyy.ypzdw.com/' },

{ companyName: '启元医药', fullName: '武汉启元医药有限公司', href: 'https://qyxysc.ypzdw.com/' },

{ companyName: '百年顺康医药', fullName: '武汉百年顺康医药有限公司', href: 'https://bnsk.ypzdw.com/' },

{ companyName: '百惠医药', fullName: '武汉百惠医药有限公司', href: 'https://bhyy.ypzdw.com/' },

{ companyName: '吴都医药', fullName: '鄂州市吴都医药有限公司', href: 'https://wdyy.ypzdw.com/' },

{ companyName: '明达医药', fullName: '湖北明达医药有限公司', href: 'https://mdyy.ypzdw.com/'},

			],
			topics:{
				//冬季专场
				winter: 'https://static.ypzdw.com/topic/12dongji-ah',
				//清仓
				clearStore: 'https://static.ypzdw.com/topic/12dijia-hb',
				//感恩
				thxNumber: 'https://static.ypzdw.com/topic/12fudai-hb',
				//秒杀（三个链接依次写入）
				scdSkill: 
                          ['https://www.ypzdw.com/MemberDay?ActivityId=3040',                                            
                           'https://www.ypzdw.com/MemberDay/Activity?aid=3067',                                           
                           'https://www.ypzdw.com/MemberDay?ActivityId=3069',

                           'https://www.ypzdw.com/MemberDay?ActivityId=3119',  

                           'https://www.ypzdw.com/MemberDay?ActivityId=3113'],

				//团购
				group: 'https://static.ypzdw.com/topic/12xbtg-hb',
				//爆品
				boom: 'https://static.ypzdw.com/topic/12xbbp-hb	'
                
                }
	},

 '350000': {
			coupons:[
				
{ companyName: '隆田医药', fullName: '湖北千瑞铭医药有限公司', href: 'https://longtian.ypzdw.com/' },

{ companyName: '华成医药', fullName: '福建省华成医药有限公司', href: 'https://hc.ypzdw.com/' },

{ companyName: '新时代医药', fullName: '福建省龙岩市新时代医药有限公司', href: ' https://xinshidai.ypzdw.com/' },



			],
			topics:{
				//冬季专场
				winter: 'https://static.ypzdw.com/topic/12dongji-ah',
				//清仓
				clearStore: 'https://static.ypzdw.com/topic/12dijia-fj',
				//感恩
				thxNumber: 'https://static.ypzdw.com/topic/12fudai-fj',
				//秒杀（三个链接依次写入）
				scdSkill: 
                          ['https://www.ypzdw.com/MemberDay?ActivityId=2809',                                            
                           'https://www.ypzdw.com/MemberDay/Activity?aid=2813',                                           
                           'https://www.ypzdw.com/MemberDay?ActivityId=3115',

                           'https://www.ypzdw.com/MemberDay?ActivityId=2810',  

                           'https://www.ypzdw.com/MemberDay?ActivityId=3117'],

				//团购
				group: 'https://static.ypzdw.com/topic/12xbtg-fj',
				//爆品
				boom: 'https://static.ypzdw.com/topic/12xbbp-fj	'
                
                }
	},

}
	return data[areaCode];
})