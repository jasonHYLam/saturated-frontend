import { useEffect } from "react";
import styles from "./studyImage.module.css";

import { PositionMarker } from "./marker/PositionMarker";
import { NoteMarker } from "./marker/NoteMarker";
import { useScreenResize } from "../../../helpers/hooks";

export function StudyImage({
  imageLink,
  setPosition,
  setImageDimensions,
  setCanvasElementDimensions,
  canvasRef,
  showAddNote,
  handleClick,
  allNotes,
  colorMode,
}) {
  useScreenResize(canvasRef, setCanvasElementDimensions);

  const colorModeStyle = colorMode === "color" ? `` : styles.grayscale;

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const newX = e.clientX - rect.left;
    const newY = e.clientY - rect.top;
    setPosition({ x: newX, y: newY });
  }

  // ImageDimensions refer to the image in the canvas; these should never change.
  // CanvasElementDimensions refer to the canvas HTML element.
  // Canvas.width and canvas.height refer to the image height and width, which should never change.
  function addImageToCanvas(imagePath, context, canvas) {
    const studyImage = new Image();
    studyImage.crossOrigin = "Anonymous";
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
    if (canvasRef) {
      const canvas = canvasRef.current;
      if (canvas) {
        console.log("checking that this add image to canvas is not called");
        const canvasContext = canvas.getContext("2d");
        addImageToCanvas(imageLink, canvasContext, canvas);

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
          className={`${styles.canvas} ${colorModeStyle}`}
          onPointerMove={(e) => {
            handleMouseMove(e);
          }}
          onClick={handleClick}
          ref={canvasRef}
        ></canvas>

        {showAddNote ? <PositionMarker /> : null}

        {allNotes.map((note) => (
          <NoteMarker note={note} />
        ))}
      </section>
    </>
  );
}
