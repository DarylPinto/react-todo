import React from 'react';
import {VIEWS} from '../../constants/constants';
import sentenceCase from '../../utilities/sentenceCase';
import '../css/ViewToggle.css';

const ViewToggle = props => {
	const {currentView, onViewChange} = props;
	return (
		<div id="view-toggle">
			{Object.values(VIEWS).map(view => (
				<label key={view}>
					{sentenceCase(view)}
					<input type="radio" name="currentView" value={view} onChange={onViewChange} checked={currentView === view} />
				</label>
			))}
		</div>
	);
};

export default ViewToggle;
