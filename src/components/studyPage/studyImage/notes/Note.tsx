import { useContext, useState } from "react";
import styles from "./note.module.css";
import { StudyPageContext } from "../../StudyPage";
export function Note({ note }) {
  const { activeMarkerAndNoteID, setActiveMarkerAndNoteID } =
    useContext(StudyPageContext);
  const [isActive, setIsActive] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // console.log(note.normalisedMousePositionFraction);
  function handleHover() {
    setIsHovered(true);
    setActiveMarkerAndNoteID(
      JSON.stringify(note.normalisedMousePositionFraction)
    );
  }
  function handleMouseLeave() {
    setIsHovered(false);
  }
  function handleClick() {
    setIsActive(true);
  }
  return (
    <>
      <article
        className={styles.note}
        onMouseOver={handleHover}
        onMouseLeave={handleMouseLeave}
      >
        {isHovered ? (
          <div className={styles.editDeleteButtons}>
            <button>Edit</button>
            <button>Delete</button>
          </div>
        ) : null}
        <div
          style={{ backgroundColor: note.color }}
          className={styles.colorReference}
        />
        <p>{note.text}</p>
      </article>
    </>
  );
}
