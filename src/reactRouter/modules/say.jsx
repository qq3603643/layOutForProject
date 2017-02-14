import React from 'react';
import { Link } from 'react-router';

export default class Say extends React.Component
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
					<h2>I Want To Say Hello To You, My Dear!</h2>
					<p>
						<Link to="/">back to home.Page</Link>
					</p>
				</div>
			)
	}
}