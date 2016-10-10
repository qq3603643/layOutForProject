//兼容处理
require('es5-shim');
require('es5-shim/es5-sham');
require('babel-polyfill');

//css
require('plugins/css/reset.css');
require('../css/jifen.css');

define(['react','react-dom'],(React,ReactDOM)=>{

	const
		infoForConpon={
			'title':'当前已兑换用户',
			'listTitle':['店名','姓名','兑换券额'],
			'urlAjax':'jifen/ExchangeConponList'
		},
		ExchangeListBox=require('./ExchangeListBox.jsx');

		ReactDOM.render(
			<ExchangeListBox { ...infoForConpon }/>,
			document.querySelector('.scroll-list')
			);

	const
		infoForCountBox={
			'txt_status':{
				'looking': '离开抢还有',
				'doing': '活动进行中',
				'out': '今日已抢完'
			}
		},
		CountBox=require('./CountBox.jsx');

	ReactDOM.render(
		<CountBox { ...infoForCountBox } />,
		document.querySelector('.timeCount-box')
		);
})