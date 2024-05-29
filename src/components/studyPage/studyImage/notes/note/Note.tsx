import { useContext, useEffect, useState } from "react";
import styles from "./note.module.css";
import { StudyPageContext } from "../../../StudyPage";
import { ColorReference } from "../../../colorReference/ColorReference";

export function Note({ note }) {
  const { activeMarkerAndNoteID, setActiveMarkerAndNoteID } =
    useContext(StudyPageContext);
  const [noteText, setNoteText] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [noteStatus, setNoteStatus] = useState("");
  useEffect(() => {
    setNoteText(note.text);
  }, [note.text]);

  // console.log(note.normalisedMousePositionFraction);
  // console.log(activeMarkerAndNoteID);
  let size = "small";
  if (
    activeMarkerAndNoteID ===
    JSON.stringify(note.normalisedMousePositionFraction)
  ) {
    size = "large";
  }

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

  function editNote() {
    setNoteStatus("edit");
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
            <button onClick={editNote}>Edit</button>
            <button>Delete</button>
          </div>
        ) : null}
        <ColorReference colorData={note.color} size={size} />
        {noteStatus === "edit" ? (
          <>
            <form action="">
              <input
                type="text"
                value={noteText}
                onChange={(e) => {
                  console.log(e.target.value);
                  setNoteText(e.target.value);
                }}
              />
              <input type="submit" />
            </form>
          </>
        ) : (
          <p>{note.text}</p>
        )}
      </article>
    </>
  );
}
