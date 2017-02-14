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
						<Link to="/">back to home.Page</Link>
					</p>
				</div>
			)
	}
}