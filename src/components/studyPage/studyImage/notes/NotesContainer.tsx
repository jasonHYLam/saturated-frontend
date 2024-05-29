import { Note } from "./Note";
export function NotesContainer({ allNotes }) {
  return (
    <>
      <section>
        {allNotes.map((note) => (
          <Note note={note} />
        ))}
      </section>
    </>
  );
}
