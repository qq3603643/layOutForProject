import React from 'react';
import ReactDom from 'react-dom';
import { createStore } from 'redux';

import reducer from './reducer.jsx';
import Todos from './Todos.jsx';

require('plugins/css/reset.css')
require('../css/index.css');

const store = createStore(reducer);

const createTodos = ()=>
		{
			ReactDom.render(
					<Todos store={ store }/>,
					document.querySelector('#root')
				);
		}

createTodos();
store.subscribe(createTodos);