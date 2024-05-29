import { useState } from "react";
import styles from "./note.module.css";
export function Note({ note }) {
  const [isActive, setIsActive] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  function handleHover() {
    setIsHovered(true);
  }
  function handleClick() {
    setIsActive(true);
  }
  return (
    <>
      <article
        className={styles.note}
        onMouseOver={handleHover}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isHovered ? (
          <div className={styles.editDeleteButtons}>
            <button>Edit</button>
            <button>Delete</button>
          </div>
        ) : null}
        <div
          style={{ backgroundColor: note.color }}
          className={styles.colorReference}
        />
        <p>{note.text}</p>
      </article>
    </>
  );
}
