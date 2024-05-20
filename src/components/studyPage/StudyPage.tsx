import { useEffect, useRef, useState } from "react";
import test from "../../assets/82620866_p0_master1200.jpg";
import { StudyImage } from "./studyImage/StudyImage";

import styles from "./studyPage.module.css";

interface canvasContext {}
export function StudyPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const canvasRef = useRef<HTMLCanvasElement>(null);

  function getColor(context) {
    context.getImageData();
  }

  function addImageToCanvas(imagePath, context) {
    const studyImage = new Image();
    studyImage.src = imagePath;
    studyImage.onload = () => {
      context.drawImage(studyImage, 0, 0);
    };
  }

  console.log(position);
  // useEffect(() => {

  // }[])
  useEffect(() => {
    if (canvasRef.current) {
      const canvasContext = canvasRef.current.getContext("2d");

      addImageToCanvas(test, canvasContext);

      // canvasContext?.drawImage();
      // canvasContext?.getImageData();
    }
    setIsLoaded(true);
  }, []);
  return (
    <>
      <p>Studying</p>

      {/* <img className={styles.image} src={test} alt="" /> */}
      {isLoaded ? (
        <>
          <p>canvas</p>
          <canvas
            className={styles.image}
            // onPointerMove={(e) => setPosition({ x: e.clientX, y: e.clientY })}
            ref={canvasRef}
          ></canvas>
        </>
      ) : null}
    </>
  );
}
