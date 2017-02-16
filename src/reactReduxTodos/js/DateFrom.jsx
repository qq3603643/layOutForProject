import React from 'react';

export default class DateForm extends React.Component
{
	constructor(props) {
	  super(props);

	  this.state = {};
	}
	addHandler(e)
	{
		let othis = e.currentTarget,
			oIpt = this.refs.J_userInput,
			value = oIpt.value;

		oIpt.value = (value = value.replace(/^\s\s*/, '').replace(/\s*\s$/, ''));
		if(!value)
		{
			alert('content is required!');
			return;
		}

		let store = this.context.store,
			state = store.getState(),
			todos = state.todos;

		store.dispatch(
				{
					type: 'Add_One',
					text: value,
					id: todos.length
				}
			);
	}
	render()
	{
		return (
			<form>
				<input type="text" className="input" ref='J_userInput'/>
				<input type="button" className="btn" ref="J_add" value="ADD" onClick={ this.addHandler.bind(this) }/>
			</form>
			);
	}
}
DateForm.contextTypes = {
	store: React.PropTypes.object.isRequired
}