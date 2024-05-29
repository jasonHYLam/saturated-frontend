import styles from "./notesContainer.module.css";
import { Note } from "../notes/note/Note";

export function NotesContainer({ allNotes }) {
  return (
    <>
      <section className={styles.notesContainer}>
        {allNotes.map((note) => (
          <Note note={note} />
        ))}
      </section>
    </>
  );
}
