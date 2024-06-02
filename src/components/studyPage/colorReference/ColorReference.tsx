import styles from "./colorReference.module.css";
import { pixelColorDataToStringForCSS } from "../../../helpers/helpers";

export function ColorReference({ colorData, size }) {
  const sizeStyle = size === "small" ? styles.small : styles.large;
  const colorDataAsString = pixelColorDataToStringForCSS(colorData);
  return (
    <div
      style={{ backgroundColor: colorDataAsString }}
      className={`${styles.colorReference} ${sizeStyle}`}
    />
  );
}
