import { useContext, useState } from "react";
import styles from "./note.module.css";
import { StudyPageContext } from "../../../StudyPage";
import { ColorReference } from "../../../colorReference/ColorReference";

export function Note({ note }) {
  const { activeMarkerAndNoteID, setActiveMarkerAndNoteID } =
    useContext(StudyPageContext);
  const [isActive, setIsActive] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // console.log(note.normalisedMousePositionFraction);
  // console.log(activeMarkerAndNoteID);

  function handleHover() {
    setIsHovered(true);
    setActiveMarkerAndNoteID(
      JSON.stringify(note.normalisedMousePositionFraction)
    );
  }
  function handleMouseLeave() {
    setIsHovered(false);
    setActiveMarkerAndNoteID("");
  }
  function handleClick() {
    setIsActive(true);
  }

  const noteStyle =
    activeMarkerAndNoteID ===
    JSON.stringify(note.normalisedMousePositionFraction)
      ? `${styles.note} ${styles.activeNote}`
      : styles.note;

  return (
    <>
      <article
        className={noteStyle}
        onMouseOver={handleHover}
        onMouseLeave={handleMouseLeave}
      >
        {isHovered ? (
          <div className={styles.editDeleteButtons}>
            <button>Edit</button>
            <button>Delete</button>
          </div>
        ) : null}
        <ColorReference colorData={note.color} size="small" />
        <p>{note.text}</p>
      </article>
    </>
  );
}
