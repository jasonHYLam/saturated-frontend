import styles from "./marker.module.css";
import {
  MARKER_HEIGHT,
  ACTIVE_MARKER_HEIGHT,
} from "../../../../helpers/constants";
import { useContext } from "react";
import { StudyPageContext } from "../../StudyPage";

interface NoteMarkerProps {
  note: Note;
}
export function NoteMarker({ note }: NoteMarkerProps) {
  const {
    hoveredMarkerAndNoteID,
    setHoveredMarkerAndNoteID,
    openedNoteID,
    setOpenedNoteID,
    canvasElementDimensions,
  } = useContext(StudyPageContext);

  const xPosition = note.xOrdinateAsFraction * canvasElementDimensions.width;
  const yPosition = note.yOrdinateAsFraction * canvasElementDimensions.height;

  const isNoteHovered = hoveredMarkerAndNoteID === note.id;

  const isNoteOpened = openedNoteID === note.id;

  const noteMarkerStyle =
    isNoteHovered || isNoteOpened
      ? `${styles.noteMarker} ${styles.activeMarker}`
      : styles.noteMarker;

  function handleHover() {
    setHoveredMarkerAndNoteID(note.id);
  }

  function handleMouseLeave() {
    setHoveredMarkerAndNoteID(null);
  }

  function handleClick() {
    setOpenedNoteID(note.id);
  }

  const markerSize =
    hoveredMarkerAndNoteID === note.id ? ACTIVE_MARKER_HEIGHT : MARKER_HEIGHT;

  return (
    <>
      <div
        style={{
          top: yPosition - markerSize / 2,
          left: xPosition - markerSize / 2,
        }}
        className={noteMarkerStyle}
        onMouseOver={handleHover}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      ></div>
    </>
  );
}
