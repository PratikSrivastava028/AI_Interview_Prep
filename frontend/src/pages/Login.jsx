import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { API_PATHS } from "../utils/apiPaths";
import axios from "../utils/axiosInstance";
import { motion } from "framer-motion";
import { FiMail, FiLock } from "react-icons/fi";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleForm = (e) => {
    let { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await axios.post(API_PATHS.AUTH.LOGIN, form);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (error) {
      alert("Invalid email and password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden font-sans">
      
      {/* Background Blurs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40rem] h-[40rem] bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md bg-white p-8 sm:p-10 rounded-3xl shadow-2xl shadow-indigo-500/5 border border-slate-100">
        {/* Heading */}
        <h2 className="text-2xl font-bold text-center text-slate-800 mb-2">Welcome Back 👋</h2>
        <p className="text-slate-500 text-center mb-8 text-sm">
          Login to continue your interview preparation
        </p>

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          className="w-full bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 rounded-xl p-3.5 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-colors"
          onChange={handleForm}
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          className="w-full bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 rounded-xl p-3.5 mb-5 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-colors"
          onChange={handleForm}
        />

        {/* Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-indigo-600 text-white font-semibold py-3.5 rounded-xl hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-600/20 active:scale-[0.98] disabled:opacity-70 transition-all"
        >
          {loading ? "Signing in..." : "Login"}
        </button>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-[1px] bg-slate-100"></div>
          <p className="px-4 text-slate-400 text-sm font-medium">OR</p>
          <div className="flex-1 h-[1px] bg-slate-100"></div>
        </div>

        {/* Signup Link */}
        <p className="text-center text-sm font-medium text-slate-500">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-indigo-600 hover:text-indigo-700 hover:underline transition-colors"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
