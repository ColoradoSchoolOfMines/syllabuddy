import styles from '../styles/Header.module.scss'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router';
import { isSearchResult } from './BigSearch';

function SearchBar({coursesData} : {coursesData?: Array<any>}) {
	const router = useRouter();
	const hideSearchBar = router.pathname === '/';
	const [search, setSearch] = useState('');

	if (hideSearchBar) {
		return <></>;
	}

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
				href={`syllabus?id=${course["id"]}`}
				className={styles.searchResults}>
					<b>{course["Course Number"]}</b>: {course["Course Name"]}</Link>
				))

			}
		</div>
	)
}

export default function Header({coursesData} : {coursesData?: Array<any>}) {
	
	// TODO: limit number of search results

	return (
		<header className={styles.headerComponent}>
			<div className={styles.header}>
				<nav>
					<h1><Link href="/">Syllabuddies</Link></h1>
					<SearchBar coursesData={coursesData}/>
				</nav>
			</div>
		</header>
	)
}