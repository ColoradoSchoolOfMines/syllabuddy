import styles from '../styles/Home.module.scss'
import { useState } from 'react'
import Image from 'next/image'

export default function LandingAbout({shown}: {shown: boolean}) {
  let [showDescription, setShowDescription] = useState(false);

  return (
    <div className={`${styles.landingAbout} ${shown||styles.hideLandingDivs}`}>
      <h2><a onClick={()=>{setShowDescription((oldDescription) => !oldDescription)}}>What is Syllabuddies?</a> <a href="https://docs.google.com/forms/d/e/1FAIpQLScx6kpBzIJWUOSbspixLrMWfeVh6C6xHJFfZ_NvEsxSTo4QKg/viewform">Contribute Syllabi</a></h2>
      <div className={`${styles.landingAboutDesc} ${showDescription?'':styles.hideDiv}`}>
        <p>Syllabuddies is a way to quickly find syllabi for Colorado School of Mines courses so that you can make more informed decisions about which courses to register for.</p>
      </div>
      <div className={styles.filler}></div>
      <p>Search above or scroll down to explore courses</p>
    </div>
  )
}