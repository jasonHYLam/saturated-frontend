// import test from "../../assets/82620866_p0_master1200.jpg";
import { useRef } from "react";
import test from "../../assets/82620866_p0_master1200.jpg";

import styles from "./studyPage.module.css";
const canvasRef = useRef(null);
export function StudyPage() {
  return (
    <>
      <p>Studying</p>
      <img className={styles.image} src={test} alt="" />
      <canvas ref={canvasRef}></canvas>
    </>
  );
}
