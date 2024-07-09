import { Outlet } from "react-router-dom";
import { useGuest } from "../../helpers/hooks";
import { HomepageLoading } from "../loading/HomepageLoading";

export function HomePage() {
  const { isGuest, loading } = useGuest();
  return (
    <>
      {loading ? (
        <HomepageLoading />
      ) : (
        <>
          <Outlet context={{ isGuest }} />
        </>
      )}
    </>
  );
}
