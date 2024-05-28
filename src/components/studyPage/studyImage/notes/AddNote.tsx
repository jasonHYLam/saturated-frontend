export function AddNote({ setShowAddNote, pixelColorData }) {
  return (
    <>
      <button onClick={() => setShowAddNote(false)}>Close</button>

      <h1>Add note</h1>
      <p>Hide color</p>
      <form action="">
        <input type="text" />
      </form>
    </>
  );
}
