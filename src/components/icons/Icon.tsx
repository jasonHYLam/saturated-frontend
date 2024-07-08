import styles from "./icon.module.css";

interface IconProps {
  iconPath: string;
}

export function Icon({ iconPath }: IconProps) {
  return <img className={styles.icon} src={iconPath} alt="" />;
}
