import styles from "./icon.module.css";

type sizeOptions = "small" | "large" | "extraLarge";

interface IconProps {
  iconPath: string;
  size?: sizeOptions;
}

export function Icon({ iconPath, size }: IconProps) {
  let iconStyle = `${styles.small}`;
  if (size === "large") {
    iconStyle = `${styles.large}`;
  } else if (size === "extraLarge") {
    iconStyle = `${styles.extraLarge}`;
  }

  return <img className={iconStyle} src={iconPath} alt="" />;
}
