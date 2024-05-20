import { useEffect, useRef, useState } from "react";
import test from "../../assets/82620866_p0_master1200.jpg";

import styles from "./studyPage.module.css";

interface canvasContext {}
export function StudyPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [colorData, setColorData] = useState({ r: 0, g: 0, b: 0 });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const colorReferenceRef = useRef<HTMLDivElement>(null);

  function getColor(context) {
    const imageData = context.getImageData(position.x, position.y, 1, 1).data;

    setColorData({
      r: imageData[0],
      g: imageData[1],
      b: imageData[2],
    });

    colorReferenceRef.current.style.backgroundColor = `rgb(${colorData.r}, ${colorData.g}, ${colorData.b})`;
  }

  function addImageToCanvas(imagePath, context, canvas) {
    const studyImage = new Image();
    studyImage.src = imagePath;
    studyImage.onload = () => {
      canvas.width = studyImage.naturalWidth;
      canvas.height = studyImage.naturalHeight;
      context.drawImage(studyImage, 0, 0);
    };
  }

  useEffect(() => {
    // console.log("checking useEffect");
    if (canvasRef.current) {
      // console.log("checking canvas");
      // console.log("checking imagePath");
      // console.log(test);

      const canvasContext = canvasRef.current.getContext("2d");

      addImageToCanvas(test, canvasContext, canvasRef.current);

      // canvasContext?.getImageData();
    }
    setIsLoaded(true);
  }, []);
  return (
    <>
      <main className={styles.page}>
        <header>
          <p>Studying</p>
          <p>
            x: {position.x}, y: {position.y}
          </p>
          <p>
            r: {colorData.r} g: {colorData.g} b: {colorData.b}{" "}
          </p>

          <div ref={colorReferenceRef} className={styles.colorReference}></div>
        </header>

        <>
          <section className={styles.canvasContainer}>
            <p>canvas</p>
            <canvas
              className={styles.canvas}
              onPointerMove={(e) => {
                setPosition({ x: e.clientX, y: e.clientY });
                getColor(canvasRef.current?.getContext("2d"));
              }}
              ref={canvasRef}
            ></canvas>
          </section>
        </>
      </main>
    </>
  );
}
