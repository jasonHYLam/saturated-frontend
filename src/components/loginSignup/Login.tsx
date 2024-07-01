import { Link, useNavigate } from "react-router-dom";
import { fetchWithQuery } from "../../helpers/fetchData";
import { useForm } from "react-hook-form";
import { GuestLogin } from "./GuestLogin";

export function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function submitLogin(data) {
    const cookieQuery = {
      useCookies: "true",
      useSessionCookies: "true",
    };
    const credentials = JSON.stringify(data);
    const loginResponse = await fetchWithQuery(
      "login",
      "POST",
      credentials,
      cookieQuery
    );

    if (!loginResponse.ok || loginResponse instanceof Error) {
      navigate("/error");
    }

    navigate("/");
  }

  return (
    <>
      <form onSubmit={handleSubmit(submitLogin)}>
        <input
          type="text"
          placeholder="Email"
          {...register("email", { required: true })}
        />
        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: true })}
        />
        <input type="submit" value="Login" />
        {errors.email && <span>Please provide email</span>}
        {errors.password && <span>Please provide password</span>}
      </form>
      <Link to={"/signup"}>Don't have an account? Sign up</Link>
      <GuestLogin />
    </>
  );
}
