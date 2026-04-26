import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_PATHS } from "../utils/apiPaths";
import axios from "../utils/axiosInstance";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiLock } from "react-icons/fi";

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async () => {
    setLoading(true);
    try {
      const res = await axios.post(API_PATHS.AUTH.SIGNUP, form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userName", res.data.name);
      navigate("/dashboard");
    } catch (error) {
      console.log(error.response);
      alert("Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden font-sans transition-colors duration-300">
      
      {/* Background Blurs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-3xl pointer-events-none transition-colors" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40rem] h-[40rem] bg-orange-500/10 dark:bg-orange-500/5 rounded-full blur-3xl pointer-events-none transition-colors" />

      <div className="relative z-10 w-full max-w-md bg-white dark:bg-slate-900 p-8 sm:p-10 rounded-3xl shadow-2xl shadow-indigo-500/5 dark:shadow-indigo-900/10 border border-slate-100 dark:border-slate-800 transition-colors">
        {/* Heading */}
        <h2 className="text-2xl font-bold text-center text-slate-800 dark:text-slate-100 mb-2">Create Account 🚀</h2>
        <p className="text-slate-500 dark:text-slate-400 text-center mb-8 text-sm">
          Start your AI-powered interview preparation
        </p>

        {/* Name */}
        <input
          type="text"
          placeholder="Enter your name"
          className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 rounded-xl p-3.5 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 dark:focus:border-indigo-600 transition-colors"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 rounded-xl p-3.5 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 dark:focus:border-indigo-600 transition-colors"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Create a password"
          className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 rounded-xl p-3.5 mb-5 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 dark:focus:border-indigo-600 transition-colors"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        {/* Button */}
        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-semibold py-3.5 rounded-xl hover:bg-slate-800 dark:hover:bg-white hover:shadow-lg hover:shadow-slate-900/20 transition-all cursor-pointer disabled:opacity-70"
        >
          {loading ? "Creating..." : "Sign Up"}
        </button>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-[1px] bg-slate-100 dark:bg-slate-800"></div>
          <p className="px-4 text-slate-400 dark:text-slate-500 text-sm font-medium">OR</p>
          <div className="flex-1 h-[1px] bg-slate-100 dark:bg-slate-800"></div>
        </div>

        {/* Login Link */}
        <p className="text-center text-sm font-medium text-slate-500 dark:text-slate-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 hover:underline transition-colors"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
