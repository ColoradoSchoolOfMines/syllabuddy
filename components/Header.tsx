import styles from '../styles/Header.module.scss'
import Link from 'next/link'
export default function Header() {
	return (
		<header className={styles.headerComponent}>
			<div className={styles.header}>
				<nav>
					<h1><Link href="/">Syllabuddies</Link></h1>
					<input className='searchbar' type="text" placeholder="Search.." />
				</nav>
			</div>
		</header>
	)
}