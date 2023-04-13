import styles from '../styles/Home.module.scss'
import { useState } from 'react'
import Image from 'next/image'

export default function LandingAbout({shown}: {shown: boolean}) {
  let [showDescription, setShowDescription] = useState(false);

  return (
    <div className={`${styles.landingAbout} ${shown||styles.hideLandingDivs}`}>
      <h2>
        <a onClick={()=>{setShowDescription(old => !old)}}
          >
          What is Syllabuddies?
        </a>
        <a href="https://docs.google.com/forms/d/e/1FAIpQLScx6kpBzIJWUOSbspixLrMWfeVh6C6xHJFfZ_NvEsxSTo4QKg/viewform">
            Contribute Syllabi
        </a>
      </h2>
      <div className={`${styles.landingAboutDesc} ${showDescription?'':styles.hideDiv}`}>
        <p>
          Syllabuddies is a way to quickly find syllabi from the Colorado School of Mines. Our goal is to help students make more informed decisions on class selection. The syllabi on our site are contributed by students and faculty at Mines.
        </p>
      </div>
      <div className={styles.filler}></div>
      <p>Search above or scroll down to explore courses</p>
    </div>
  )
}