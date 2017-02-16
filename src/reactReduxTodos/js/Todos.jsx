import React from 'react';
import DateForm from './DateFrom.jsx';
import ItemsList from './ItemsList.jsx';
import FilterFooter from './FilterFooter.jsx';

export default class Todos extends React.Component
{
	constructor(props)
	{
	  super(props);

	  this.state = {};
	}
	getChildContext()
	{
		return {
			store: this.props.store
		}
	}
	render()
	{
	    return (
	    		<div id="wraper">
	    			<DateForm />
	    			<ItemsList />
	    			<FilterFooter />
	    		</div>
	    	);
	}
}

Todos.childContextTypes = {
	store: React.PropTypes.object.isRequired
};