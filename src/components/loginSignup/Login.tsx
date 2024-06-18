import { Link } from "react-router-dom";
import { fetchData } from "../../helpers/fetchData";
import { useForm } from "react-hook-form";

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function submitLogin(data) {
    const credentials = JSON.stringify(data);
    await fetchData("login", "POST", credentials);
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
          {...register("email", { required: true })}
        />
        <input type="submit" value="Login" />
        {errors.email && <span>Please provide email</span>}
        {errors.password && <span>Please provide password</span>}
      </form>
      <Link to={"/signup"}>Don't have an account? Sign up</Link>
    </>
  );
}
