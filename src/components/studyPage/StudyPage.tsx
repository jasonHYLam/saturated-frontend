import { useEffect, useRef, useState } from "react";
import test from "../../assets/82620866_p0_master1200.jpg";

import styles from "./studyPage.module.css";

export function StudyPage() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });

  // this differs from the canvas dimensions set at the start, which pertain to the imageDimensions
  const [canvasElementDimensions, setCanvasElementDimensions] = useState({
    width: 0,
    height: 0,
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const colorReferenceRef = useRef<HTMLDivElement>(null);

  function testClick(e, context) {}

  function addImageToCanvas(imagePath, context, canvas) {
    const studyImage = new Image();
    studyImage.src = imagePath;
    studyImage.onload = () => {
      setImageDimensions({
        width: studyImage.naturalWidth,
        height: studyImage.naturalHeight,
      });
      canvas.width = studyImage.naturalWidth;
      canvas.height = studyImage.naturalHeight;
      setCanvasElementDimensions({
        width: canvas.clientWidth,
        height: canvas.clientHeight,
      });
      context.drawImage(studyImage, 0, 0);
    };
  }

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const newX = e.clientX - rect.left;
    const newY = e.clientY - rect.top;
    setPosition({ x: newX, y: newY });
  }

  useEffect(() => {
    function handleScreenResize(canvas) {
      setCanvasElementDimensions({
        width: canvas.clientWidth,
        height: canvas.clientHeight,
      });
    }

    window.addEventListener("resize", () =>
      handleScreenResize(canvasRef.current)
    );

    return () => {
      window.removeEventListener("resize", () =>
        handleScreenResize(canvasRef.current)
      );
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const canvasContext = canvas.getContext("2d");
      addImageToCanvas(test, canvasContext, canvas);

      setCanvasElementDimensions({
        width: canvas.clientWidth,
        height: canvas.clientHeight,
      });

      setImageDimensions({
        width: canvas.width,
        height: canvas.height,
      });
    }
  }, []);

  useEffect(() => {
    function getColor(context) {
      const normalisedX =
        (position.x * imageDimensions.width) / canvasElementDimensions.width;
      const normalisedY =
        (position.y * imageDimensions.height) / canvasElementDimensions.height;

      // console.log(`mouse y:${position.y}`);
      // console.log(`img h:${imageDimensions.height}`);
      // console.log(`canvas h:${canvasElementDimensions.height}`);
      // console.log(`normalised y: ${normalisedY}`);
      // console.log(" ");

      const pixelData = context.getImageData(
        normalisedX,
        normalisedY,
        1,
        1
      ).data;
      colorReferenceRef.current.style.backgroundColor = `rgb(${pixelData[0]} ${pixelData[1]} ${pixelData[2]})`;
    }

    if (canvasElementDimensions.width !== 0)
      getColor(canvasRef.current?.getContext("2d"));
  }, [
    position,
    canvasElementDimensions.width,
    canvasElementDimensions.height,
    imageDimensions.width,
    imageDimensions.height,
  ]);

  return (
    <>
      <main className={styles.page}>
        <header className={styles.header}>
          <p>Studying</p>
          <p>
            x: {position.x}, y: {position.y}
          </p>
          <p></p>

          <div ref={colorReferenceRef} className={styles.colorReference}></div>
        </header>

        <>
          <section className={styles.pageContents}>
            <section className={styles.canvasContainer}>
              <p>canvas</p>
              <canvas
                className={styles.canvas}
                onPointerMove={(e) => {
                  handleMouseMove(e);
                }}
                onClick={() => {}}
                ref={canvasRef}
              ></canvas>
            </section>
            <section>
              <div></div>
              <h1>Notes</h1>
              {/* <textarea name="" id="" cols="30" rows="10"></textarea> */}
            </section>
          </section>
        </>
      </main>
    </>
  );
}
