import styles from '../styles/Home.module.scss'
import Link from 'next/link'
import Image from 'next/image'
export default function BigSearch({value, setValue} : {value: string, setValue: any}) {
	return (
		<div className={styles.searchContainer}>
			<div className={styles.searchContainerInner}>
				<input
					placeholder="Filter by course department, number, and/or name..."
					value={value}
					onChange={e => setValue(e.target.value)}
				/>
				<Image alt="" className={styles.searchIcon} width="30" height="30" src="icon-search.svg"></Image>
			</div>
		</div>
	)
}

export function isSearchResult(course: any, rawSearch: string, 
	searchParams: any = [
		{ param : "Course Name", 		enabled: true  },
		{ param : "Course Number", 	enabled: true  },
		{ param : "Professor",			enabled: false }	]) {
	// if search is empty, return true
	if (rawSearch == "") return true;
	const search = rawSearch.toLowerCase();
	// remove disabled search params
	searchParams = searchParams.filter( (searchItem: any) => searchItem.enabled);
	// grab course data for each search param
	searchParams = searchParams.map( (searchItem: any) => (
		{...searchItem, data : course[searchItem?.param]?.toLowerCase()}
	))
	// if Course Number is an enabled search param, add a search param without spaces
	if (searchParams.some( (searchItem: any) => searchItem.param == "Course Number")) {
		searchParams.push({
			param: "Course Number", enabled: true, 
			data: course["Course Number"].replace(" ", "").toLowerCase()
		})
	}
	return searchParams.some( (searchItem: any) => searchItem.data?.includes(search) );
}