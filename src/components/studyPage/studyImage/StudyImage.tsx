import styles from "./studyImage.module.css";

import { PositionMarker } from "./marker/PositionMarker";
import { NoteMarker } from "./marker/NoteMarker";
import { useAddImageToCanvas } from "../../../helpers/hooks";

export function StudyImage({
  imageLink,
  // setImageDimensions,
  setCanvasElementDimensions,
  canvasRef,
  showAddNote,
  handleClick,
  allNotes,
  colorMode,
  handleMouseMove,
}) {
  useAddImageToCanvas({
    canvasRef: canvasRef,
    imageLink: imageLink,
    // setImageDimensions: setImageDimensions,
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
