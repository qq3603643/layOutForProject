import React from 'react';
import ReactDom from 'react-dom';

import { createStore, applyMiddleware } from 'redux';

import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import fetch from 'isomorphic-fetch';

require('../css/index.css');

/**
	action 利用redux-thunk以后可以传入function
*/
const fetchName = function(url)
{
	return function(dispatch, getState)
	{
		store.dispatch({ type: 'Ajax_Start' })

		return fetch('http://localhost:2234/getInfo')
			   .then(response => response.json())
			   .then(json => {
			   		dispatch({ type: 'Ajax_Success', data: json.name })
			    })
	}
}

/**
	commponent 组件 不解释
*/
class Box extends React.Component
{
	constructor(props)
	{
	  super(props);

	  this.state = {};
	}
	render()
	{
		const store = this.props.store,
			  state = store.getState();

		let	  text = new String();

	    if(state.isAjaxing)
    	{
    		text = 'loading';
    	}
    	else
		{
			if(!state.data)	text = '#{ NULL }'
			else 			text = state.data;
		}

		return (
			<p className = "txt"
			   onClick   = { ()=>{ store.dispatch(fetchName('http://localhost:2234/getInfo')) } }
			>
				{ text }
			</p>
			);
	}
}

/**
	将action中的order进行解释进而影响state
*/
const reducer = (state, orderState)=>
		{
			const { type } = orderState;

			switch(type)
			{
				case 'Ajax_Start':
					return Object.assign({}, state, {isAjaxing: !0});
					break;
				case 'Ajax_Success':
					return Object.assign({}, state, {isAjaxing: !1, data: orderState.data});
					break;
				case 'Ajax_Error':
					return Object.assign({}, state, {isAjaxing: !1, data: 'Error'});
					break;
				default:
					return state;
			}
		};

/**
	store 总司令部 储存数据 dispatch/subscribe 发号命令/接受消息
	createStore( reducer,initial_state, middleware )
*/
const initial_state = { isAjaxing: !1, data: '' },
	  store = createStore(reducer, initial_state, applyMiddleware(thunk, createLogger())),
      render = ()=>
      	{
      		ReactDom.render(
      			<Box store = { store } />,
      			document.querySelector('#root')
      			);
      	};
render();
store.subscribe(render);