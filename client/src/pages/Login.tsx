import { SignIn } from "@clerk/clerk-react";
import { Link } from "react-router";
import logo from "../assets/logo.svg";
const Login = () => {
  return (
    <section className="flex flex-col gap-4 items-center justify-center h-screen">
      <Link
        to={"/"}
        className="size-16 p-2 rounded-2xl bg-neutral-900 dark:bg-neutral-100"
      >
        <img src={logo} alt="logo svg" />
      </Link>
      <SignIn withSignUp={true} />
    </section>
  );
};

export default Login;
