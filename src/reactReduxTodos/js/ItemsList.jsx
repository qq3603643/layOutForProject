import React from 'react';

export default class ItemsList extends React.Component
{
	constructor(props) {
	  super(props);

	  this.state = {};
	}
	toggleStatus(e)
	{
		let othis = e.currentTarget,
			id = othis.getAttribute('data-id');

		this.context.store.dispatch(
				{
					type: 'Toggle_Status',
					id: id
				}
			);
	}
	render()
	{
		let store = this.context.store,
			state = store.getState(),
			todos = state.todos,
			filter = state.filter;

		if(todos.length == 0)
			return null;

		todos = todos.filter((todo)=>{
			return (filter == 'ALL') ||
				   (filter == 'DONE' && todo.completed == !0) ||
				   (filter == 'TODO' && todo.completed == !1);
		});
		let Lis = todos.map((oS)=>{
			return (
					<li key={ oS.id } data-id={ oS.id }
					    className={ oS.completed ? 'done' : 'todo' }
				    	onClick={ this.toggleStatus.bind(this) }
					    >{ oS.text }</li>
				);
		})

		return (
				<ul className="items">
					{
						Lis
					}
				</ul>
			);
	}
}
ItemsList.contextTypes = {
	store: React.PropTypes.object.isRequired
}
