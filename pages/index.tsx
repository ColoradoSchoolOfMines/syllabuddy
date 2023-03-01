import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import Header from '@/components/Header'
import BigSearch from '@/components/BigSearch'
import { isSearchResult } from '@/components/BigSearch'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.scss'
import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'

import { useQuery } from "react-query";
import { fetchCourses } from '@/fetch-functions';
const inter = Inter({ subsets: ['latin'] })


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
				{/* <script async src="https://w.appzi.io/w.js?token=25eG1"/> */}
			</Head>
			
			<Header coursesData={coursesData}/>
			<main className={styles.main}>
				<BigSearch value={bigSearch} setValue={setBigSearch}/>
				<div className={styles.grid}>
					{/* TODO: show skeleton screen before content is loaded */}
					{coursesDataFiltered?.map(course => (
					(<Link key={`COURSEID${course["id"]}`} href={`syllabus?id=${course["id"]}`} className={styles.gridItem}>
							<h4>{course["Course Number"]}</h4>
							{course["Course Name"]}
					</Link>)
					))}
					<Link href={'request'} className={styles.gridItem}>
							<h4>Can't find a course?</h4>
							Request a syllabus!
					</Link>
				</div>
			</main>
		</>
	)
}
