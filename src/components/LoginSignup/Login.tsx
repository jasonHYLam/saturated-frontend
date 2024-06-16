import { Link } from "react-router-dom";
export function Login() {
  return (
    <>
      <form action="">
        <input type="text" placeholder="Username" />
        <input type="text" placeholder="Password" />
        <input type="submit" value="Login" />
      </form>
      <Link to={"/signup"}>Don't have an account? Sign up</Link>
    </>
  );
}
