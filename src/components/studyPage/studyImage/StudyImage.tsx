import styles from "./studyImage.module.css";

import { PositionMarker } from "./marker/PositionMarker";
import { NoteMarker } from "./marker/NoteMarker";
import { useAddImageToCanvas } from "../../../helpers/hooks";
import { useContext } from "react";

export function StudyImage({
  imageLink,
  setCanvasElementDimensions,
  canvasRef,
  showAddNote,
  handleClick,
  allNotes,
  colorMode,
  setPositionOnImage,
  isMobile,
}) {
  useAddImageToCanvas({
    canvasRef: canvasRef,
    imageLink: imageLink,
    setCanvasElementDimensions: setCanvasElementDimensions,
  });

  const colorModeStyle = colorMode === "color" ? `` : styles.grayscale;

  return (
    <>
      <section className={styles.canvasContainer}>
        <p>canvas</p>
        <canvas
          className={`${styles.canvas} ${colorModeStyle}`}
          onPointerMove={(e) => {
            setPositionOnImage(e);
          }}
          onClick={(e) => handleClick(isMobile, e)}
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
