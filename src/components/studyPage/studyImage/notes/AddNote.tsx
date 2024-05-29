import { useState } from "react";
import styles from "./addNote.module.css";

export function AddNote({ setShowAddNote, pixelColorData }) {
  const [showColorReference, setShowColorReference] = useState(true);
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
      <form action="">
        <input type="text" />
        <input type="submit" value="Create" />
      </form>
    </>
  );
}
