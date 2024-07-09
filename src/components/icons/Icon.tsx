import styles from "./icon.module.css";

interface IconProps {
  iconPath: string;
  size?: string;
}

export function Icon({ iconPath, size }: IconProps) {
  let iconStyle = `${styles.small}`;
  if (size === "large") iconStyle = `${styles.large}`;

  return <img className={iconStyle} src={iconPath} alt="" />;
}
