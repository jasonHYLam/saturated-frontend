import { Outlet } from "react-router-dom";
import { useGuest } from "../../helpers/hooks";

export function HomePage() {
  // const { isGuest, loading } = useGuest();
  return (
    <>
      {/* {loading ? (
        <p>Loading</p>
      ) : (
        <>
          {isGuest && <p>Using guest account</p>}
          <Outlet context={{ isGuest }} />
        </>
      )} */}
      <Outlet />
    </>
  );
}
