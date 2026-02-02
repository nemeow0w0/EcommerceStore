import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useEcomStore from "../../store/ecom-store";
import { motion } from "motion/react";

const Login = () => {
  const navigate = useNavigate();
  const actionLogin = useEcomStore((state) => state.actionLogin);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await actionLogin(form);
      const role = res.data.payload.role;
      role === "admin" ? navigate("/admin") : navigate('/');
      toast.success("Welcome Back 👋");
    } catch (err) {
      const message = err.response?.data?.message || "Login failed";
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-cyan-50 to-white px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.8, 0.25, 1] }}
        className="bg-white/90 backdrop-blur-md rounded-2xl shadow-md hover:shadow-2xl 
                   border border-blue-100 p-8 w-full max-w-md transition-all duration-500"
      >
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-6">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              onChange={handleChange}
              className="w-full px-4 py-2 border border-cyan-100 rounded-md 
                         bg-blue-50/50 focus:outline-none focus:ring-2 focus:ring-cyan-300
                         transition-all duration-300"
              placeholder="you@example.com"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm text-gray-600 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              required
              onChange={handleChange}
              className="w-full px-4 py-2 border border-cyan-100 rounded-md 
                         bg-blue-50/50 focus:outline-none focus:ring-2 focus:ring-cyan-300
                         transition-all duration-300"
              placeholder="••••••••"
            />
          </div>

          {/* Submit Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{
              background:
                "linear-gradient(135deg, #A5F3FC, #7DD3FC, #BAE6FD)",
              boxShadow: "0 4px 12px rgba(100, 200, 255, 0.3)",
              scale: 1.03,
            }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-300 to-blue-200 text-gray-700
                       font-semibold py-2.5 rounded-xl shadow-sm transition-all duration-300"
          >
            Login
          </motion.button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-cyan-600 hover:text-blue-500 hover:underline transition-colors duration-300"
          >
            Sign up
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
