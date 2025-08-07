import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { FiUser, FiEye, FiEyeOff } from 'react-icons/fi';
import loginImg from '../assets/login-textiles.png';

const Login = () => {
	const { login } = useAuth();
	const navigate = useNavigate();
	const [formData, setFormData] = useState({ username: '', password: '' });
	const [error, setError] = useState('');
	const [showPassword, setShowPassword] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError('');
		try {
			await login(formData.username, formData.password);
			navigate('/');
		} catch (err: unknown) {
			setError(err instanceof Error ? err.message : 'Login failed');
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
								Discover carefully selected yoga essentials, home décor,
								Ayurveda items, clothing and many more.
							</p>
						</div>
					</div>

					{/* Jobb oldal – form */}
					<div className="p-6 sm:p-8 md:p-10">
						<h1 className="text-4xl font-extrabold text-[#230e5f] mb-10">
							Sign in
						</h1>

						<form onSubmit={handleSubmit} className="space-y-6">
							{/* Username */}
							<div>
								<label htmlFor="username" className="block font-medium mb-2">
									Enter username
								</label>
								<div className="relative">
									<input
										id="username"
										type="text"
										name="username"
										value={formData.username}
										onChange={handleChange}
										className="w-full border border-gray-300 rounded-md px-3 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-[#fdc57b]"
									/>
									<span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
										<FiUser size={20} />
									</span>
								</div>
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
										name="password"
										value={formData.password}
										onChange={handleChange}
										className="w-full border border-gray-300 rounded-md px-3 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-[#fdc57b]"
									/>
									<span
										onClick={() => setShowPassword((v) => !v)}
										className="absolute inset-y-0 right-3 flex items-center text-gray-400 cursor-pointer"
									>
										{showPassword ? (
											<FiEyeOff size={20} />
										) : (
											<FiEye size={20} />
										)}
									</span>
								</div>
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
								className="w-full bg-[#953733] text-white font-medium py-3 rounded-md transition-colors duration-200 hover:bg-[#953733]/90 shadow focus:outline-none"
							>
								Sign in
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
