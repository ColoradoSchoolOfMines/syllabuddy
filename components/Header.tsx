import styles from '../styles/Header.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router';
import { isSearchResult } from './BigSearch';

function SearchBar({coursesData} : {coursesData?: Array<any>}) {
	const router = useRouter();
	const hideSearchBar = router.pathname === '/';
	const [search, setSearch] = useState('');

	if (hideSearchBar) return <></>;

	const coursesDataFiltered = coursesData?.filter((course: any) => isSearchResult(course, search));
	coursesDataFiltered?.sort((a: any, b: any) => {
		const strA = a["Course Number"].toLowerCase();
		const strB = b["Course Number"].toLowerCase();
		if (strA > strB) return 1;
		if (strA < strB) return -1;
		return 0;
	});

  return (
		<div className={styles.searchContainer}>
			<input className='searchbar' type="text" placeholder="Search..." 
			onChange={e => setSearch(e.target.value)}/>
			{
				search != "" && 
				coursesDataFiltered?.map((course : any) => (
				<Link key={`LILSEARCHRESULT${course["id"]}`} 
				href={`${course["id"]}`}
				className={styles.searchResults}>
					<b>{course["Course Number"]}</b>: {course["Course Name"]}</Link>
				))

			}
		</div>
	)
}

function ColorSchemeController() {

	// let [hideDebug, setDebug] = useState(true);
	// useEffect(() => {
	// 	setDebug(globalThis?.location?.search.indexOf('debug') === -1);
	// }, []);
	// if (hideDebug) {
	// 	return <></>;
	// }

	return (
		<div>
			<Image title="Switch to dark mode" alt="" tabIndex={0} className={styles.colorSchemeIcon} onClick={() => {
				document.documentElement.setAttribute("data-theme", "dark");
			}} width="40" height="40" src="/icon-dark.svg"></Image>
			<Image title="Switch to light mode" alt="" tabIndex={0} className={styles.colorSchemeIcon} onClick={() => {
				document.documentElement.setAttribute("data-theme", "light");
			}} width="40" height="40" src="/icon-light.svg"></Image>
		</div>
	);
}

export default function Header({coursesData} : {coursesData?: Array<any>}) {
	
	// TODO: limit number of search results

	return (
		<header className={styles.headerComponent}>
			<div className={styles.header}>
				<nav>
					<h1><Link href="/">Syllabuddies</Link></h1>
					<ColorSchemeController/>
					<SearchBar coursesData={coursesData}/>
				</nav>
			</div>
		</header>
	)
}