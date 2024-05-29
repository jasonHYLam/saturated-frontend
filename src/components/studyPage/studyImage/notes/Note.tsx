import styles from "./note.module.css";
export function Note({ note }) {
  return (
    <>
      <article>
        <div
          style={{ backgroundColor: note.color }}
          className={styles.colorReference}
        />
        <p>{note.text}</p>
      </article>
    </>
  );
}
