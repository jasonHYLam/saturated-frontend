import styles from "./marker.module.css";
import { MARKER_HEIGHT } from "../../../../helpers/constants";
import { useContext } from "react";
import { StudyPageContext } from "../../StudyPage";

export function NoteMarker({ note }) {
  const {
    hoveredMarkerAndNoteID,
    setHoveredMarkerAndNoteID,
    setOpenedNoteID,
    canvasElementDimensions,
  } = useContext(StudyPageContext);

  const xPosition =
    note.normalisedMousePositionFraction.xFraction *
    canvasElementDimensions.width;
  const yPosition =
    note.normalisedMousePositionFraction.yFraction *
    canvasElementDimensions.height;

  const noteMarkerStyle =
    hoveredMarkerAndNoteID ===
    JSON.stringify(note.normalisedMousePositionFraction)
      ? `${styles.noteMarker} ${styles.activeMarker}`
      : styles.noteMarker;

  function handleHover() {
    setHoveredMarkerAndNoteID(
      JSON.stringify(note.normalisedMousePositionFraction)
    );
  }

  function handleMouseLeave() {
    setHoveredMarkerAndNoteID("");
  }

  function handleClick() {
    setOpenedNoteID(JSON.stringify(note.normalisedMousePositionFraction));
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
        onClick={handleClick}
      ></div>
    </>
  );
}
