import React from 'react';
import PropTypes from 'prop-types';

const filterButtons = [
	{ name: 'all', label: 'All' },
	{ name: 'active', label: 'Active' },
	{ name: 'done', label: 'Done' },
];

const TasksFilter = ({ filter, filterChange }) => {
	const buttons = filterButtons.map(({ name, label }) => {
		const isActive = name === filter;
		const classNames = `btn ${isActive ? 'btn-info' : 'btn-outline-secondary'}`;
		return (
			<button key={name} type="button" onClick={() => filterChange(name)} className={classNames}>
				{label}
			</button>
		);
	});

	return <ul className="filters btn-group">{buttons}</ul>;
};

TasksFilter.defaultProps = {
	filter: 'all',
};

TasksFilter.propTypes = {
	filter: PropTypes.string,
	filterChange: PropTypes.func.isRequired,
};

export default TasksFilter;
