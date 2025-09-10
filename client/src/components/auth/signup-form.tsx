import { useState } from "react";
import {
  Eye,
  EyeClosed,
  LoaderCircle,
  LockIcon,
  Mail,
  UserCircle2Icon,
} from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuthStore } from "@/stores/auth-store";
import { authSchema, type AuthSchema } from "@/schemas/auth_schema";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useNavigate } from "react-router";

const SignUpForm = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { register: registerUser } = useAuthStore();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthSchema>({ resolver: zodResolver(authSchema) });

  const onSubmit = async (data: AuthSchema) => {
    try {
      const ok = await registerUser(data);
      if (ok) navigate("/bookmarks");
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  return (
    <form className="space-y-4 w-full" onSubmit={handleSubmit(onSubmit)}>
      {/* Name */}
      <div className="grid gap-3">
        <Label htmlFor="name" className="text-muted-foreground">
          Name
        </Label>
        <div className="w-full relative">
          <UserCircle2Icon className="size-4 stroke-[1.5] stroke-muted-foreground absolute top-1/2 -translate-y-1/2 left-2" />
          <Input
            className="pl-8"
            autoFocus
            id="name"
            type="text"
            placeholder="Your name"
            required
            maxLength={50}
            {...register("name")}
          />
        </div>
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div className="grid gap-3">
        <Label htmlFor="email" className="text-muted-foreground">
          Email
        </Label>
        <div className="w-full relative">
          <Mail className="size-4 stroke-[1.5] stroke-muted-foreground absolute top-1/2 -translate-y-1/2 left-2" />
          <Input
            className="pl-8"
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
          "Register"
        )}
      </Button>
    </form>
  );
};

export default SignUpForm;
