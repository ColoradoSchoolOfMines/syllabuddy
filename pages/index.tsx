import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
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
import LandingHeader from '@/components/LandingHeader'
import LandingAbout from '@/components/LandingAbout'
import AdvancedSettings from '@/components/AdvancedSettings'

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
	const [searchParams, setSearParams] = useState<Array<any>>([
		{ param : "Course Name", 		enabled: true  },
		{ param : "Course Number", 	enabled: true  },
		{ param : "Professor",			enabled: false }	]);
	const [sortParams, setSortParams] = useState<Array<any>>([
		{ param : "Year", 					inverted: true  },
		{ param : "Course Number", 	inverted: false  }]);
	// console.log(sortParams)
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
	// Only show relevant sorting options
	const sortFilterValues = (coursesData ? Object.keys(coursesData[0]).slice(3).sort() : []).concat("None");
	const coursesDataFiltered = coursesData?.filter((course: any) => isSearchResult(course, bigSearch, searchParams));
	// TODO: make sorting modular
	coursesDataFiltered?.sort((a: any, b: any) => {
		for (let i = 0; i < sortParams.length; i++) {
			const param = sortParams[i].param;
			const invertMultiplier = sortParams[i].inverted ? -1 : 1;
			if(param == "None") continue
			if (a[param] > b[param]) return 1 * invertMultiplier
			if (a[param] < b[param]) return -1 * invertMultiplier;
		}
		return 0;
		// const strA = a["Course Number"].toLowerCase();
		// const strB = b["Course Number"].toLowerCase();
		// if(a["Year"] < b["Year"]) return 1;
		// if(a["Year"] > b["Year"]) return -1;
		// if (strA > strB) return 1;
		// if (strA < strB) return -1;
	});

	let showLanding = (bigSearch === '');

	return (
		<>
			{/* Feedback button */}
			{/* <Script src="https://w.appzi.io/w.js?token=25eG1"/> */}
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
				<LandingHeader shown={showLanding}/>


				{/* <div className={styles.searchPanel}>
					<BigSearch value={bigSearch} setValue={setBigSearch}/>
					{<AdvancedSettings {...{sortFilterValues, sortParams, setSortParams}} />}
				</div> */}
				<LandingAbout shown={showLanding}/>
			</main>
			<Footer />
		</>
	)
}
