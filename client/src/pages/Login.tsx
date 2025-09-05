import { Link } from "react-router";
import logo from "../assets/logo.svg";
import SignInForm from "@/components/auth/signin-form";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

const Login = () => {
  return (
    <section className="flex flex-col gap-4 items-center justify-center h-screen relative p-4">
      <Link to={"/"}>
        <Button
          variant={"outline"}
          size={"sm"}
          className="absolute top-2 left-2 flex items-center "
        >
          <ChevronLeft />
          Back
        </Button>
      </Link>
      <div className="flex flex-col items-center gap-8 max-w-96 w-full">
        <Link
          to={"/"}
          className="size-16 p-2 rounded-2xl bg-neutral-200 dark:bg-neutral-900/40 flex items-center justify-center"
        >
          <img className="size-10" src={logo} alt="logo svg" />
        </Link>

        <div className="text-center gap-4">
          <h1 className="text-2xl">Heey, welcome back!</h1>
          <p className="text-muted-foreground text-sm">
            First time here?{" "}
            <Link to="/signup" className="text-white">
              Sign up here
            </Link>
          </p>
        </div>

        <SignInForm />
      </div>
    </section>
  );
};

export default Login;
