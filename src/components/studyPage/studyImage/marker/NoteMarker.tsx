import styles from "./marker.module.css";
import { MARKER_HEIGHT } from "../../../../helpers/constants";
import { useContext } from "react";
import { StudyPageContext } from "../../StudyPage";

export function NoteMarker({ note }) {
  const {
    activeMarkerAndNoteID,
    setActiveMarkerAndNoteID,
    canvasElementDimensions,
  } = useContext(StudyPageContext);

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

  function handleHover() {
    setActiveMarkerAndNoteID(
      JSON.stringify(note.normalisedMousePositionFraction)
    );
  }

  function handleMouseLeave() {
    setActiveMarkerAndNoteID("");
  }

  return (
    <>
      <div
        style={{
          top: yPosition + MARKER_HEIGHT / 2 - 5,
          left: xPosition - MARKER_HEIGHT / 2,
        }}
        className={noteMarkerStyle}
        onMouseOver={handleHover}
        onMouseLeave={handleMouseLeave}
      ></div>
    </>
  );
}
