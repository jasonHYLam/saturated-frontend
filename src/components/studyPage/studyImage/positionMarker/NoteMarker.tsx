import styles from "./marker.module.css";
import { MARKER_HEIGHT } from "../../../../helpers/constants";
export function NoteMarker({ note, canvasElementDimensions }) {
  const xPosition =
    note.normalisedMousePositionFraction.xFraction *
    canvasElementDimensions.width;
  const yPosition =
    note.normalisedMousePositionFraction.yFraction *
    canvasElementDimensions.height;

  return (
    <>
      <div
        style={{
          top: yPosition + MARKER_HEIGHT / 2 - 5,
          left: xPosition - MARKER_HEIGHT / 2,
        }}
        className={styles.marker}
      ></div>
    </>
  );
}
