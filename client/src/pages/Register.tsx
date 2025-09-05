import { Link } from "react-router";
import logo from "../assets/logo.svg";
import SignUpForm from "@/components/auth/signup-form";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

const Register = () => {
  return (
    <section className="flex flex-col gap-4 items-center justify-center h-screen p-4 relative">
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
          <h1 className="text-2xl">Heey, welcome to bkmarky!</h1>
          <p className="text-muted-foreground text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-white">
              Sign in here
            </Link>
          </p>
        </div>

        <SignUpForm />
      </div>
    </section>
  );
};

export default Register;
