import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, hashHistory , IndexRedirect } from 'react-router';
import Hello from '../modules/hello.jsx';
import Hi from '../modules/hi.jsx';
import Say from '../modules/say.jsx';
import Links from '../modules/links.jsx';

require('./css.js');
//Router 根据不同url渲染不同的组件
// ReactDom.render(
// 		(
// 			<Router history = { hashHistory }>
// 				<Route path="/hello" component = { Hello } />
// 				<Route path="/hi" component = { Hi } />
// 				<Route path="/say" component = { Say } />
// 				<Route path="/home" component = { Links } />
// 			</Router>
// 		),
// 		document.querySelector('#root')
// 	);

//将links下面的组件事先隐藏 点击links子元素进行切换显示隐藏
//测试发现嵌套路由(当子组件的任何一个path满足时 父组件都将显示)
//子组件前面没有 / 时路径是相对父组件的 例如 Hello 将在路径为/home/hello时显示
//访问父组件定义的根路径时 由于this.props.children 没有所以子组件空白 此时可以用IndexRedirect重定向
//或者用<IndexRoute component={ Hello }/>实现同样效果
React.render(
		(
			<Router history = { hashHistory  }>
				<Route path="/home" component = { Links }>
					<IndexRedirect to="hello/:userName" />
					<Route path="hello/:userName" component = { Hello } />
					<Route path="hi" component = { Hi } />
					<Route path="say" component = { Say } />
				</Route>
			</Router>
		),
		document.querySelector('#root2')
	);