import React from 'react';
import './Task.css';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import Timer from '../Timer/Timer';

const Task = ({ onDeleted, onToggleDone, done, changeItem, editing, onChangeHandler, stateTask, onSubmit, deadline, countdown, timerOff, timerOn }) => {
	let classNames = 'todo-list-item description';

	if (done) {
		classNames += ' completed-task';
	}

	const createdDate = new Date();

	let timer;
	if (deadline === 'x') {
		timer = <Timer deadline={1} countdown={false} />
	} else if (deadline) {
		timer = <Timer deadline={deadline} countdown={countdown} timerOn={timerOn} timerOff={(date) => timerOff(date)} />
	} else {
		timer = null
	}

	let editingTask;
	if (editing) {
		editingTask = (
			<label className={classNames}>
				<input className="description form-control" onChange={onChangeHandler} defaultValue={stateTask} />{' '}
			</label>
		);
	} else {
		editingTask = (

			<div className={classNames}>
				<input className="toggle" type="checkbox" checked={done} onChange={onToggleDone} />

				<label>
					<span className={classNames}>{stateTask}</span>
					{timer}

					<span className="created">created {formatDistanceToNow(createdDate, { includeSeconds: true })} ago</span>
				</label>

				<button className="icon icon-edit btn" onClick={changeItem} type="button">
					<i className="fa fa-edit" />
				</button>

				<button className="icon icon-destroy btn" onClick={onDeleted} type="button">
					<i className="fa fa-trash-o" />
				</button>
			</div>
		);
	}

	return (
		<form onSubmit={onSubmit}>
			<div className="view">{editingTask}</div>

		</form>
	);
};

Task.defaultProps = {
	onDeleted: () => {},
	onToggleDone: () => {},
	done: false,
	changeItem: () => {},
	editing: false,
	onChangeHandler: () => {},
	stateTask: '',
	onSubmit: () => {},
	deadline: 0,
	countdown: false,
	timerOn: () => {},
	timerOff: () => {},
};

Task.propTypes = {
	onDeleted: PropTypes.func,
	onToggleDone: PropTypes.func,
	done: PropTypes.bool,
	changeItem: PropTypes.func,
	editing: PropTypes.bool,
	onChangeHandler: PropTypes.func,
	stateTask: PropTypes.string,
	onSubmit: PropTypes.func,
	deadline: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	countdown: PropTypes.bool,
	timerOn: PropTypes.func,
	timerOff: PropTypes.func,
};

export default Task;
