import React from 'react';
import { Link } from 'react-router';

export default class Hi extends React.Component
{
	constructor(props)
	{
	  super(props);

	  this.state = {};
	}
	render()
	{
		return (
				<div>
					<h2>Hi Tangerine, I Am Apple!</h2>
					<p>
						<Link to="/">back to home.Page</Link>
					</p>
				</div>
			)
	}
}