import React from 'react';

export default class FilterFooter extends React.Component
{
	constructor(props)
	{
	  super(props);

	  this.state = {};
	}
	filterHander(e)
	{
		const store = this.context.store,
			  othis = e.currentTarget,
			  filter = othis.getAttribute('data-filter');

		store.dispatch(
				{
					type: 'Set_Filter',
					filter: filter
				}
			);
	}
	render()
	{
		const conditions = ['ALL', 'DONE', 'TODO'],
			  filter = this.context.store.getState().filter,
			  Lis = conditions.map((condition)=>{
			  	return (
			  			<li className={ `item ${filter==condition ? 'active' : ''}` }
			  			    data-filter={ condition }
			  				onClick={ this.filterHander.bind(this) }>
			  				{ condition }
			  			</li>
			  		);
			  });

		return (
			<ul className="filterWraper">
				{
					Lis
				}
			</ul>
			);
	}
}

FilterFooter.contextTypes = {
	store: React.PropTypes.object.isRequired
}