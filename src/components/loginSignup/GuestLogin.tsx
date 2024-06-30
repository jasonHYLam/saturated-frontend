import { useNavigate } from "react-router-dom";
import { fetchWithQuery } from "../../helpers/fetchData";

export function GuestLogin() {
  const navigate = useNavigate();

  async function submitGuestLogin() {
    const cookieQuery = {
      useCookies: "true",
      useSessionCookies: "true",
    };

    const guestCredentials = JSON.stringify({
      email: import.meta.env.VITE_GUEST_EMAIL,
      password: import.meta.env.VITE_GUEST_PASSWORD,
    });
    const response = await fetchWithQuery(
      "login",
      "POST",
      guestCredentials,
      cookieQuery
    );

    if (!response.ok || response instanceof Error) {
      navigate("/error");
    }

    navigate("/");
  }
  return (
    <>
      <button onClick={submitGuestLogin}>Try guest account!</button>
    </>
  );
}
