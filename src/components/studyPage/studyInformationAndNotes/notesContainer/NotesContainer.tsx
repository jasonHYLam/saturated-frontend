import styles from "./notesContainer.module.css";
import { Note } from "../notes/note/Note";

interface NotesContainerProps {
  allNotes: Note[];
}
export function NotesContainer({ allNotes }: NotesContainerProps) {
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
