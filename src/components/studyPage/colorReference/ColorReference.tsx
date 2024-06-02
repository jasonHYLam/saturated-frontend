import styles from "./colorReference.module.css";
import { pixelColorDataToString } from "../../../helpers/helpers";

export function ColorReference({ colorData, size }) {
  const sizeStyle = size === "small" ? styles.small : styles.large;

  const colorDataAsString = pixelColorDataToString(colorData);

  return (
    <div
      style={{ backgroundColor: colorData }}
      className={`${styles.colorReference} ${sizeStyle}`}
    />
  );
}
