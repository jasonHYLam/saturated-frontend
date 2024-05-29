import styles from "./colorReference.module.css";
export function ColorReference({ colorData, size }) {
  const sizeStyle = size === "small" ? styles.small : styles.large;
  return (
    <div
      style={{ backgroundColor: colorData }}
      className={`${styles.colorReference} ${sizeStyle}`}
    />
  );
}
