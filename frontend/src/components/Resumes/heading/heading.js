import React from "react";
import resumeSvg from "../../../assets/images/imagesinPlacement/resumeimage.webp";
import styles from "./heading.module.css";
export default function Heading(){
    return (
        <div className={styles.container}>
          <div className={styles.left}>
            <p className={styles.heading}>
              A <span>Resume</span> that stands out!
            </p>
            <p className={styles.heading}>
              Make your own resume. <span>It's free</span>
            </p>
          </div>
          <div className={styles.right}>
            <img src={resumeSvg} alt="Resume" />
          </div>
        </div>
      );
}