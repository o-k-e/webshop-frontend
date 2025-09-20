import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/hooks/useAuth';
import { FiUser, FiEye, FiEyeOff } from 'react-icons/fi';
import loginImg from '../assets/login-textiles.png';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/\d/, 'Password must contain at least one number')
    .regex(/[@$!%*?&]/, 'Password must contain at least one special character'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setSubmitting(true);
    setError('');
    try {
      const role = await login(data.username, data.password);
	  navigate(role === 'admin' ? '/admin' : '/');
    } catch {
      setError('Login failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fff4eb] px-4 sm:px-6 md:px-8 py-20">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Bal oldali kép */}
          <div className="relative hidden md:block">
            <img
              src={loginImg}
              alt="Welcome Back"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/25" />
            <div className="absolute bottom-6 left-6 right-6 text-white drop-shadow">
              <h3 className="text-2xl font-semibold mb-2">Welcome Back</h3>
              <p className="opacity-90">
                Discover carefully selected yoga essentials, home décor, Ayurveda items,
                clothing and many more.
              </p>
            </div>
          </div>

          {/* Jobb oldal – form */}
          <div className="p-6 sm:p-8 md:p-10">
            <h1 className="text-4xl font-extrabold text-[#230e5f] mb-10">Sign in</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Username */}
              <div>
                <label htmlFor="username" className="block font-medium mb-2">
                  Enter username
                </label>
                <div className="relative">
                  <input
                    id="username"
                    type="text"
                    {...register('username')}
                    className="w-full border border-gray-300 rounded-md px-3 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-[#fdc57b]"
                  />
                  <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                    <FiUser size={20} />
                  </span>
                </div>
                {errors.username && (
                  <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block font-medium mb-2">
                  Enter password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    {...register('password')}
                    className="w-full border border-gray-300 rounded-md px-3 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-[#fdc57b]"
                  />
                  <span
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-400 cursor-pointer"
                  >
                    {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                  </span>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                )}
              </div>

              {/* Remember + Forgot */}
              <div className="flex items-center justify-between text-sm">
                <label className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <span>Remember me</span>
                </label>
                <a href="#" className="text-[#1a56db] hover:underline">
                  Forgot Password?
                </a>
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                className={`w-full bg-[#953733] text-white font-medium py-3 rounded-md transition-colors duration-200 shadow focus:outline-none flex items-center justify-center cursor-pointer
                  ${submitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#953733]/90'}`}
              >
                {submitting ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                    Signing in...
                  </>
                ) : (
                  'Sign in'
                )}
              </button>
            </form>

            <p className="text-center text-sm mt-6">
              Don&apos;t have an account?{' '}
              <a href="#" className="text-[#1a56db] hover:underline">
                Register here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;