import styles from "./colorReference.module.css";
export function ColorReferenceForNote({ colorAsHex, size }) {
  const sizeStyle = size === "small" ? styles.small : styles.large;
  return (
    <>
      <div
        style={{ backgroundColor: colorAsHex }}
        className={`${styles.colorReference} ${sizeStyle}`}
      />
    </>
  );
}
