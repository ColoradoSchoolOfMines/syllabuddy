import styles from '../styles/Home.module.scss'
import Image from 'next/image'
export default function LandingAbout({shown}: {shown: boolean}) {
  return (
    <div className={`${styles.landingAbout} ${shown||styles.hideLandingDivs}`}>
      <h2 onClick={()=>{alert("apologies, our about text has not been written yet. it's in progress. thanks!")}}>What is Syllabuddy? &nbsp; <a href="https://docs.google.com/forms/d/e/1FAIpQLScx6kpBzIJWUOSbspixLrMWfeVh6C6xHJFfZ_NvEsxSTo4QKg/viewform">Contribute Syllabi</a></h2>
      <div className={styles.filler}></div>
      <p>Search above or scroll down to explore courses</p>
    </div>
  )
}