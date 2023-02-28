import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.scss'
import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'

import { useQuery } from "react-query";
import { fetchCourses } from '@/fetch-functions';
const inter = Inter({ subsets: ['latin'] })

function isSearchResult(course: any, rawSearch: string, 
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

export default function Home() {
	const [bigSearch, setBigSearch] = useState<string>("");
	const { isLoading, error, data: coursesData } = useQuery(
		{
			queryKey: "courseData", 
			queryFn: () => fetchCourses(),
			refetchOnWindowFocus: false, 
			staleTime: 1000 * 60 * 60 * 3, 
			cacheTime: 1000 * 60 * 60 * 3  
			//it will only refetch if the page is open for 3 hours
		}
	);
	
	const coursesDataFiltered = coursesData?.filter((course: any) => isSearchResult(course, bigSearch));
	// TODO: make sorting modular
	coursesDataFiltered?.sort((a: any, b: any) => {
		const strA = a["Course Number"].toLowerCase();
		const strB = b["Course Number"].toLowerCase();
		if (strA > strB) return 1;
		if (strA < strB) return -1;
		return 0;
	});

	return (
		<>
			<Head>
				<title>Syllabuddies</title>
				<meta name="description" content="Find a syllabus at the Colorado School of Mines" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				{/* TODO: create a favicon for Syllabuddies */}
				<link rel="icon" href="/favicon.ico" />
			</Head>
			
			<Header/>
			<main className={styles.main}>
				<div className={styles.searchContainer}>
					<div className={styles.searchContainerInner}>
						<input
							placeholder="Filter by course department, number, and/or name..."
							value={bigSearch}
							onChange={e => setBigSearch(e.target.value)}
						/>
						<Image alt="" className={styles.searchIcon} width="30" height="30" src="icon-search.svg"></Image>
					</div>
				</div>
				<div className={styles.grid}>
					{/* TODO: show skeleton screen before content is loaded */}
					{coursesDataFiltered?.map(course => (
					(<Link key={course["id"]} href={`syllabus?id=${course["id"]}`} className={styles.gridItem}>
							<h4>{course["Course Number"]}</h4>
							{course["Course Name"]}
					</Link>)
					))}
				</div>
			</main>
		</>
	)
}
