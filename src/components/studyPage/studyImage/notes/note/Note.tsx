import { useContext, useEffect, useState } from "react";
import styles from "./note.module.css";
import { StudyPageContext } from "../../../StudyPage";
// import { ColorReference } from "../../../colorReference/ColorReference";
// import {
//   rgbToHex,
//   pixelColorDataToStringForNote,
// } from "../../../../../helpers/helpers";
import { ColorReferenceForNote } from "../../../colorReference/ColorReferenceForNote";
import { fetchWithoutQueryOrImage } from "../../../../../helpers/fetchData";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

// note contains
// text
// originalHexColor
// guessed color if guessed
// position

// will need to convert hex to rgb

export function Note({ note }) {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const {
    hoveredMarkerAndNoteID,
    setHoveredMarkerAndNoteID,
    openedNoteID,
    setOpenedNoteID,
    setAllNotes,
    allNotes,
  } = useContext(StudyPageContext);
  // const [noteText, setNoteText] = useState("");
  const [noteStatus, setNoteStatus] = useState("");

  // why do I have this here? Seems like a code smell.
  // useEffect(() => {
  //   setNoteText(note.text);
  // }, [note.text]);

  // console.log(activeMarkerAndNoteID);

  const isNoteHovered = hoveredMarkerAndNoteID === note.id;

  const isNoteOpened = openedNoteID === note.id;

  const size = isNoteOpened ? "large" : "small";

  function handleHover() {
    // setIsHovered(true);
    setHoveredMarkerAndNoteID(note.id);
  }
  function handleMouseLeave() {
    // setIsHovered(false);
    setHoveredMarkerAndNoteID("");
  }
  function handleClick() {
    // setIsActive(true);
    setOpenedNoteID(note.id);
  }

  function editNote() {
    setNoteStatus("edit");
  }

  async function submitEdit(data) {
    console.log("checking data");
    console.log(data);
    const dataToSubmit = JSON.stringify(data);
    const response = await fetchWithoutQueryOrImage(
      `Note/${note.id}`,
      "PUT",
      dataToSubmit
    );

    if (!response.ok || response instanceof Error) {
      navigate("/error");
    }

    const updatedNote = await response.json();

    // allNotes.map()
    const updatedNoteId = allNotes.findIndex(
      (note) => note.id === updatedNote.id
    );
    const updatedNotes = allNotes.with(updatedNoteId, updatedNote);
    console.log("checking updatedNotes");
    console.log(updatedNotes);
    setAllNotes(updatedNotes);
  }

  function submitDelete() {
    // await fetchWithoutQueryOrImage(`Note/${note.id}`, "DELETE");
    // setAllNotes([...allNotes]);
  }

  function askDelete() {
    setNoteStatus("delete");
  }

  function cancelChanges() {
    setNoteStatus("");
  }

  const noteStyle =
    hoveredMarkerAndNoteID === note.id
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
            <button onClick={cancelChanges}>Cancel</button>
          )
        ) : null}
        <ColorReferenceForNote colorAsHex={note.originalHexColor} size={size} />
        {/* <ColorReference colorData={note.colorData} size={size} /> */}
        {isNoteOpened ? (
          <>
            {/* <p>{rgbToHex(note.colorData)}</p>
            <p>{pixelColorDataToStringForNote(note.colorData)}</p> */}
            <p>{note.originalHexColor}</p>
          </>
        ) : null}
        {noteStatus === "edit" ? (
          <>
            <form onSubmit={handleSubmit(submitEdit)}>
              <input
                type="text"
                {...register("text")}
                // value={noteText}
                // onChange={(e) => {
                //   console.log(e.target.value);
                //   setNoteText(e.target.value);
                // }}
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
