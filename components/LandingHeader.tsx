import styles from '../styles/Home.module.scss'
import Image from 'next/image'
export default function LandingHeader({shown}: {shown: boolean}) {
  return (
    <div className={`${styles.landingHeader} ${shown||styles.hideLandingDivs}`}>
      <h1><Image alt="" className={styles.logo} width="40" height="40" src="syllabuddies_logo.svg"></Image> See beyond the course description</h1>
    </div>
  )
}