import Head from 'next/head'
import styles from '@/styles/Syllabus.module.scss'
import Link from 'next/link'
import Script from 'next/script'
import { GetStaticPaths, GetStaticProps } from 'next';
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { useQuery } from "react-query";
import { fetchCourses } from '@/fetch-functions';
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useJitsu } from "@jitsu/react";
import { v4 as uuidv4 } from 'uuid';

function parseSyllabusURL(url: string) {
	return url.replace("/view?usp=share_link", "").replace("open?id=","file/d/") + "/preview"
}
function createDownloadLink(url: string) {
	return parseSyllabusURL(url).replace("/preview", "").replace("/file/d/", "/uc?export=download&id=")
}
export default function Syllabus() {
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

	const router = useRouter();
	const { syllabus_id } = router.query;
	// const query = router.query;
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
	const courseData = coursesData?.find((course: any) => course["id"] == syllabus_id)
	// really need to figure out this typescript stuff
	const courseHeader = courseData ? <div>
			<h1>{courseData["Course Number"]}</h1>
			<p>{courseData["Course Name"]}: &nbsp;</p>
			<p className={styles.date}>{courseData["Semester"]||""} {courseData["Year"]||""}</p>
		</div> : "Loading...";
	const downloadLink = courseData ? createDownloadLink(courseData["Syllabus Upload"]) : ""
	const downloadButton = <button type="button" onClick={() => window.location.href = downloadLink}>Download PDF</button>
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
		<main className={styles.main}>
			<div className={styles.classInfo}>
				{courseHeader}
				{downloadButton}
			</div>
			<p>Information from past syllabi may not reflect current course content and structure</p>
			<iframe className="pdf-embed" 
			src={syllabusLink} //https://drive.google.com/file/d/1c_JTe3SY54vS0pgivz8HA5zyIAFLcdw1/preview
			width="100%" height="1000px" allow="autoplay">
			</iframe>
		</main>
		<Footer />
	</>
}

export const getStaticPaths: GetStaticPaths = async () => {
	// Get all posts via API, file, etc.
	const posts = [{syllabus_id: 0}];
	for( let i = 1; i < 1000; i++) {
		posts.push({syllabus_id: i});
	}
	const paths = posts.map(post => ({
			params: { syllabus_id: String(post.syllabus_id) },
	}));
	return { paths, fallback: false };
};
export async function getStaticProps() {
  return {
    props: {}, // will be passed to the page component as props
  }
}
