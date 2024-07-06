import { Outlet } from "react-router-dom";
import { useGuest } from "../../helpers/hooks";
import { Loading } from "../loading/Loading";

export function HomePage() {
  const { isGuest, loading } = useGuest();
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Outlet context={{ isGuest }} />
        </>
      )}
    </>
  );
}
