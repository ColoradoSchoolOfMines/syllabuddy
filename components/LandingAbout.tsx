import styles from "../styles/Home.module.scss";
import { useState } from "react";
import Image from "next/image";

export default function LandingAbout({ shown }: { shown: boolean }) {
  let [showDescription, setShowDescription] = useState(false);

  return (
    <div
      className={`${styles.landingAbout} ${shown || styles.hideLandingDivs}`}
    >
      <p>
        sorry, syllabuddies is broken... but we are looking for people to fix
        it!
        <br />
        If you are interested in contributing and or learning full stack web
        development to help bring back syllabuddies, join the Mines ACM discord
        and ping @Shane! You can see what the site used to look like at{" "}
        <a href="https://old.syllabuddies.pages.dev">
          old.syllabuddies.pages.dev
        </a>
      </p>
      <h2 className={styles.minesrocks}>
        You can look at detailed historical course data here:
        <a href="https://mines.rocks">mines.rocks</a>
      </h2>
      <h2>
        <br />
        <a
          onClick={() => {
            setShowDescription((old) => !old);
          }}
        >
          What <i>was</i> Syllabuddies?
        </a>
        <a href="https://forms.gle/jLnAd8QcGUKRK97T7">Contribute Syllabi</a>
      </h2>
      <div
        className={`${styles.landingAboutDesc} ${
          showDescription ? "" : styles.hideDiv
        }`}
      >
        <p>
          Syllabuddies is a way to quickly find syllabi from the Colorado School
          of Mines. Our goal is to help students make more informed decisions on
          class selection. The syllabi on our site are contributed by students
          and faculty at Mines.
        </p>
      </div>
      {/* <div className={styles.filler}></div> */}
      {/* <p>Search above or scroll down to explore courses</p> */}
    </div>
  );
}
