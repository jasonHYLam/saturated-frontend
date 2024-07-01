import styles from "./colorReference.module.css";

interface ColorReferenceForNoteProps {
  colorAsHex: string;
  size: "small" | "large";
}
export function ColorReferenceForNote({
  colorAsHex,
  size,
}: ColorReferenceForNoteProps) {
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
