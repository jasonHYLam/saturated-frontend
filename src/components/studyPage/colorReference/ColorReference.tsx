import styles from "./colorReference.module.css";
import { rgbToHex } from "../../../helpers/helpers";

interface ColorReferenceProps {
  colorData: ColorDataType;
}

export function ColorReference({ colorData }: ColorReferenceProps) {
  const colorDataAsString = rgbToHex(colorData);
  return (
    <div
      style={{ backgroundColor: colorDataAsString }}
      className={styles.colorReference}
    />
  );
}
