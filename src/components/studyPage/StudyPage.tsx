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

  function addImageToCanvas(imagePath, context, canvas) {
    const studyImage = new Image();
    studyImage.src = imagePath;
    console.log("check studyImage dimensions");
    console.log(studyImage.naturalWidth);
    canvas.width = studyImage.naturalWidth;
    canvas.height = studyImage.naturalHeight;
    studyImage.onload = () => {
      context.drawImage(studyImage, 0, 0);
    };
  }

  // console.log(position);
  useEffect(() => {
    if (canvasRef.current) {
      const canvasContext = canvasRef.current.getContext("2d");

      addImageToCanvas(test, canvasContext, canvasRef.current);

      // canvasContext?.drawImage();
      // canvasContext?.getImageData();
    }
    setIsLoaded(true);
  }, []);
  return (
    <>
      <main className={styles.page}>
        <p>Studying</p>

        {/* <img className={styles.image} src={test} alt="" /> */}
        {isLoaded ? (
          <>
            <p>canvas</p>
            <canvas
              className={styles.canvas}
              // onPointerMove={(e) => setPosition({ x: e.clientX, y: e.clientY })}
              ref={canvasRef}
            ></canvas>
          </>
        ) : null}
      </main>
    </>
  );
}
