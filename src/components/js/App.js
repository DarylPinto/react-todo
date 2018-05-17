import React, {Component} from 'react';
import TodoList from './TodoList';
import ViewToggle from './ViewToggle';
import {ENTER_KEY, VIEWS} from '../../constants/constants.js';
import clone from '../../utilities/clone';
import '../css/App.css';

class App extends Component {

	state = {
		newTodo: "",
		currentView: VIEWS.VIEW_ALL,
		todos: []
	}

	//Getters
	get shownTodos() {
		const {currentView, todos} = this.state;

		switch(currentView){
			case VIEWS.VIEW_ACTIVE: return todos.filter(todo => !todo.completed);
			case VIEWS.VIEW_COMPLETED: return todos.filter(todo => todo.completed);
			default: return todos;
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
		const {newTodo, currentView} = this.state;
	
		return (
			<main>
				<h1>To-do List</h1>
				<input type="text" placeholder="What needs to be done?" autoFocus value={newTodo} onChange={this.handleChange} onKeyDown={this.handleKeyDown} />
				<TodoList todos={this.shownTodos} onTodoClick={this.toggleTodoComplete} />
				<div className="control-panel">
					<ViewToggle currentView={currentView} onViewChange={this.updateCurrentView} />
					<button type="button" onClick={this.completeAll}>Complete All</button>
					<button type="button" onClick={this.clearCompleted}>Clear Completed</button>
				</div>
			</main>
		);
	}
}

export default App;
