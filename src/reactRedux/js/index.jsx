import React from 'react';
import ReactDom from 'react-dom';
import { createStore } from 'redux';

require('./context.jsx');

require('plugins/css/reset.css');
require('plugins/css/tangerine.css');
require('../css/index.css')

/**
	个人对redeux使用理解
	1. store 类似pubsub 通过 createStore(reducer) 创建得到
	2. state 储存有组件的一切状态信息 需给默认值 可通过store.getState() 返回
	3. reducer 接受oldState，orderState两个参数 通过判断orderState改变oldState 返回新的state
	4. store.subscribe(render) 订阅一个渲染函数
	   store.dispatch(orderState)  发布一个指令
	   # 发布的指令和reducer接受的指令是同一个 #
	   # 当接受到指令时 state根据renducer属性状态 订阅的渲染函数再次执行 #
*/

//orderState (action) 必须有type
const reducer = (state = { number: 0 }, orderState) =>
		{
			let _n = orderState.type == 'Plus_One' ? 1 : orderState.type == 'Minus_One' ? -1 : 0;

			return {
				number: state.number + _n
			}
		}

const store = createStore(reducer);

class CountBox extends React.Component
{
	constructor(props) {
	  super(props);

	  this.state = {};
	}
	render()
	{
		return (
			<div>
				<h2>{ this.props.store.getState().number }</h2>
				<p className="btn_groups">
					<span className="btn bg_blue" onClick={ ()=>{ store.dispatch({ type: 'Plus_One' }) } }>PLUS</span>
					<span className="btn bg_gray" onClick={ ()=>{ store.dispatch({ type: 'Minus_One' }) } }>MINUS</span>
				</p>
			</div>
			);
	}
}

const createCountBox = () =>
		{
			ReactDom.render(
					<CountBox store = { store }/>,
					document.querySelector('#root')
				);
		};

createCountBox();
store.subscribe(createCountBox);