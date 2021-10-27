import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './NewTaskForm.css'

const NewTaskForm = ({onItemAdded}) => {
	

	const [label, setLabel] = useState('');
	const [timerMin, setTimerMin] = useState('');
	const [timerSec, setTimerSec] = useState('');
	
	const onLabelChange = (event) => {
		if (event.target.value.trim().length) {
			setLabel(event.target.value)
			};
		}

		const onInputChange = (event) => {
		const { target } = event;
		const { value, name } = target;
		if (name === 'label') setLabel(value);
		if (name === 'timerMin') setTimerMin(value);
		if (name === 'timerSec') setTimerSec(value);
	}

	const onSubmit = (event) => {
		event.preventDefault();
		onItemAdded(label, timerMin, timerSec );
		setLabel('');
		setTimerMin('');
		setTimerSec('');
	};

		return (
			<div>
				<form className="item-add-form d-flex" onSubmit={onSubmit}>

					<h1>todos</h1>


					<input
						type="text"
						name="label"
						className="new-todo"
						value={label}
						placeholder="What needs to be done?"
						onChange={onLabelChange}
						required
					/>

					<input type='number' name='timerMin' className='new-todo-timer' max='60' placeholder='min' onChange={onInputChange} value={timerMin} />
					<input type='number' name='timerSec' className='new-todo-timer' max='60' placeholder='sec' onChange={onInputChange} value={timerSec} />
					<input type='submit' className='form-submit' value='ok' />
				</form>
			</div>
		);
}

NewTaskForm.defaultProps = {
	onItemAdded: () => {},
};

NewTaskForm.propTypes = {
	onItemAdded: PropTypes.func,
};

export default NewTaskForm;