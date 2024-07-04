import { Link, useNavigate } from "react-router-dom";
import { fetchWithQuery } from "../../helpers/fetchData";
import { SubmitHandler, useForm } from "react-hook-form";
import { GuestLogin } from "./GuestLogin";
import styles from "./login.module.css";

export function Login() {
  interface FormInput {
    email: string;
    password: string;
  }

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();

  const submitLogin: SubmitHandler<FormInput> = async (data) => {
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

    if (loginResponse instanceof Error) {
      return navigate("/error");
    } else if (!loginResponse.ok) {
      return navigate("/error");
    } else {
      return navigate("/");
    }
  };

  return (
    <>
      <section className={styles.container}>
        <form onSubmit={handleSubmit(submitLogin)} className={styles.form}>
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
      </section>
    </>
  );
}
