import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate, useLocation } from "react-router-dom";
import { showErrorToastMsg } from "../utility/ToastMessage";
import { loginAPI } from "../services/api/authService";

const schema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof schema>;

export function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || "/dashboard";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await loginAPI(data);
      console.log(3333333);
      console.log(res);
      // setAuth(result.user, result.accessToken);

      navigate(from, { replace: true });
    } catch (err: any) {
      const msg = err.response?.data?.message || "Invalid email or password";
      showErrorToastMsg(msg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md">
        <div className="card bg-gray-100 p-10">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-primary-900">Login</h1>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="label">Email Address</label>
              <input
                {...register("email")}
                type="email"
                placeholder="you@company.com"
                className="appearance-none block w-full p-3 border-2 border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-primary-500 transition duration-300 shadow-sm"
                autoComplete="email"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="label">Password</label>
              <input
                {...register("password")}
                type="password"
                className="appearance-none block w-full p-3 border-2 border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-primary-500 transition duration-300 shadow-sm"
                placeholder="••••••••"
                autoComplete="current-password"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-400 hover:bg-blue-500 p-4 w-full mt-2 rounded-lg cursor  text-white"
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
