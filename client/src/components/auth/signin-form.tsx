import { useState } from "react";
import { Eye, EyeClosed, LoaderCircle } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuthStore } from "@/stores/auth-store";
import { loginSchema, type LoginSchema } from "@/schemas/login_schema";

const SignInForm = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { login } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginSchema) => {
    try {
      await login(data);
    } catch (error) {
      console.error("Error en el login:", error);
    }
  };
  return (
    <form className="space-y-4 w-full" onSubmit={handleSubmit(onSubmit)}>
      {/* Email */}
      <div>
        <input
          type="email"
          id="email"
          className="w-full mt-1 px-3 py-2 border rounded-lg shadow-sm focus:outline-0 focus:outline-white/80 focus:border-white/80 border-neutral-white/15 transition-colors ease-in-out duration-300 text-sm"
          placeholder="Your email"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <div className="relative">
          <input
            type={isVisible ? "text" : "password"}
            id="password"
            className="w-full mt-1 px-3 py-2 border rounded-lg shadow-sm focus:outline-0 focus:outline-white/80 focus:border-white/80 border-neutral-white/15 transition-colors ease-in-out duration-300 text-sm"
            {...register("password")}
            placeholder="You password"
          />
          <button
            type="button"
            onClick={() => setIsVisible(!isVisible)}
            className="absolute inset-y-0 end-1 top-2 size-fit p-1 rounded-lg hover:bg-neutral-100 hover:cursor-pointer text-neutral-500"
          >
            {isVisible ? (
              <Eye strokeWidth={1.5} />
            ) : (
              <EyeClosed strokeWidth={1.5} />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full px-4 py-2 text-black bg-neutral-200 rounded-lg hover:bg-neutral-300 transition hover:cursor-pointer font-medium active:scale-95"
      >
        {isSubmitting ? (
          <LoaderCircle className="animate-spin mx-auto" />
        ) : (
          "Sign in"
        )}
      </button>
    </form>
  );
};

export default SignInForm;
