//兼容处理
require('es5-shim');
require('es5-shim/es5-sham');
require('babel-polyfill');

//css
require('plugins/css/reset.css');
require('plugins/css/tangerine.css');
require('../css/Cq0728.css');

define(['react','react-dom'],(React,ReactDOM)=>{

	class BtnLimitTime extends React.Component{

		constructor(props) {

		  super(props);
		  this.state={
		  	txt_btn:'即将开抢',
		  	class_active:'',
		  };
		};
		getTimes(value){

            if(!isNaN(new Date('1970-01-01 00:00:00')*1)) return new Date(value);
            let
                aValue=value.split(/\s+/),
                [iYear,iMouth,iDay]=aValue[0].split('-'),
                [iHour,iMin,iSec]=aValue[1].split(':');

            return new Date(iYear,iMouth-1,iDay)-new Date(1970,0,1)+(iSec*1+iMin*60+(iHour-8)*3600)*1000;
        };
		componentWillMount(){

			let
				time_now=window.time*1000,
				isStart=()=>time_now >= this.getTimes(this.props.time_act),
				isEnd=()=>time_now >= this.getTimes(this.props.time_end);
			if(isStart() && new Date(time_now).getHours()>=9 && !isEnd())
				this.setState({
					'txt_btn':'立即购买',
					'class_active':'bg_red',
				});
			if(isEnd())
				this.setState({
					'txt_btn':'活动已结束',
					'class_active':'',
				});
		};
		render(){

			return (
				<div className="bd pos_r auto">
		    		<a className={ `btn pos_a bd_none bg_gray ${ this.state.class_active }` }
		    		   href={ this.props.link_goods }
		    		   target="_blank">

		    		   { this.state.txt_btn }

		    		   </a>
		    	</div>
				);
		};
	};
//BtnWithStatus
	ReactDOM.render(
		<BtnLimitTime
			time_act="2016-07-28 09:00:00"
			time_end="2016-07-31 23:59:59"
			link_goods="https://szdtyy.ypzdw.com/18901/683837" />,
		document.querySelector('.header')
		);
//listGoods
	let ListGoods=require('./ListGoods.jsx'),
		dataGoods=require('./dataGoods.js').dataGoods;

	ReactDOM.render(
		<ListGoods
			time_act="2016-07-27 09:00:00"
			time_end="2016-07-31 23:59:59"
		    dataGoods={ dataGoods } />,
		document.querySelector('.content .bd')
		);
})