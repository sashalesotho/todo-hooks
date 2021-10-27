import React from 'react';
import './Footer.css';
import PropTypes from 'prop-types';
import TasksFilter from '../TasksFilter/TasksFilter';

const Footer = ({ clearCompleted, filterChange, filter, todoCount }) => (
	<footer className="footer">
		<span className="todo-count">{todoCount} items left</span>
		<TasksFilter filter={filter} filterChange={filterChange} />
		<button className="clear-completed" onClick={clearCompleted} type="button">
			Clear completed
		</button>
	</footer>
);

Footer.defaultProps = {
	clearCompleted: () => {},
	filter: 'all',
	filterChange: () => {},
	todoCount: 0,
};

Footer.propTypes = {
	clearCompleted: PropTypes.func,
	filter: PropTypes.string,
	filterChange: PropTypes.func,
	todoCount: PropTypes.number,
};

export default Footer;
