import React from 'react';
import { Link } from 'react-router';

export default class Hello extends React.Component
{
	constructor(props)
	{
		super(props);
	}
	render()
	{
		return (
				<div>
					<h2>Hello, World! I Am Tangerine!</h2>
					<p>
						How Are You, { this.props.params.userName }?
					</p>
					<p>
						<Link to="/home">back to home.Page</Link>
					</p>
				</div>
			)
	}
}

/**
   通过this.props.params[name] 可访问路径中的参数
   更多信息可 Log(this.props) 查看
*/