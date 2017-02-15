import React from 'react';
import ReactDom from 'react-dom';
import { createStore } from 'redux';

require('./context.jsx');

require('plugins/css/reset.css');
require('plugins/css/tangerine.css');
require('../css/index.css')

const reducer = (state = 0, action) =>
		{
			switch(action.type)
			{
				case 'Plus':
					return state += 1;
				case 'Minus':
					return state -= 1;
				default:
					return state;
			}
		}

const store = createStore(reducer);

class Couter extends React.Component
{
	constructor(props) {
	  super(props);

	  this.state = {};
	}
	plusHandle(e)
	{
		store.dispatch(
				{
					type: 'Plus'
				}
			)
	}
	minusHandle()
	{
		store.dispatch(
				{
					type: 'Minus'
				}
			)
	}
	render()
	{
		return (
			<div>
				<h2>
					{ this.props.value }
				</h2>
				<p className="btn_group">
					<span className="btn bg_blue" onClick={ this.plusHandle }>Plus</span>
					<span className="btn bg_silver" onClick={ this.minusHandle }>Minus</span>
				</p>
			</div>
			);
	}
}



const render = () =>
		{
			ReactDom.render(
					<Couter value={ store.getState() }/>,
					document.querySelector('#root')
				)
		}

render();
store.subscribe(render);