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
import { useJitsu } from "@jitsu/react";
import { v4 as uuidv4 } from 'uuid';
import { useQuery } from "react-query";
import { fetchCourses } from '@/fetch-functions';
const inter = Inter({ subsets: ['latin'] })


export default function Home() {
	const {id, track, trackPageView} = useJitsu(); // import methods from useJitsu hook
	useEffect(() => {
		let user_id = localStorage.getItem("user_id")
		if(!user_id){
			localStorage.setItem("user_id", uuidv4())
			user_id = String(localStorage.getItem("user_id"))
		}
    id({id: user_id}); // identify current user for all track events
    trackPageView() // send page_view event
  })
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
			{/* Feedback button */}
			<Script src="https://w.appzi.io/w.js?token=25eG1"/>
			{/* Cloudflare */}
			<script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "b120c77ea1084b8ea1f89d3e1d9b8dfa"}'></script>
			<Head>
				<title>Syllabuddies</title>
				<meta name="description" content="Find a syllabus at the Colorado School of Mines" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				{/* TODO: create a favicon for Syllabuddies */}
				<link rel="icon" href="/favicon.ico" />
			</Head>
			
			<Header coursesData={coursesData}/>
			<main className={styles.main}>
				<BigSearch value={bigSearch} setValue={setBigSearch}/>
				<div className={styles.grid}>
					{/* TODO: show skeleton screen before content is loaded */}
					{coursesDataFiltered?.map(course => (
					(<Link key={`COURSEID${course["id"]}`} href={`syllabus/${course["id"]}`} className={styles.gridItem}>
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