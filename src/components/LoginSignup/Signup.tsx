import { Link } from "react-router-dom";
import { fetchData } from "../../helpers/fetchData";
import { useForm } from "react-hook-form";

export function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();
  async function submitSignup() {
    await fetchData();
  }
  return (
    <>
      <form onSubmit={handleSubmit(submitSignup)}>
        <input
          type="text"
          placeholder="Username"
          {...register("username", { required: true })}
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
        {errors.username && <span>Please provide username</span>}
        {errors.password && <span>Please provide password</span>}
        {errors.confirmPassword && (
          <span>{errors.confirmPassword.message}</span>
        )}
      </form>
      <Link to={"/login"}>Have an account? Login</Link>
    </>
  );
}
