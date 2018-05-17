import React from 'react';
import '../css/TodoList.css';

const TodoList = props => {
	const {todos, onTodoClick} = props;
	return (
		<ul>
			{todos.map(todo => (
				<li key={todo.id} onClick={() => onTodoClick(todo.id)} className={todo.completed ? "completed" : null}>
					{todo.text}
				</li>
			))}
		</ul>
	);
};

export default TodoList;
