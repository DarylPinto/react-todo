import React, { Component } from 'react';
import '../css/App.css';

//Constants
const ENTER_KEY = 13;
const VIEW_ALL = "all";
const VIEW_ACTIVE = "active";
const VIEW_COMPLETED = "completed";

//Utilities
const clone = obj => JSON.parse(JSON.stringify(obj));

//Stateless Functional Components
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

const ViewToggle = props => {
	const {onViewChange} = props;
	return (
		<div id="view-toggle">	
			<label htmlFor="view-all">All</label>
			<input type="radio" id="view-all" name="currentView" value={VIEW_ALL} onChange={onViewChange} defaultChecked="checked" />

			<label htmlFor="view-active">Active</label>
			<input type="radio" id="view-active" name="currentView" value={VIEW_ACTIVE} onChange={onViewChange} />

			<label htmlFor="view-completed">Completed</label>
			<input type="radio" id="view-completed" name="currentView" value={VIEW_COMPLETED} onChange={onViewChange} />
		</div>
	);
};

//Main Component
class App extends Component {

	constructor(props){
		super(props);
		this.state = {
			newTodo: "",
			currentView: "all",
			todos: []
		}
	}

	//Input Handlers
	handleChange = e => this.setState({newTodo: e.target.value})

	handleKeyDown = e => {
		const todoText = this.state.newTodo.trim();
		if(e.keyCode !== ENTER_KEY || todoText.length === 0) return;

		this.setState(prevState => ({
			newTodo: "",
			todos: [...prevState.todos, {
				id: Date.now(),
				text: todoText,
				completed: false
			}]
		}));
	}

	//To-do List Handlers
	toggleTodoComplete = id => {
		const todos = clone(this.state.todos);
		let todo = todos.find(todo => todo.id === id);
		todo.completed = !todo.completed;
		this.setState({todos});
	}

	//Control Panel Handlers
	updateCurrentView = e => this.setState({currentView: e.target.value})

	completeAll = () => {
		const todos = clone(this.state.todos);
		todos.every(t => t.completed) ?
			todos.forEach(t => t.completed = false) :
			todos.forEach(t => t.completed = true);	
		this.setState({todos});
	}

	clearCompleted = () => {
		let todos = clone(this.state.todos).filter(todo => !todo.completed);
		this.setState({todos});
	}

	render() {

		const {newTodo, currentView, todos} = this.state;
		let shownTodos;

		switch(currentView){
			case VIEW_ACTIVE:
				shownTodos = todos.filter(todo => !todo.completed);
				break;
			case VIEW_COMPLETED:
				shownTodos = todos.filter(todo => todo.completed);
				break;
			default:
				shownTodos = todos;
		}
	
		return (
			<main>
				<h1>To-do List</h1>
				<input placeholder="What needs to be done?" autoFocus value={newTodo} onChange={this.handleChange} onKeyDown={this.handleKeyDown} />
				<TodoList todos={shownTodos} onTodoClick={this.toggleTodoComplete} />
				<div className="control-panel">
					<ViewToggle onViewChange={this.updateCurrentView} />
					<button type="button" onClick={this.completeAll}>Complete All</button>
					{todos.some(todo => todo.completed) &&
						<button type="button" onClick={this.clearCompleted}>Clear Completed</button>
					}	
				</div>
			</main>
		);
	}
}

export default App;
