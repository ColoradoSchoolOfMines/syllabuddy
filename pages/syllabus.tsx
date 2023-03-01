import Head from 'next/head'
import styles from '@/styles/Home.module.scss'
import Link from 'next/link'
import Script from 'next/script'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { useQuery } from "react-query";
import { fetchCourses } from '@/fetch-functions';
import Header from '@/components/Header'

function parseSyllabusURL(url: string) {
	return url.replace("/view?usp=share_link", "").replace("open?id=","file/d/") + "/preview"
}

export default function Syllabus() {
	const router = useRouter();
	const { name, location } = router.query;
	const query = router.query;
	const { isLoading, error, data: coursesData } = useQuery(
    {
      queryKey: "courseData", 
      queryFn: () => fetchCourses(),
      refetchOnWindowFocus: false, 
      staleTime: 1000 * 60 * 60 * 3, 
      cacheTime: 1000 * 60 * 60 * 3  
      //it will only refetch if the page is open for 3 hours
    }
	)
	const courseData = coursesData?.find((course: any) => course["id"] == query.id)
	// really need to figure out this typescript stuff
	const courseHeader = courseData ? `${courseData["Course Number"]}\n${courseData["Course Name"]}` : "Loading...";
	const syllabusLink = courseData ? parseSyllabusURL(courseData["Syllabus Upload"]) : ""
	
	return <>
		<Script src="https://w.appzi.io/w.js?token=25eG1"/>
		<Head>
			<title>Syllabuddies</title>
			<meta name="description" content="Find a syllabus at the Colorado School of Mines" />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			{/* TODO: create a favicon for Syllabuddies */}
			<link rel="icon" href="/favicon.ico" />
		</Head>
		<Header coursesData={coursesData}/>
		<main>
			<h1>{courseHeader}</h1>
			<iframe className="pdf-embed" 
			src={syllabusLink} //https://drive.google.com/file/d/1c_JTe3SY54vS0pgivz8HA5zyIAFLcdw1/preview
			width="100%" height="1000px" allow="autoplay">
			</iframe>
		</main>
	</>
}