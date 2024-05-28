import { useRef, useState } from "react";
import test from "../../assets/82620866_p0_master1200.jpg";

import styles from "./studyPage.module.css";

import { StudyImage } from "./studyImage/StudyImage";

export function StudyPage() {
  // const [colorData, setColorData] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [imageDimensions, setImageDimensions] = useState({
    width: 1,
    height: 1,
  });

  // this differs from the canvas dimensions set at the start, which pertain to the imageDimensions
  const [canvasElementDimensions, setCanvasElementDimensions] = useState({
    width: 1,
    height: 1,
  });

  const normalisedPosition = {
    x: (position.x * imageDimensions.width) / canvasElementDimensions.width,
    y: (position.y * imageDimensions.height) / canvasElementDimensions.height,
  };

  const canvasContext = canvasRef.current?.getContext("2d");

  let pixelData;
  let pixelColorData = "";
  if (canvasContext) {
    pixelData = canvasContext?.getImageData(
      normalisedPosition.x,
      normalisedPosition.y,
      1,
      1
    ).data;
    pixelColorData = `rgb(${pixelData[0]} ${pixelData[1]} ${pixelData[2]})`;
  }

  // console.log(position);
  // console.log(imageDimensions);
  // console.log(canvasElementDimensions);
  // console.log(normalisedPosition);
  // console.log(canvasContext);
  // console.log(pixelColorData);
  // console.log("");

  const colorReferenceRef = useRef<HTMLDivElement>(null);

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
            style={{ backgroundColor: pixelColorData }}
          ></div>
        </header>

        <>
          <section className={styles.pageContents}>
            <StudyImage
              setPosition={setPosition}
              setImageDimensions={setImageDimensions}
              setCanvasElementDimensions={setCanvasElementDimensions}
              canvasRef={canvasRef}
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
