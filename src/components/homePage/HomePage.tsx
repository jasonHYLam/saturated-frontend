import { Outlet } from "react-router-dom";
import { useGuest } from "../../helpers/hooks";

export function HomePage() {
  const { isGuest, loading } = useGuest();
  return (
    <>
      {loading ? (
        <p>Loading</p>
      ) : (
        <>
          <p>Home page</p>
          <Outlet context={{ isGuest }} />
        </>
      )}
    </>
  );
}
