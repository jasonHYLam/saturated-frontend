import { Link } from "react-router-dom";
export function Signup() {
  return (
    <>
      <form action="">
        <input type="text" placeholder="Username" />
        <input type="text" placeholder="Password" />
        <input type="submit" value="Sign up" />
      </form>
      <Link to={"/login"}>Have an account? Login</Link>
    </>
  );
}
