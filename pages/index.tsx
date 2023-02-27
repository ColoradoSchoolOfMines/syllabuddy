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

function isSearchResult(course: any, rawSearch: string, searchParams: any = {"searchName": true, "searchNumber": true, "searchProf": false}) {
  const [courseName, courseNumber, search] = [
    course["Course Name"].toLowerCase(),
    course["Course Number"].toLowerCase(),
    rawSearch.toLowerCase()
  ]
  if(search == "") return true;
  if(searchParams["searchName"] && courseName.includes(search)) return true;
  if(searchParams["searchNumber"] && courseNumber.replace(" ", "").includes(search)) return true;
  return false;
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
  console.log(bigSearch)
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
          <input
            value={bigSearch}
            onChange={e => setBigSearch(e.target.value)}
          />
        </div>
        <div className={styles.grid}>
          {/* TODO: show skeleton screen before content is loaded */}
          {coursesData?.map(course => (
            isSearchResult(course, bigSearch) ?
          (<Link href={`syllabus?id=${course["id"]}`} className={styles.gridItem}>
              <h4>{course["Course Number"]}</h4>
              {course["Course Name"]}
          </Link>) : ""
          ))}
        </div>
      </main>
    </>
  )
}
