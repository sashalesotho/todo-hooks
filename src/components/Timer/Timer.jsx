import React from 'react';
import PropTypes from 'prop-types';
import lightFormat from 'date-fns/lightFormat';
import './Timer.css';

const Timer = ({ deadline, timerOn, timerOff, countdown }) => {
	const stop = () => {
		if(!countdown) return;
		timerOff(deadline);
	}

	const start = () => {
		if(countdown) return;
		timerOn()
	}

		return (
			<div className="timer">
				<button type='button' className='timer-btn' onClick={start} aria-label='start'><i className="fa fa-play" /></button>
				<button type='button' className='timer-btn' onClick={stop} aria-label='stop'><i className="fa fa-pause" /></button>
				<div className="display">{lightFormat(new Date(deadline), ' mm-ss')}</div>
			</div>
		);
	}

Timer.defaultProps = {
	timerOn: () => {},
	timerOff: () => {},
	deadline: 0,
	countdown: false,
}

Timer.propTypes = {
	timerOn: PropTypes.func,
	timerOff: PropTypes.func,
	deadline: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	countdown: PropTypes.bool,
}

export default Timer;

