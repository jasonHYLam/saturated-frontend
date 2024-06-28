import { useEffect } from "react";
import styles from "./studyImage.module.css";

import { PositionMarker } from "./marker/PositionMarker";
import { NoteMarker } from "./marker/NoteMarker";
import { useAddImageToCanvas, useScreenResize } from "../../../helpers/hooks";

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
  useAddImageToCanvas({
    canvasRef: canvasRef,
    imageLink: imageLink,
    setImageDimensions: setImageDimensions,
    setCanvasElementDimensions: setCanvasElementDimensions,
  });

  const colorModeStyle = colorMode === "color" ? `` : styles.grayscale;

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const newX = e.clientX - rect.left;
    const newY = e.clientY - rect.top;
    setPosition({ x: newX, y: newY });
  }

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
