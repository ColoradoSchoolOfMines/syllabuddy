// https://docs.google.com/forms/d/e/1FAIpQLScx6kpBzIJWUOSbspixLrMWfeVh6C6xHJFfZ_NvEsxSTo4QKg/viewform

import styles from '../styles/Footer.module.scss'
import Link from 'next/link'
export default function Header({coursesData} : {coursesData?: Array<any>}) {

	return (
		<footer className={styles.footerComponent}>
			<p>
				Want to contribute your own syllabus? Upload it <a
			href="https://docs.google.com/forms/d/e/1FAIpQLScx6kpBzIJWUOSbspixLrMWfeVh6C6xHJFfZ_NvEsxSTo4QKg/viewform">
				here.
				</a>
			</p>
		</footer>
	)
}