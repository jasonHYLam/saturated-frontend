import { Icon } from "../icons/Icon";
import { Loading } from "./Loading";
import SaturatedLogoPath from "../../assets/SaturatedLogo.png";

export function HomepageLoading() {
  return (
    <>
      <Icon iconPath={SaturatedLogoPath} />
      <Loading />
      <p>Server is hosted on free tier, please be patient!</p>
    </>
  );
}
