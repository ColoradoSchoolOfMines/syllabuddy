import styles from '../styles/Home.module.scss'
import Image from 'next/image'
export default function LandingHeader({shown}: {shown: boolean}) {
  return (
    <div className={`${styles.landingHeader} ${shown||styles.hideLandingDivs}`}>
      <h1>🦑 See beyond the course description</h1>
    </div>
  )
}