import emptyStateIcon from '../../assets/clipboard.svg';

import styles from './EmptyState.module.scss';

const EmptyState = () => {
	return (
		<div className={styles.emptyState}>
			<img src={emptyStateIcon} alt="ícone quando não há tarefas criadas" />

			<p>
				<strong>Você ainda não tem tarefas cadastradas</strong>
				<br />
				Crie tarefas e organize seus itens a fazer
			</p>
		</div>
	);
};

export { EmptyState };
