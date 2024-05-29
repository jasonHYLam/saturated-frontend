import styles from "./marker.module.css";
import { MARKER_HEIGHT } from "../../../../helpers/constants";
import { useContext } from "react";
import { StudyPageContext } from "../../StudyPage";

export function NoteMarker({ note }) {
  const { activeMarkerAndNoteID, canvasElementDimensions } =
    useContext(StudyPageContext);

  const xPosition =
    note.normalisedMousePositionFraction.xFraction *
    canvasElementDimensions.width;
  const yPosition =
    note.normalisedMousePositionFraction.yFraction *
    canvasElementDimensions.height;

  const noteMarkerStyle =
    activeMarkerAndNoteID ===
    JSON.stringify(note.normalisedMousePositionFraction)
      ? `${styles.marker} ${styles.activeMarker}`
      : styles.marker;

  return (
    <>
      <div
        style={{
          top: yPosition + MARKER_HEIGHT / 2 - 5,
          left: xPosition - MARKER_HEIGHT / 2,
        }}
        className={noteMarkerStyle}
      ></div>
    </>
  );
}
