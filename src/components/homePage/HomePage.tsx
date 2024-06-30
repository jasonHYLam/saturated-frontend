import { Outlet } from "react-router-dom";
import { useGuest } from "../../helpers/hooks";

export function HomePage() {
  const { isGuest } = useGuest();
  return (
    <>
      {}
      <p>Home page</p>
      <Outlet />
    </>
  );
}
