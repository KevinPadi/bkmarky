import { Link } from "react-router";
import logo from "../assets/logo.svg";
import SignInForm from "@/components/auth/signin-form";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

const Login = () => {
  return (
    <section className="flex flex-col gap-4 items-center justify-center h-screen relative p-4">
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_35%_at_50%_20%,#000_0%,transparent_110%)]"></div>

      <Link to={"/"}>
        <Button
          variant={"outline"}
          size={"sm"}
          className="absolute top-2 left-2 md:left-20 flex items-center "
        >
          <ChevronLeft />
          Back
        </Button>
      </Link>
      <div className="flex flex-col items-center gap-8 max-w-96 w-full relative">
        <Link
          to={"/"}
          className="size-14 p-2 rounded-2xl bg-neutral-200 dark:bg-neutral-900 flex items-center justify-center"
        >
          <img className="size-10" src={logo} alt="logo svg" />
        </Link>

        <div className="text-center gap-4">
          <h1 className="text-2xl text-balance">Heey, welcome back!</h1>
          <p className="text-muted-foreground text-sm text-balance">
            First time here?{" "}
            <Link
              to="/signup"
              className="text-accent-foreground hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>

        <SignInForm />
      </div>
    </section>
  );
};

export default Login;
