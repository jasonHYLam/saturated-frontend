import { useState } from "react";
import styles from "./addNote.module.css";
import { useForm } from "react-hook-form";

export function AddNote({
  setShowAddNote,
  pixelColorData,
  setAllNotes,
  allNotes,
  clickedPositionFraction,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm();
  const [showColorReference, setShowColorReference] = useState(true);

  function uploadNote(data) {
    const newNote = {
      text: data.text,
      color: pixelColorData,
      normalisedMousePositionFraction: clickedPositionFraction,
    };
    // fetchData
    if (allNotes) {
      setAllNotes([...allNotes, newNote]);
    } else {
      setAllNotes([newNote]);
    }
    setShowAddNote(false);
  }
  return (
    <>
      <button onClick={() => setShowAddNote(false)}>Close</button>
      {showColorReference ? (
        <div
          style={{ background: pixelColorData }}
          className={styles.colorReference}
        ></div>
      ) : null}

      <h1>Add note</h1>
      {showColorReference ? (
        <button onClick={() => setShowColorReference(false)}>Hide color</button>
      ) : (
        <button onClick={() => setShowColorReference(true)}>Show color</button>
      )}
      <form action="" onSubmit={handleSubmit(uploadNote)}>
        <input type="text" {...register("text")} placeholder="Add a note" />
        <input type="submit" value="Create" />
      </form>
    </>
  );
}
