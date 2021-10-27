import React, { useState, useEffect } from 'react';
import './App.css';

import Footer from '../Footer/Footer';
import NewTaskForm from '../NewTaskForm/NewTaskForm';
import TaskList from '../TaskList/TaskList';

const App = () => {
	let maxId = 100;


	const [todoData, setTodoData] = useState([
		{ id: 1, label: 'Completed task', done: false, editing: false, deadline: 600000 },
		{ id: 2, label: 'Editing task', done: false, editing: false, deadline: 900000 },
		{ id: 3, label: 'Active task', done: false, editing: false, deadline: 300000},
	]);
	const [filter, setFilter] = useState('all');
	const [timersOn, setTimersOn] = useState(false);

	 useEffect(() => setTodoData(todoData), [todoData]);


	 function activeTimers() {
		 let timers = 0;
		 for (let i = 0; i < todoData.length; i++) {
			 if (todoData[i].countdown) {
				 timers += 1;
			 }
		 }
		 return timers;
	 }

	const deleteItem = (id) => {
		setTodoData((todoDataArr) => {
			const idx = todoDataArr.findIndex((el) => el.id === id);

			const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];

			return newArray;
		});
	};

	const createTodoItem = (label, timer) => (
		{
			label,
			done: false,
			id: ++maxId,
			editing: false,
			deadline: timer,
		}
	)
		
	

	const onItemAdded = (label, min = 0, sec = 0) => {
		const deadline = (min * 60 + Number(sec)) * 1000;
		setTodoData((todoDataArr) => {
			const item = createTodoItem(label, deadline);

			return [...todoDataArr, item]
		});

	};

	function toggleProperty(arr, id, propName) {
		const idx = arr.findIndex((el) => el.id === id);
		const oldItem = arr[idx];
		const newItem = { ...oldItem, [propName]: !oldItem[propName] };

		return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
	}

	const onToggleDone = (id) => {
		setTodoData((todoDataArr) => {
			const newArr =  toggleProperty(todoDataArr, id, 'done');
			return newArr;
		});
	};

	const filterChange = (filterValue) => {
		setFilter(filterValue);
	};

	const clearCompleted = () => {
		setTodoData((todoDataArr) => {
			const resArr = todoDataArr.filter((el) => !el.done);
			return resArr;
		});
	};

	const changeItem = (id) => {
		setTodoData((todoDataArr) => {
			const idx = todoDataArr.findIndex((el) => el.id === id);
			const oldItem = todoDataArr[idx];
			const newItem = { ...oldItem, editing: !oldItem.editing };
			const newArr = [...todoDataArr.slice(0, idx), newItem, ...todoDataArr.slice(idx + 1)];

			return newArr;
		});
	};

	const onChangeHandler = (id, event) => {
		setTodoData((todoDataArr) => {
			const idx = todoDataArr.findIndex((el) => el.id === id);
			const oldItem = todoDataArr[idx];
			const newItem = { ...oldItem, label: event.target.value };
			const newArray = [...todoDataArr.slice(0, idx), newItem, ...todoDataArr.slice(idx + 1)];
			return newArray;
		});
	};

	const onSubmit = (id, event) => {
		event.preventDefault();
		setTodoData((todoDataArr) => {
			const idx = todoDataArr.findIndex((el) => el.id === id);
			const oldItem = todoDataArr[idx];
			const newItem = {
				...oldItem,
				editing: !oldItem.editing,
			};
			const newArray = [...todoDataArr.slice(0, idx), newItem, ...todoDataArr.slice(idx + 1)];
			return newArray;
		});
	};

	const countdownOn = (id) => {
		if (!timersOn) {setTimersOn(true)}
		setTodoData((todoDataArr) => {
			const idx = todoDataArr.findIndex((el) => el.id === id);
			const newArr = [...todoDataArr];
			newArr[idx].countdown = true;
			return newArr;
		})
	}

	const countdownOff = (id, date) => {
		const timers = activeTimers();
		if ( timers === 1) {setTimersOn(false)}
		setTodoData((todoDataArr) => {
			const idx = todoDataArr.findIndex((el) => el.id === id);
			const newArr = [...todoDataArr];
			newArr[idx].countdown = false;
			newArr[idx].deadline = date;
			return newArr;
		})
	}

	const updateTimers = () => {
		setTodoData((todoDataArr) => {
			const newArr = [...todoDataArr];
		for (let i = 0; i < newArr.length; i++) {
			if (newArr[i].deadline > 1000 && newArr[i].countdown) {
				newArr[i].deadline -= 1000;
			} else if (newArr[i].deadline <= 1000 && newArr[i].countdown) {
				newArr[i].deadline = 1;
				newArr[i].countdown = false;
				const timersCount = activeTimers();
				if (timersCount === 0) {
					setTimersOn(false)
				}
			}
		}
		return newArr;
		})
	}

	useEffect(() => {
		let timerID = null;
		if (timersOn) {
			timerID = setInterval(updateTimers, 1000);
		} else {
			clearInterval(timerID)
		}
		return () => clearInterval(timerID)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [timersOn]);


	function filterItems(todoDataArr, filterValue) {
		let visibleItems = todoData;

		if (filterValue === 'all') {
			visibleItems = todoDataArr;
		}
		if (filterValue === 'active') {
			visibleItems = todoDataArr.filter((item) => !item.done);
		}
		if (filterValue === 'done') {
			visibleItems = todoDataArr.filter((item) => item.done);
		}
		return visibleItems;
	}
	
		const doneCount = todoData.filter((el) => el.done).length;

		const todoCount = todoData.length - doneCount;

		return (
			<div>
				<section className="todoapp">
					<section className="main">
						<NewTaskForm onItemAdded={(label, min, sec) => onItemAdded(label, min, sec)} />
						<TaskList
							todos={filterItems(todoData, filter)}
							onDeleted={deleteItem}
							onToggleDone={onToggleDone}
							changeItem={changeItem}
							onChangeHandler={onChangeHandler}
							onSubmit={onSubmit}
							countdownOff={countdownOff}
							countdownOn={countdownOn}
						/>

						<Footer
							clearCompleted={clearCompleted}
							filter={filter}
							filterChange={filterChange}
							todoCount={todoCount}
							doneCount={doneCount}
						/>
					</section>
				</section>
			</div>

		);
}

export default App;