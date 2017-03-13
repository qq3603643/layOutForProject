import React from 'react';
import ReactDom from 'react-dom';

import { createStore } from 'redux';

require('../css/index.css');

class EleDragable extends React.Component
{
	constructor(props)
	{
	  super(props);

	  this.state = {}
	}
	msDnHandler(e)
	{
		let store = this.props.store,
			state = store.getState();

		let _this = e.currentTarget,
			_clickX = e.clientX,
			_clickY = e.clientY,
			_clickL = _this.offsetLeft,
			_clickT = _this.offsetTop;

		let orderSign = {
			type: 'Toggle_Drag',
			isDragable: !0
		};
		store.dispatch(orderSign);

		let orderClient = {
			type: 'Update_Client',
			clientX: _clickX,
			clientY: _clickY,
			clickL: _clickL,
			clickT: _clickT
		};
		store.dispatch(orderClient);
	}
	msMvHandler(e)
	{
		let store = this.props.store,
			state = store.getState();

		if(!state.isDragable)	return;

		let _this  = e.currentTarget,
			_moveX = e.clientX,
			_moveY = e.clientY;

		let _lastX = state.clientX,
		    _lastY = state.clientY,
		    _lastL = state.clickL,
		    _lastT = state.clickT;

	    let _newL = _lastL + ( _moveX - _lastX ),
	    	_newT = _lastT + ( _moveY - _lastY );

		let orderPos = {
			type: 'Update_Pos',
			left: _newL,
			top: _newT
		};

		store.dispatch(orderPos);
	}
	msUpHandler(e)
	{
		let store = this.props.store,
			state = store.getState();

		let orderSign = {
			type: 'Toggle_Drag',
			isDragable: !1
		};

		store.dispatch(orderSign);
	}
	render()
	{
		let store = this.props.store,
			state = store.getState();

		return (
				<p className = "box"
				   ref = 'self'
				   style = { {left: `${state.left}px`, top: `${state.top}px`} }
				   onMouseDown = { this.msDnHandler.bind(this) }
				   onMouseMove = { this.msMvHandler.bind(this) }
				   onMouseUp   = { this.msUpHandler.bind(this) }
				>
					DragEle
				</p>
			);
	}
}

const reducer = (state = {left: 50, top: 50, clientX: 0, clientY: 0, clickL: 50, clickT: 50,isDragable: !1}, orderState)=>
		{
			switch(orderState.type)
			{
				case 'Toggle_Drag':
					return Object.assign({}, state, { isDragable: orderState.isDragable });
					break;
				case 'Update_Pos':
					return Object.assign({}, state, { left: orderState.left, top: orderState.top });
					break;
				case 'Update_Client':
					return Object.assign({}, state, { clientX: orderState.clientX, clientY: orderState.clientY, clickL: orderState.clickL, clickT: orderState.clickT });
					break;
				default:
					return state;
			}
		};

const store = createStore(reducer);

const createDrag = ()=>
		{
			ReactDom.render(
				<EleDragable store = { store }/>,
				document.querySelector('#J_root')
				);
		};

createDrag();

store.subscribe(createDrag);