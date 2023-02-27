import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.scss'
import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'

import { useQuery } from "react-query";
//this uses public anonymous key that we don't care about, don't commit private keys to git :)
const supabase = createClient('https://nyaajzmracvaceszghcb.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im55YWFqem1yYWN2YWNlc3pnaGNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzY0MzAzODYsImV4cCI6MTk5MjAwNjM4Nn0.dSZxXpK_TKy_G-DMabaMmJ_tUbpsxIiuHAWmMKiNZno')

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  // TODO: typescript types from the supabase database... 
  async function fetchCourses() {
    const response = await supabase.from('syllabase').select()
    return response.data as Array<any>
  }
  const { isLoading, error, data: coursesData } = useQuery(
    "courseData",
    () => fetchCourses(),
  );
  return (
    <>
      <Head>
        <title>Syllabuddies</title>
        <meta name="description" content="Find a syllabus at the Colorado School of Mines" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* TODO: create a favicon for Syllabuddies */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <header className={styles.header}>
        <nav>
          <h1>Syllabuddies</h1>
          <input className='searchbar' type="text" placeholder="Search.."/>
        </nav>
      </header>
      <main className={styles.main}>
        {/* TODO: add and format search bar here */}
        <div className={styles.grid}>
          {/* TODO: show skeleton screen before content is loaded */}
          {coursesData?.map(course => (
          <Link href={`syllabus?id=${course["id"]}`} className={styles.gridItem}>
              <h4>{course["Course Number"]}</h4>
              {course["Course Name"]}
          </Link>
          ))}
        </div>
      </main>
    </>
  )
}
