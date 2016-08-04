//兼容处理
require('es5-shim');
require('es5-shim/es5-sham');
require('babel-polyfill');
//css
require('../css/antd_1.css');

//antd
	import { Button } from 'antd';
//main
define(['react','react-dom'],(React,ReactDOM)=>{

	ReactDOM.render(
		<div>
			<Button type="primary" size="large">Primary</Button>
			<Button size="large" size="small">Primary</Button>
		</div>,
		document.querySelector('.btns')
		);

	class ButtonLoad extends React.Component{

		constructor(props) {

		  super(props);
		  this.state = {
		  	'txt_btn':'点击加载',
		  	'isIcoLoadding':!1,
		  };
		};
		handleClick(){

			this.setState({
				'txt_btn':'加载中',
				'isIcoLoadding':!0,
			});
		};
		componentDidUpdate(){

			if(this.state.isIcoLoadding)
				setTimeout(()=>{
					this.setState({
						'txt_btn':'点击加载',
		  				'isIcoLoadding':!1,
					})
				}, 1000)
		};
		render(){

			return (
				<Button icon="poweroff"
						onClick={ this.handleClick.bind(this) }
						loading={ this.state.isIcoLoadding }
						style={ {width:'100px'} }>

						{ this.state.txt_btn }

						</Button>
				);
		};
	};
	ReactDOM.render(
		<ButtonLoad />,
		document.querySelector('.btn_loading')
		);
})