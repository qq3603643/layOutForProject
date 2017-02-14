import React from 'react';
import { Link } from 'react-router';

export default class Links extends React.Component
{
	constructor(props) {
	  super(props);

	  this.state = {
	  	links: ['/hello', '/hi', '/say']
	  };
	};
	render()
	{
		const Lis = this.state.links.map((link, index)=>{
			return <li key={ index }>
						<Link to={ link }>This Is A Href Link To { link.replace(/\//, '') }.page</Link>
				   </li>;
		})
		return(
				<div>
					<h2>Welcome To My Zone!</h2>
					<ul className="linkItems">
						{ Lis }
					</ul>
					{
						this.props.children
					}
				</div>
			);
	};
}