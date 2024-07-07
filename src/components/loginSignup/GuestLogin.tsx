import { useNavigate } from "react-router-dom";
import { fetchWithQuery } from "../../helpers/fetchData";

interface GuestLoginProps {
  setSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
}
export function GuestLogin({ setSubmitting }: GuestLoginProps) {
  const navigate = useNavigate();

  async function submitGuestLogin() {
    setSubmitting(true);
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
