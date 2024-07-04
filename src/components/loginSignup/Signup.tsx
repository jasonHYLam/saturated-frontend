import { Link } from "react-router-dom";
import { fetchWithoutQueryOrImage } from "../../helpers/fetchData";
import { SubmitHandler, useForm } from "react-hook-form";
import { GuestLogin } from "./GuestLogin";
import styles from "./login.module.css";

export function Signup() {
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

  const submitSignup: SubmitHandler<FormInput> = async (data) => {
    const credentials = JSON.stringify({
      email: data.email,
      password: data.password,
    });

    await fetchWithoutQueryOrImage("register", "POST", credentials);
  };

  return (
    <>
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
            placeholder="Password (must be at least 6 characters long)"
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
          <input type="submit" value="Sign up" />
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
        </form>
        <Link to={"/login"}>Have an account? Login</Link>
        <GuestLogin />
      </section>
    </>
  );
}
