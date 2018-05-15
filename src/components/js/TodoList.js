import React, { Component } from 'react';

class TodoList extends Component {
	render() {
		return (
			<ul>
				{this.props.todos.map(todo => (
					<li key={todo.id} onClick={() => this.props.onTodoClick(todo.id)} className={todo.completed ? "completed" : null}>
						{todo.text}
					</li>
				))}
			</ul>
		);
	}
}

export default TodoList;
