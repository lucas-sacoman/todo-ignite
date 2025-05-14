import logoIcon from '../../assets/logo.svg';
import styles from './Header.module.scss';

const Header = () => {
	return (
		<header className={styles.header}>
			<img src={logoIcon} alt="todo logo" />
		</header>
	);
};

export { Header };
