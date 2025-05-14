import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ClipLoader } from 'react-spinners';

import { Header } from './components/Header/Header';
import { EmptyState } from './components/EmptyState/EmptyState';
import plusIcon from './assets/plus.png';
import { Trash } from '@phosphor-icons/react';

import styles from './App.module.scss';

interface Task {
	id: string;
	title: string;
	isCompleted: boolean;
}

const App = () => {
	const [task, setTask] = useState('');
	const [tasks, setTasks] = useState<Task[]>([]);
	const [loading, setLoading] = useState(false);

	const inputRef = useRef<HTMLInputElement>(null); // Referência ao input

	const completedTasks = tasks.filter(task => task.isCompleted).length;

	const handleCreateTask = (e: FormEvent) => {
		e.preventDefault();
		setLoading(true);

		const newTask = {
			id: crypto.randomUUID(),
			title: task,
			isCompleted: false,
		};

		setTask('');

		setTimeout(() => {
			setLoading(false);
			console.log(task);
			setTasks(prevTasks => [newTask, ...prevTasks]);
		}, 2000);
	};

	const handleCompleteTask = (id: string) => {
		setTasks(prevTasks =>
			prevTasks.map(task => {
				if (task.id === id) {
					return { ...task, isCompleted: !task.isCompleted };
				}

				return task;
			})
		);
	};

	const handleDeleteTask = (id: string) => {
		setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
	};

	const completedTasksNumber = () => {
		if (!completedTasks) {
			return 0;
		}

		return `${completedTasks} de ${tasks.length}`;
	};

	useEffect(() => {
		if (!loading) {
			// Volta o foco pro input
			inputRef.current?.focus();
		}
	}, [loading]);

	return (
		<>
			<Header />

			<main>
				<form className={styles.createTaskForm} onSubmit={handleCreateTask}>
					<input
						ref={inputRef} // Aplica a referência
						type="text"
						value={task}
						disabled={loading}
						onChange={e => setTask(e.target.value)}
						placeholder="Adicione uma nova tarefa"
					/>

					<button disabled={!task.trim().length} type="submit">
						Criar {!loading && <img src={plusIcon} alt="ícone de mais" />}
						<ClipLoader
							color="#f2f2f2"
							size={16}
							className={styles.loader}
							loading={loading}
						/>
					</button>
				</form>

				<section className={styles.tasksContainer}>
					<header>
						<h2>
							Tarefas criadas <span>{tasks.length}</span>
						</h2>

						<h2>
							Concluídas <span>{completedTasksNumber()}</span>
						</h2>
					</header>

					{!tasks.length && <EmptyState />}

					<div className={styles.tasksList}>
						{tasks.map(({ id, title, isCompleted }) => (
							<div
								key={id}
								className={`${styles.task} ${
									isCompleted ? styles.completed : ''
								}`}
							>
								<input
									id={`checkbox-${id}`}
									type="checkbox"
									checked={isCompleted}
									onChange={() => handleCompleteTask(id)}
								/>

								<label htmlFor={`checkbox-${id}`} className={styles.checkbox}>
									{title}
								</label>

								<button type="button" onClick={() => handleDeleteTask(id)}>
									<Trash size={16} alt="ícone de lixeira" />
								</button>
							</div>
						))}
					</div>
				</section>
			</main>
		</>
	);
};

export { App };
