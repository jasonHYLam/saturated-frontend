import { useContext, useState } from "react";
import styles from "./note.module.css";
import { StudyPageContext } from "../../../StudyPage";
import { ColorReferenceForNote } from "../../../colorReference/ColorReferenceForNote";
import { fetchWithoutQueryOrImage } from "../../../../../helpers/fetchData";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface NoteProps {
  note: Note;
}
export function Note({ note }: NoteProps) {
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
    setHoveredMarkerAndNoteID(null);
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

        {isNoteOpened ? (
          <>
            <section className={styles.colorInformationContainer}>
              <article>
                <p>Actual</p>
                <ColorReferenceForNote
                  colorAsHex={note.originalHexColor}
                  size={size}
                />
                <p>{note.originalHexColor}</p>
              </article>
              <article>
                <p>Guessed</p>
                <ColorReferenceForNote
                  colorAsHex={note.guessedHexColor}
                  size={size}
                />
                <p>{note.guessedHexColor}</p>
              </article>
            </section>
          </>
        ) : (
          <ColorReferenceForNote
            colorAsHex={note.originalHexColor}
            size={size}
          />
        )}
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
