import React from 'react';
import ReactDom from 'react-dom';

//子组件用this.context[name] 访问父级getChildContext中返回的数组
class Button extends React.Component
{
	constructor(props)
	{
	  super(props);

	  this.state = {};
	}
	render()
	{
		return (
				<span className="btn">
					{ this.context.btnName }
				</span>
			);
	}
}

Button.contextTypes =  //子级需要
{
	btnName: React.PropTypes.object.isRequired
}

class Pbutton extends React.Component
{
	constructor(props)
	{
	  super(props);

	  this.state = {};
	}
	render()
	{
		return (
				<p>
					This is a button:
					{
						this.props.children
					}
				</p>
			);
	}
}

class PpButton extends React.Component
{
	constructor(props)
	{
	  super(props);

	  this.state = {};
	}
	getChildContext()   //父级需要(经测试必须放在class构建内 不能像childContextTypes在后面类添加属性)
	{
		return {
			btnName: this.props.btnName
		};
	}
	render()
	{
		return (
				<div>
					This is a test:
					{
						this.props.children
					}
				</div>
			);
	}
}

PpButton.childContextTypes =  //父级需要
{
	btnName: React.PropTypes.object.isRequired
}

ReactDom.render(
		<PpButton btnName="TEST_BEN">
			<Pbutton>
				<Button />
			</Pbutton>
		</PpButton>,
		document.querySelector('#root2')
	);


/**
	summary：
	 父级在函数体内添加getChildContext返回传输的数据 添加childContextTypes定义传输的数据格式
	 子级添加contextTypes定义传输的数据格式 this.context[name]应用传输的数据
*/