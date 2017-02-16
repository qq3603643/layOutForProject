const todoHandler = (todos, orderState) =>
		{
			switch(orderState.type)
			{
				case 'Add_One':
					return todos.concat({ text: orderState.text, id: orderState.id, completed: !1 });
					break;
				case 'Toggle_Status':
					return todos.map((todo)=>{
						if(todo.id == orderState.id)
							return Object.assign({}, todo, { completed: !todo.completed });
						else
							return todo;
					});
					break;
				default:
					return todos;
			}
		}

const filterHandler = (filter, orderState) =>
		{
			switch(orderState.type)
			{
				case 'Set_Filter':
					return orderState.filter;
					break;
				default:
					return filter;
			}
		}

const reducer = (state = { todos:[], filter: 'ALL' }, orderState) =>
		{
			return {
				todos: todoHandler(state.todos, orderState),
				filter: filterHandler(state.filter, orderState)
			};
		}

export default reducer;