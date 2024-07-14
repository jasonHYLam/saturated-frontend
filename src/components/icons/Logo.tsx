import { Icon } from "./Icon";
import LogoPath from "../../assets/SaturatedLogo.png";

type sizeOptions = "large" | "extraLarge";

interface LogoProps {
  size?: sizeOptions;
}

export function Logo({ size }: LogoProps) {
  if (!size || size === "large") {
    return <Icon iconPath={LogoPath} size="large" />;
  } else if (size === "extraLarge") {
    return <Icon iconPath={LogoPath} size="extraLarge" />;
  }
}
