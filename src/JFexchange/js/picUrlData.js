define([], function(){

	let areaCode = $('#area').attr('data-areaCode'),
		urlPrefix = window.location.href.indexOf('ypzdw') > -1 ? `../../images/topic161111` : `../pics/`,
		picsInfo = {
			//四川
			'510000': {
				coupon: [
							{ companyName: '九和春医药', fullName: '四川省九和春医药有限公司', href: 'https://jhcyy.ypzdw.com/', },

							{ companyName: '仁通医药', fullName: '四川仁通医药有限公司', href: 'https://scrtyy.ypzdw.com/', },


							{ companyName: '云药库', fullName: '广州市振康医药有限公司', href: 'https://yunyaoku.ypzdw.com/', },

							{ companyName: '博爱药业', fullName: '四川博爱药业有限责任公司', href: 'https://scbayyyxzrgs.ypzdw.com/', },

							{ companyName: '众源药业', fullName: '四川众源药业有限公司', href: 'https://277374249.ypzdw.com/', },

							{ companyName: '四川新利康销售1部', fullName: '四川新利康药业有限公司', href: 'https://scxlkyy.ypzdw.com/', },

							{ companyName: '华逸医药', fullName: '四川华逸医药有限责任公司', href: 'https://schyyyyxgs.ypzdw.com/', },

							{ companyName: '远大搏成药业旗舰店', fullName: '四川远大搏成药业有限公司', href: 'https://yuandabocheng.ypzdw.com/', },

							{ companyName: '玉马医药电商2部', fullName: '重庆玉马医药有限公司', href: 'https://cqymyy02.ypzdw.com/', },

							{ companyName: '尚品源保健品', fullName: '成都市尚品源保健品有限公司', href: 'https://spy.ypzdw.com/', },

							{ companyName: '雅思器械旗舰店', fullName: '四川弗佑斯贸易有限公司', href: 'https://fysmy.ypzdw.com/', },

							{ companyName: '鑫宏海保健品', fullName: '成都市锦仁堂生物科技有限公司', href: 'https://jrt13408631659.ypzdw.com/', },

							{ companyName: '东泰药业', fullName: '四川东泰药业有限公司', href: 'https://dtyy6688.ypzdw.com/', },

							{ companyName: '本草堂', fullName: '四川本草堂药业有限公司', href: 'https://scbctyy.ypzdw.com/', },
				],
				activity: [
						//秒杀
							{
								href: 'https://www.ypzdw.com/MemberDay?ActivityId=2550',
							},
						//团购
							{
								href: 'https://static.ypzdw.com/topic/xbtg-sc',
							},
						//爆品
							{
								href: 'https://static.ypzdw.com/topic/xbbp-sc',
							}
				]
			},
			//重庆
			'500000': {
				coupon: [
							{ companyName: '玉马医药电商1部', fullName: '重庆玉马医药有限公司', href: 'https://cqymyy.ypzdw.com/', },

							{ companyName: '真善美医药', fullName: '重庆真善美医药有限公司', href: 'https://cqzsm.ypzdw.com/', },

							{ companyName: '久瑞通医药', fullName: '重庆久瑞通医药有限公司', href: 'https://jrtyy.ypzdw.com/', },

							{ companyName: '道勤医药', fullName: '重庆道勤医药有限公司', href: 'https://daoqin.ypzdw.com/', },

							{ companyName: '恒德医药', fullName: '重庆恒德医药有限公司', href: 'https://cqhdyy.ypzdw.com/', },

							{ companyName: '中诺医药', fullName: '重庆中诺医药有限公司', href: 'https://cqznyy.ypzdw.com/', },

							{ companyName: '浮于嘉医药', fullName: '重庆浮于嘉医药有限公司', href: 'https://20102012.ypzdw.com/', },

							{ companyName: '定坤医药', fullName: '重庆定坤医药有限公司', href: 'https://dkyy.ypzdw.com/', },

							{ companyName: '中润医药电商部', fullName: '重庆中润医药有限公司', href: 'https://zryycai.ypzdw.com/', },

				],
				activity: [
						//秒杀
							{
								href: 'https://www.ypzdw.com/MemberDay?ActivityId=2561',
							},
						//团购
							{
								href: 'https://static.ypzdw.com/topic/xbtg-cq',
							},
						//爆品
							{
								href: 'https://static.ypzdw.com/topic/xbbp-cq',
							}
				]
			},
			//山西
			'140000': {
                coupon: [
							{ companyName: '莱克医药', fullName: '山西莱克医药有限公司', href: 'https://sxlkyyyxgs.ypzdw.com/', },

							{ companyName: '泰和康药业', fullName: '临汾市泰和康药业有限公司', href: 'https://thkyy.ypzdw.com/', },

							{ companyName: '荣康药业', fullName: '长治市荣康药业有限公司', href: 'https://rkyy.ypzdw.com/', },

							{ companyName: '精诚药业', fullName: '山西精诚药业有限公司', href: 'https://jcyy.ypzdw.com/', },

							{ companyName: '众康药品分公司', fullName: '长治市众康中药材开发有限公司药品分公司', href: 'https://czszkyy.ypzdw.com/', },

							{ companyName: '天泽诚信药业', fullName: '山西天泽诚信药业有限公司', href: 'https://tzcxyy.ypzdw.com/All', },

							{ companyName: '君雁药业长治益源分公司', fullName: '山西君雁药业有限责任公司长治益源分公司', href: 'https://jyyyyy.ypzdw.com/', },

							{ companyName: '东泰医药', fullName: '深圳市东泰医药有限公司', href: 'https://szdtyy.ypzdw.com/', },

							{ companyName: '壶关县医药药材', fullName: '山西省壶关县医药药材公司', href: 'https://hgyy.ypzdw.com/', },


				],
				activity: [
						//秒杀
							{
								href: 'https://www.ypzdw.com/MemberDay?ActivityId=2503',
							},
						//团购
							{
								href: 'https://static.ypzdw.com/topic/xbtg-sx',
							},
						//爆品
							{
								href: 'https://static.ypzdw.com/topic/xbbp-sx',
							}
				]
            },
			//安徽
			'340000': {
				coupon: [
							{ companyName: '聚源医药商城', fullName: '安徽华源聚源医药有限公司', href: 'https://ahhyjyyy.ypzdw.com/', },
				],
				activity: [
						//秒杀
							{
								href: 'https://www.ypzdw.com/MemberDay?ActivityId=2564',
							},
						//团购
							{
								href: 'https://static.ypzdw.com/topic/xbtg-ah',
							},
						//爆品
							{
								href: 'https://static.ypzdw.com/topic/xbbp-ah',
							}
				]
            },
			//福建
			'350000': {
                 coupon: [
							{ companyName: '隆田医药电商城', fullName: '福建省隆田医药有限公司', href: 'https://longtian.ypzdw.com/', },

							{ companyName: '天瑞电商城', fullName: '福建天瑞医药有限公司', href: 'https://tianrui.ypzdw.com/', },
				],
				activity: [
						//秒杀
							{
								href: 'https://www.ypzdw.com/MemberDay?ActivityId=2567',
							},
						//团购
							{
								href: 'https://static.ypzdw.com/topic/xbtg-fj',
							},
						//爆品
							{
								href: 'https://static.ypzdw.com/topic/xbbp-fj',
							}
				]
			}
		};

	return picsInfo[areaCode];
})