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
  const [noteStatus, setNoteStatus] = useState("");

  const isNoteHovered = hoveredMarkerAndNoteID === note.id;

  const isNoteOpened = openedNoteID === note.id;

  const size = isNoteOpened ? "large" : "small";

  function handleHover() {
    setHoveredMarkerAndNoteID(note.id);
  }
  function handleMouseLeave() {
    setHoveredMarkerAndNoteID("");
  }
  function handleClick() {
    setOpenedNoteID(note.id);
  }

  function editNote() {
    setNoteStatus("edit");
  }

  async function submitEdit(data) {
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

    const updatedNoteId = allNotes.findIndex(
      (note) => note.id === updatedNote.id
    );
    const updatedNotes = allNotes.with(updatedNoteId, updatedNote);
    setAllNotes(updatedNotes);
    setNoteStatus("");
  }

  async function submitDelete() {
    const response = await fetchWithoutQueryOrImage(
      `Note/${note.id}`,
      "DELETE"
    );

    if (!response.ok || response instanceof Error) {
      navigate("/error");
    }

    const deletedNoteId = allNotes.findIndex(
      (studyNote) => studyNote.id === note.id
    );
    const updatedNotes = allNotes.splice(deletedNoteId, 1);
    setAllNotes(updatedNotes);
    setNoteStatus("");
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
              <input type="text" {...register("text")} />
              <input type="submit" />
            </form>
          </>
        ) : noteStatus === "delete" ? (
          <section>
            <p>Sure you want to delete?</p>
            <button onClick={submitDelete}>Yes</button>
            <button onClick={cancelChanges}>No</button>
          </section>
        ) : (
          <p>{note.text}</p>
        )}
      </article>
    </>
  );
}
