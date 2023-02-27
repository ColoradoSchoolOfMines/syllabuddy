// a nextjs page for the syllabus display

import Head from 'next/head'
import styles from '@/styles/Home.module.scss'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';

//this uses public anonymous key that we don't care about, don't commit private keys to git :)
const supabase = createClient('https://nyaajzmracvaceszghcb.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im55YWFqem1yYWN2YWNlc3pnaGNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzY0MzAzODYsImV4cCI6MTk5MjAwNjM4Nn0.dSZxXpK_TKy_G-DMabaMmJ_tUbpsxIiuHAWmMKiNZno')
function parseSyllabusURL(url: string) {
	return url.replace("/view?usp=share_link", "").replace("open?id=","file/d/") + "/preview"
}

export default function Syllabus() {
	const router = useRouter();
	const { name, location } = router.query;
	const query = router.query;
	const [courseData, setCourseData] = useState<Object | undefined>(undefined)
  
	useEffect(() =>  {
    async function getCourse() {
      const response = await supabase.from('syllabase').select().eq('id', query.id).single();
      // set course data to the response data and use typecasting to make typescript happy
      setCourseData(response.data as Object)
    }
    getCourse();
  },[query.id])

	// really need to figure out this typescript stuff
	const courseHeader = courseData ? `${courseData["Course Number"]}\n${courseData["Course Name"]}` : "Loading...";

	const syllabusLink = courseData ? parseSyllabusURL(courseData["Syllabus Upload"]) : ""
	console.log(syllabusLink)
	return <>
		<Head>
			<title>Syllabuddies</title>
			<meta name="description" content="Find a syllabus at the Colorado School of Mines" />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			{/* TODO: create a favicon for Syllabuddies */}
			<link rel="icon" href="/favicon.ico" />
		</Head>
		<header className={styles.header}>
			<nav>
				<h1><Link href="/">Syllabuddies</Link></h1>
				<input className='searchbar' type="text" placeholder="Search.."/>
			</nav>
		</header>
		<main>
			<h1>{courseHeader}</h1>
			<iframe className="pdf-embed" 
			src={syllabusLink} //https://drive.google.com/file/d/1c_JTe3SY54vS0pgivz8HA5zyIAFLcdw1/preview
			width="100%" height="1000px" allow="autoplay">
			</iframe>
		</main>
	</>
}