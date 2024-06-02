import { useContext, useEffect, useState } from "react";
import styles from "./note.module.css";
import { StudyPageContext } from "../../../StudyPage";
import { ColorReference } from "../../../colorReference/ColorReference";
import {
  rgbToHex,
  pixelColorDataToStringForNote,
} from "../../../../../helpers/helpers";

export function Note({ note }) {
  const {
    hoveredMarkerAndNoteID,
    setHoveredMarkerAndNoteID,
    openedNoteID,
    setOpenedNoteID,
    setAllNotes,
    allNotes,
  } = useContext(StudyPageContext);
  const [noteText, setNoteText] = useState("");
  const [noteStatus, setNoteStatus] = useState("");
  useEffect(() => {
    setNoteText(note.text);
  }, [note.text]);

  // console.log(note.normalisedMousePositionFraction);
  // console.log(activeMarkerAndNoteID);

  const isNoteHovered =
    hoveredMarkerAndNoteID ===
    JSON.stringify(note.normalisedMousePositionFraction);

  const isNoteOpened =
    openedNoteID === JSON.stringify(note.normalisedMousePositionFraction);

  const size = isNoteOpened ? "large" : "small";

  function handleHover() {
    // setIsHovered(true);
    setHoveredMarkerAndNoteID(
      JSON.stringify(note.normalisedMousePositionFraction)
    );
  }
  function handleMouseLeave() {
    // setIsHovered(false);
    setHoveredMarkerAndNoteID("");
  }
  function handleClick() {
    // setIsActive(true);
    setOpenedNoteID(JSON.stringify(note.normalisedMousePositionFraction));
  }

  function editNote() {
    setNoteStatus("edit");
  }

  function submitEdit() {
    // setAllNotes([...allNotes, ])
  }

  function submitDelete() {
    // setAllNotes([...allNotes]);
  }

  function askDelete() {
    setNoteStatus("delete");
  }

  const noteStyle =
    hoveredMarkerAndNoteID ===
    JSON.stringify(note.normalisedMousePositionFraction)
      ? `${styles.note} ${styles.activeNote}`
      : styles.note;

  return (
    <>
      <article
        className={noteStyle}
        onMouseOver={handleHover}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        {isNoteHovered ? (
          noteStatus === "" ? (
            <div className={styles.editDeleteButtons}>
              <button onClick={editNote}>Edit</button>
              <button onClick={askDelete}>Delete</button>
            </div>
          ) : (
            <button>Cancel</button>
          )
        ) : null}
        <ColorReference colorData={note.colorData} size={size} />
        {isNoteOpened ? (
          <>
            <p>{rgbToHex(note.colorData)}</p>
            <p>{pixelColorDataToStringForNote(note.colorData)}</p>
          </>
        ) : null}
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
        ) : noteStatus === "delete" ? (
          <section>
            <p>Sure you want to delete?</p>
            <button>Yes</button>
            <button>No</button>
          </section>
        ) : (
          <p>{note.text}</p>
        )}
      </article>
    </>
  );
}
