//兼容处理
require('es5-shim');
require('es5-shim/es5-sham');
require('babel-polyfill');

//css
require('plugins/css/reset.css');
require('plugins/css/tangerine.css');
require('../css/reactUI.css');

define(['react','react-dom',],(React,ReactDOM)=>{

	const [ Button,Switch,Checkbox,CheckboxGroup,Input,Select,RadioGroup,Message,Datepicker,FormControl ]
		  =[
		  	require('rctui/Button'),
		  	require('rctui/Switch'),
		  	require('rctui/Checkbox'),
		  	require('rctui/CheckboxGroup'),
		  	require('rctui/Input'),
		  	require('rctui/Select'),
		  	require('rctui/RadioGroup'),
		  	require('rctui/Message'),
		  	require('rctui/Datepicker'),
		  	require('rctui/FormControl'),
		  ];

    class ControlMine extends React.Component{

    	constructor(props) {

    	  super(props);
    	  this.state = {};
    	};
    	render(){

    		return (
    			<form className="formMine">
    				<FormControl type="text" min={ 2 } max={ 4 } grid={ {width:8/10,offset:2/10,} }/>
    				<FormControl type="checkbox" text="setion" />
    				<FormControl type="checkbox-group"
    							 data={[
    							 		  { "id": "nanjing", "text": "南京" },
										  { "id": "beijing", "text": "北京" },
										  { "id": "guangzhou", "text": "广州" },
										  { "id": "shenzhen", "text": "深圳" },
										  { "id": "chengdu", "text": "成都" },
										  { "id": "chongqing", "text": "重庆" },
										  { "id": "shanghai", "text": "上海" }
    							 	]}
    				/>
    				<FormControl type="radio-group"
    							 data={[
    							 		  { "id": "nanjing", "text": "南京" },
										  { "id": "beijing", "text": "北京" },
										  { "id": "guangzhou", "text": "广州" },
										  { "id": "shenzhen", "text": "深圳" },
										  { "id": "chengdu", "text": "成都" },
										  { "id": "chongqing", "text": "重庆" },
										  { "id": "shanghai", "text": "上海" }
    							 	]}
    				/>
    			</form>
    			);
    	};
    };
    ReactDOM.render(
    	<ControlMine />,
    	document.querySelector('.formControl')
    	);

	ReactDOM.render(
		<Datepicker
			onChange={ (v)=>{ alert(v) } }
		/>,
		document.querySelector('.Datepicker')
		);

  	class LoginBox extends React.Component{

  		constructor(props) {

  		  super(props);
  		  this.state = {};
  		};
  		handleRemeber(v){

  			if(v) Message.show('remebered it','warning');
  		};
  		handleU(v){

  			console.log(`user: ${v}`);
  		}
  		handleP(v){

  			console.log(`password: ${v}`);
  		}
  		render(){

  			return (
  				<form id="login_form">
  					<div className="hd">
  						Login
  					</div>
  					<div className="bd">
  						<dl>
  							<dt>userName:</dt>
  							<dd>
  								<Input type="text" grid={ {width:15/16,offset:1/16} }
  									   trigger="change"
  									   onChange={ this.handleU }
								/>
  							</dd>
  						</dl>
  						<dl>
  							<dt>password:</dt>
  							<dd>
  								<Input type="password" grid={ {width:15/16,offset:1/16} }
  									   trigger="change"
  									   onChange={ this.handleP }
  								/>
  							</dd>
  						</dl>
  					</div>
  					<div className="ft">
  						<a className="red">forget?</a>
  						<a>
  							<Checkbox text="remeber" checked={ !1 } onChange={ this.handleRemeber } />
  						</a>
  					</div>
  					<div className="btn_group">
  						<Button status="primary">Let's Go</Button>
  					</div>
  				</form>
  				);
  		};
  	};

  	ReactDOM.render(
  		<LoginBox />,
  		document.querySelector('.login')
  		);

	class OnceButton extends React.Component{

		constructor(props) {

		  super(props);
		  this.state = {
		  	disabled:!1
		  };
		};
		handleClick(e){

			let newDisabled=!this.state.disabled;
			this.setState({
				'disabled':newDisabled,
			})
			setTimeout(()=>{
				let newDisabled=!this.state.disabled;
				this.setState({
					'disabled':newDisabled,
				})
			}, 2000)
		};
		render(){

			return (
				<Button ref="btn"
						status="primary"
						disabled={ this.state.disabled }
						onClick={ this.handleClick.bind(this) }
				>
				Home</Button>
				);
		};
	};
	ReactDOM.render(
		<OnceButton />,
		document.querySelector('.btns')
		);

//switch IE8不支持 因为是用:checked伪类实现的
	ReactDOM.render(
		<Switch checked={ !0 }
		/>,
		document.querySelector('.switch')
		);

	ReactDOM.render(
		<Checkbox text="select1" checked />,
		document.querySelector('.checkBox')
		);

	ReactDOM.render(
		<Input type="email" placeholder="email" />,
		document.querySelector('.Input')
		);

	ReactDOM.render(
		<Select grid={{width:1/4}}
				placeholder="简单数组"
				data={["中国", "美国", "俄罗斯", "德国", "日本", "法国", "英格兰"]} />,
		document.querySelector('.select')
		);

	class RadioList extends React.Component{

		constructor(props) {

		  super(props);
		  this.state = {};
		};
		handleChange(v){

			Message.show(v,'warning')
		};
		render(){

			return (
				<RadioGroup onChange={ this.handleChange }
							data={[
								  "南京", "北京", "上海", "广州", "深圳", "成都", "重庆", "西安"
								]} />
				);
		};
	};
	ReactDOM.render(
		<RadioList />,
		document.querySelector('.radio')
		);
})