import Head from 'next/head'
import styles from '@/styles/Home.module.scss'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { useQuery } from "react-query";
import { fetchCourses } from '@/fetch-functions';
import Header from '@/components/Header'

export default function Request() {
	const router = useRouter();
	const { name, location } = router.query;
	const query = router.query;
	// const { isLoading, error, data: coursesData } = useQuery(
  //   {
  //     queryKey: "courseData", 
  //     queryFn: () => fetchCourses(),
  //     refetchOnWindowFocus: false, 
  //     staleTime: 1000 * 60 * 60 * 3, 
  //     cacheTime: 1000 * 60 * 60 * 3  
  //     //it will only refetch if the page is open for 3 hours
  //   }
	// )
	return <>
		<Head>
			<title>Syllabuddies</title>
			<meta name="description" content="Find a syllabus at the Colorado School of Mines" />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			{/* TODO: create a favicon for Syllabuddies */}
			<link rel="icon" href="/favicon.ico" />
		</Head>
		<Header/>
		<main>
			<h1>Sorry we don&apos;t have the course you are looking for</h1>
			<p>Fill out this form to request the class</p>
		</main>
	</>
}