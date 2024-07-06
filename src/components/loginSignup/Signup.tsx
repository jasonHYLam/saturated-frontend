import { Link, useNavigate } from "react-router-dom";
import { fetchWithoutQueryOrImage } from "../../helpers/fetchData";
import { SubmitHandler, useForm } from "react-hook-form";
import { GuestLogin } from "./GuestLogin";
import styles from "./login.module.css";
import { useState } from "react";
import { Loading } from "../loading/Loading";

export function Signup() {
  const navigate = useNavigate();
  interface FormInput {
    email: string;
    password: string;
    confirmPassword: string;
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormInput>();

  const [backendError, setBackendError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const submitSignup: SubmitHandler<FormInput> = async (data) => {
    setSubmitting(true);
    const credentials = JSON.stringify({
      email: data.email,
      password: data.password,
    });

    const response = await fetchWithoutQueryOrImage(
      "register",
      "POST",
      credentials
    );
    if (response instanceof Error) {
      navigate("/error");
    } else if (response.status === 400) {
      setBackendError("Email possibly already taken.");
    } else if (!response.ok) {
      navigate("/error");
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <main>
        <section className={styles.container}>
          <h1>Saturated</h1>
          <form onSubmit={handleSubmit(submitSignup)} className={styles.form}>
            <input
              type="text"
              placeholder="Email"
              {...register("email", { required: true })}
            />
            <input
              type="password"
              placeholder="Password (>= 6 chars)"
              {...register("password", { required: true, minLength: 6 })}
            />
            <input
              type="password"
              placeholder="Confirm password"
              {...register("confirmPassword", {
                required: true,
                validate: (val) => {
                  if (getValues("password") !== val) {
                    return "Passwords don't match";
                  }
                },
              })}
            />
            {!submitting ? (
              <input type="submit" value="Sign up" />
            ) : (
              <input type="submit" value="Signing up" disabled />
            )}
            <section className={styles.errors}>
              {backendError && <span>{backendError}</span>}
              {errors.email && <span>Please provide email</span>}
              {errors.password && errors.password.type === "required" && (
                <span>Please provide password</span>
              )}
              {errors.password && errors.password.type === "minLength" && (
                <span>Password must be at least 6 characters long</span>
              )}
              {errors.confirmPassword && (
                <span>{errors.confirmPassword.message}</span>
              )}
            </section>
          </form>
          <Link to={"/login"}>Have an account? Login</Link>
          <GuestLogin />
          {submitting && (
            <>
              <p>Server is hosted on free tier, please be patient!</p>
              <Loading />
            </>
          )}
        </section>
      </main>
    </>
  );
}
