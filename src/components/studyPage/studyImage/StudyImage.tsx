import { useEffect } from "react";
import styles from "./studyImage.module.css";
import testImage from "../../../assets/82620866_p0_master1200.jpg";

import { PositionMarker } from "./positionMarker/PositionMarker";

export function StudyImage({
  setPosition,
  setImageDimensions,
  setCanvasElementDimensions,
  canvasRef,
  normalisedPosition,
  setClickedPosition,
  clickedPosition,
  showAddNote,
  setShowAddNote,
}) {
  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const newX = e.clientX - rect.left;
    const newY = e.clientY - rect.top;
    setPosition({ x: newX, y: newY });
  }

  function handleClick() {
    setClickedPosition(normalisedPosition);
    setShowAddNote(true);
  }

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
    if (canvasRef) {
      const canvas = canvasRef.current;
      if (canvas) {
        const canvasContext = canvas.getContext("2d");
        addImageToCanvas(testImage, canvasContext, canvas);

        setCanvasElementDimensions({
          width: canvas.clientWidth,
          height: canvas.clientHeight,
        });

        setImageDimensions({
          width: canvas.width,
          height: canvas.height,
        });
      }
    }
  }, []);

  return (
    <>
      <section className={styles.canvasContainer}>
        <p>canvas</p>
        <canvas
          className={styles.canvas}
          onPointerMove={(e) => {
            handleMouseMove(e);
          }}
          onClick={handleClick}
          ref={canvasRef}
        ></canvas>

        {showAddNote ? <PositionMarker position={clickedPosition} /> : null}
      </section>
    </>
  );
}
