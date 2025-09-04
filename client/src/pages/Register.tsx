import { Link } from "react-router";
import logo from "../assets/logo.svg";
import SignUpForm from "@/components/auth/signup-form";

const Register = () => {
  return (
    <section className="flex flex-col gap-4 items-center justify-center h-screen">
      <Link
        to={"/"}
        className="size-16 p-2 rounded-2xl bg-neutral-200 dark:bg-neutral-900/40 flex items-center justify-center"
      >
        <img className="size-12" src={logo} alt="logo svg" />
      </Link>
      <SignUpForm />
    </section>
  );
};

export default Register;
