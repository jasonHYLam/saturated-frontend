import styles from "./colorReference.module.css";
import { rgbToHex } from "../../../helpers/helpers";

interface ColorReferenceProps {
  colorData: ColorDataType;
  size: Size;
}

type Size = "small" | "large";
export function ColorReference({ colorData, size }: ColorReferenceProps) {
  const sizeStyle = size === "small" ? styles.small : styles.large;
  // console.log("checking colorData");
  // console.log(colorData);

  const colorDataAsString = rgbToHex(colorData);
  return (
    <div
      style={{ backgroundColor: colorDataAsString }}
      className={`${styles.colorReference} ${sizeStyle}`}
    />
  );
}
