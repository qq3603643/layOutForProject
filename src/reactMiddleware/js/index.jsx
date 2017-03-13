import React from 'react';
import ReactDom from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import fetch from 'isomorphic-fetch';

/** middleware */
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

/** resource */
require('plugins/css/reset.css');
require('plugins/css/tangerine.css');

/**
	## 引入中间件的方式 ##
	const store = createStore(
					reducer,
					initial_state,
					applyMiddleware(* wareName-1, * wareName-2)
					);

	applyMiddleware的实现原理
	存储原始store, dispatch 将applyMiddle里面的参数提取
	将参数与原始dispatch联合执行
*/

/**
	action creater
*/
class FetchBox extends React.Component
{
	constructor(props)
	{
		super(props);

		this.state = {};
	}
	fetchDate()
	{
		const { store } = this.props,
		      { dispatch } = store;

        dispatch({ type: 'Fetch_Before' });
        return (dispatch, getState)=>
        {
        	return fetch('http://localhost:2234/getInfo')
        		   .then(response => response.json())
        	       .then(json => {
        	       		console.log(json);
        	       		dispatch({ type: 'Fetch_Done', data: json })
        	        })
        }
	}
	getText()
	{
		const { store } = this.props,
		      state = store.getState();

        const { isFetching, data } = state;

        let text;
        if(isFetching)	text = 'fetching';
        else
        {
        	if(!data)	text = 'waiting';
        	else        text = data;
        }

        return text;
	}
	render()
	{
		return (
			<p className="text">
				{ this.getText() }
				<span className="btn bg_blue"
					  onClick={ ()=>{ this.props.store.dispatch(this.fetchDate()) } }
				>Fetch</span>
			</p>
			);
	}
}

const logger = createLogger();

const initial_state =
		{
			isFetching: !1,
			data: ''
		};

const reducer = (state, order) =>
		{
			const { type } = order;

			switch(type)
			{
				case 'Fetch_Before':
					return Object.assign({}, state, { isFetching: !0 });
					break;
				case 'Fetch_Done':
					return Object.assign({}, state, { isFetching: !1, data: order.data });
					break;
				case 'Fetch_Fail':
					return Object.assign({}, state, { isFetching: !1 });
					break;
				default:
					return state;
			}
		};

const store = createStore(
				reducer,
				initial_state,
				applyMiddleware(logger, thunk)
				);

const render = ()=>
		{
			ReactDom.render(
				<FetchBox store={ store } />,
				document.querySelector('#root')
				);
		};

render();
store.dispatch( render );

