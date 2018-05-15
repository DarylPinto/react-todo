import React, { Component } from 'react';
import TodoList from './TodoList';
import ViewToggle from './ViewToggle';

const ENTER_KEY = 13;

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
	handleChange = e => this.setState({newTodo: e.target.value});

	handleKeyDown = e => {
		if(e.keyCode !== ENTER_KEY) return;

		this.setState(prevState => ({
			newTodo: "",
			todos: [...prevState.todos, {
				id: Date.now(),
				text: prevState.newTodo,
				completed: false
			}]
		}));
	}

	//To-do List Handlers
	toggleTodoComplete = id => {
		let todos = [...this.state.todos];
		let target = todos.find(todo => todo.id === id);
		target.completed = !target.completed;
		this.setState({todos});
	}

	//Control Panel Handlers
	updateCurrentView = e => this.setState({currentView: e.target.value});

	completeAll = () => {
		let todos = [...this.state.todos];
		todos.every(t => t.completed) ?
			todos.forEach(t => t.completed = false) :
			todos.forEach(t => t.completed = true);	
		this.setState({todos});
	}

	clearCompleted = () => {
		let todos = [...this.state.todos].filter(todo => !todo.completed);
		this.setState({todos});
	}

	render() {
		const todos = [...this.state.todos];
		let shownTodos = todos;

		if(this.state.currentView === "active") shownTodos = todos.filter(todo => !todo.completed);
		else if(this.state.currentView === "completed") shownTodos = todos.filter(todo => todo.completed);
	
		return (
			<main>
				<h1>To-do List</h1>
				<input placeholder="What needs to be done?" autoFocus value={this.state.newTodo} onChange={this.handleChange} onKeyDown={this.handleKeyDown} />
				<TodoList todos={shownTodos} onTodoClick={this.toggleTodoComplete} />
				<div className="control-panel">
					<ViewToggle onViewChange={this.updateCurrentView} />
					<button onClick={this.completeAll}>Complete All</button>
					<button onClick={this.clearCompleted}>Clear Completed</button>
				</div>
			</main>
		);
	}
}

export default App;
