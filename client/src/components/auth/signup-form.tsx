import { useState } from "react";
import { Eye, EyeClosed, LoaderCircle } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuthStore } from "@/stores/auth-store";
import { authSchema, type AuthSchema } from "@/schemas/auth_schema";

const SignUpForm = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { register: registerUser } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthSchema>({ resolver: zodResolver(authSchema) });

  const onSubmit = async (data: AuthSchema) => {
    try {
      await registerUser(data);
    } catch (error) {
      console.error("Error en el login:", error);
    }
  };
  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-neutral-700"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          className="w-full mt-1 px-3 py-2 border rounded-lg shadow-sm focus:outline-0 focus:outline-amber-500 focus:border-amber-500 border-neutral-300 transition-colors ease-in-out duration-300"
          placeholder="e@example.com"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-neutral-700"
        >
          Password
        </label>
        <div className="relative">
          <input
            type={isVisible ? "text" : "password"}
            id="password"
            className="w-full mt-1 px-3 py-2 border rounded-lg shadow-sm focus:outline-0 focus:outline-amber-500 focus:border-amber-500 border-neutral-300 transition-colors ease-in-out duration-300"
            {...register("password")}
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
        className="w-full px-4 py-2 text-white bg-amber-500 rounded-lg hover:bg-amber-400 transition hover:cursor-pointer"
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

export default SignUpForm;
