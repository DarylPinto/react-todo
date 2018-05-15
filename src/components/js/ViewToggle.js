import React, { Component } from 'react';

class ViewToggle extends Component {
	render() {
		return (
			<div id="view-toggle">
				All <input type="radio" name="currentView" value="all" defaultChecked="checked" onChange={this.props.onViewChange} />
				Active <input type="radio" name="currentView" value="active" onChange={this.props.onViewChange} />
				Completed <input type="radio" name="currentView" value="completed" onChange={this.props.onViewChange} />
			</div>
		);
	}
}

export default ViewToggle;
