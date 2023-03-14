import styles from '../styles/Home.module.scss'
import Link from 'next/link'
import Image from 'next/image'
export default function LandingHeader({shown}: {shown: boolean}) {
  return shown ? (
    <div className={`${styles.landingHeader} ${shown?'':styles.hideLandingHeader}`}>
      <h1>🦑 Syllabi for everyone, by everyone</h1>
    </div>
  ) : <></>
}