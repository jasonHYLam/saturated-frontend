import { Link } from "react-router-dom";
import { fetchWithoutQueryOrImage } from "../../helpers/fetchData";
import { useForm } from "react-hook-form";
import { GuestLogin } from "./GuestLogin";

export function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  async function submitSignup(data) {
    const credentials = JSON.stringify({
      email: data.email,
      password: data.password,
    });

    await fetchWithoutQueryOrImage("register", "POST", credentials);
  }

  return (
    <>
      <form onSubmit={handleSubmit(submitSignup)}>
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
        {errors.password && <span>Please provide password</span>}
        {errors.confirmPassword && (
          <span>{errors.confirmPassword.message}</span>
        )}
      </form>
      <Link to={"/login"}>Have an account? Login</Link>
      <GuestLogin />
    </>
  );
}
