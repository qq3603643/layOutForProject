import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import Hello from '../modules/hello.jsx';
import Hi from '../modules/hi.jsx';
import Say from '../modules/say.jsx';
import Links from '../modules/links.jsx';

require('./css.js');
//Router 根据不同url渲染不同的组件
ReactDom.render(
		(
			<Router history = {hashHistory}>
				<Route path="/" component = { Hello } />
				<Route path="/hi" component = { Hi } />
				<Route path="/say" component = { Say } />
				<Route path="/links" component = { Links } />
			</Router>
		),
		document.querySelector('#root')
	);

// React.render(
// 		(
// 			<Router history = { hashHistory }>
// 				<Route path="/links" component = { Links }>
// 					<Route path="/" component = { Hello } />
// 					<Route path="/hi" component = { Hi } />
// 					<Route path="/say" component = { Say } />
// 				</Route>
// 			</Router>
// 		),
// 		document.querySelector('#root')
// 	);