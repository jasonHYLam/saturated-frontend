import { Link, useNavigate } from "react-router-dom";
import { postDataOnFetch } from "../../helpers/fetchData";
import { useForm } from "react-hook-form";

export function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function submitLogin(data) {
    console.log(data);
    const credentials = JSON.stringify(data);
    const loginResponse = await postDataOnFetch(
      "login",
      "POST",
      credentials,
      false
    );
    console.log("checking loginResponse");
    console.log(loginResponse);
    if (loginResponse.ok) {
      navigate("/");
    }
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
    </>
  );
}
