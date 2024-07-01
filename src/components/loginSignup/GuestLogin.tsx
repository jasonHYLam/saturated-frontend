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

    if (response instanceof Error) {
      return navigate("/error");
    } else if (!response.ok) {
      navigate("/error");
    } else {
      navigate("/");
    }
  }
  return (
    <>
      <button onClick={submitGuestLogin}>Try guest account!</button>
    </>
  );
}
