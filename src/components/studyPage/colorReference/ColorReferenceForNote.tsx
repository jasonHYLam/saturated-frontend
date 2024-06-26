import styles from "./colorReference.module.css";
export function ColorReferenceForNote({ colorAsHex }) {
  return (
    <>
      <div
        style={{ backgroundColor: colorAsHex }}
        className={`${styles.colorReference} ${sizeStyle}`}
      />
    </>
  );
}
