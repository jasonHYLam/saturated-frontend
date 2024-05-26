import { useEffect, useRef, useState } from "react";
import test from "../../assets/82620866_p0_master1200.jpg";

import styles from "./studyPage.module.css";

import { StudyImage } from "./studyImage/StudyImage";

export function StudyPage() {
  const [colorData, setColorData] = useState("");

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const colorReferenceRef = useRef<HTMLDivElement>(null);

  function testClick(e, context) {}

  return (
    <>
      <main className={styles.page}>
        <header className={styles.header}>
          <p>Studying</p>
          <p>{/* x: {position.x}, y: {position.y} */}</p>
          <p></p>

          <div
            ref={colorReferenceRef}
            className={styles.colorReference}
            style={{ backgroundColor: colorData }}
          ></div>
        </header>

        <>
          <section className={styles.pageContents}>
            <StudyImage
              colorReference={colorReferenceRef.current}
              setColorData={setColorData}
            />
            <section>
              <h1>Notes</h1>
              <section></section>
              <div></div>
              {/* <textarea name="" id="" cols="30" rows="10"></textarea> */}
            </section>
          </section>
        </>
      </main>
    </>
  );
}
