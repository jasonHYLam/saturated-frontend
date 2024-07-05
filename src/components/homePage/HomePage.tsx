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
          {isGuest && <p>Using guest account</p>}
          <Outlet context={{ isGuest }} />
        </>
      )}
    </>
  );
}
