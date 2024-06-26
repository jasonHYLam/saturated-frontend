import styles from "./marker.module.css";
import { MARKER_HEIGHT } from "../../../../helpers/constants";
import { useContext } from "react";
import { StudyPageContext } from "../../StudyPage";

interface NoteMarkerProps {
  note: Note;
}
export function NoteMarker({ note }: NoteMarkerProps) {
  const {
    hoveredMarkerAndNoteID,
    setHoveredMarkerAndNoteID,
    setOpenedNoteID,
    canvasElementDimensions,
  } = useContext(StudyPageContext);

  const xPosition = note.xOrdinateAsFraction * canvasElementDimensions.width;
  const yPosition = note.yOrdinateAsFraction * canvasElementDimensions.height;

  const noteMarkerStyle =
    hoveredMarkerAndNoteID === note.id
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

  return (
    <>
      <div
        style={{
          top: yPosition - MARKER_HEIGHT / 2,
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
