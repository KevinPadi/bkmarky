import { useState } from "react";
import { Eye, EyeClosed, LoaderCircle, LockIcon, Mail } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuthStore } from "@/stores/auth-store";
import { loginSchema, type LoginSchema } from "@/schemas/login_schema";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useNavigate } from "react-router";

const SignInForm = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginSchema) => {
    try {
      const ok = await login(data);
      if (ok) navigate("/bookmarks");
    } catch (error) {
      console.error("Error en el login:", error);
    }
  };
  return (
    <form className="space-y-4 w-full" onSubmit={handleSubmit(onSubmit)}>
      {/* Email */}
      <div className="grid gap-3">
        <Label htmlFor="email" className="text-muted-foreground">
          Email
        </Label>
        <div className="w-full relative">
          <Mail className="size-4 stroke-[1.5] stroke-muted-foreground absolute top-1/2 -translate-y-1/2 left-2" />
          <Input
            className="pl-8"
            autoFocus
            id="email"
            type="email"
            placeholder="mail@example.com"
            required
            {...register("email")}
          />
        </div>
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>
      {/* Password */}
      <div className="grid gap-3">
        <Label htmlFor="password" className="text-muted-foreground">
          Password
        </Label>
        <div className="w-full relative">
          <LockIcon className="size-4 stroke-[1.5] stroke-muted-foreground absolute top-1/2 -translate-y-1/2 left-2" />
          <Input
            className="pl-8"
            id="password"
            type={isVisible ? "text" : "password"}
            placeholder="•••••••••••"
            required
            {...register("password")}
          />
          <Button
            type="button"
            variant={"ghost"}
            className="absolute top-1/2 -translate-y-1/2 right-1 size-7"
            onClick={() => setIsVisible(!isVisible)}
          >
            {isVisible ? (
              <Eye strokeWidth={1.5} />
            ) : (
              <EyeClosed strokeWidth={1.5} />
            )}
          </Button>
        </div>
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      {/* Submit */}
      <Button
        type="submit"
        variant={"default"}
        className="w-full rounded-lg active:scale-95"
      >
        {isSubmitting ? (
          <LoaderCircle className="animate-spin mx-auto" />
        ) : (
          "Log in"
        )}
      </Button>
    </form>
  );
};

export default SignInForm;
