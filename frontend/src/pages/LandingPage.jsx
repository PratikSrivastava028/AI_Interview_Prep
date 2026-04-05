import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center text-center px-4 relative overflow-hidden font-sans selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* Abstract Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-indigo-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40rem] h-[40rem] bg-orange-500/10 rounded-full blur-3xl" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 max-w-4xl mx-auto flex flex-col items-center"
      >

        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-800 tracking-tight leading-tight mb-6">
          Ace Interviews with <br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-orange-500">
            Intelligent Practice
          </span>
        </h1>

        <p className="text-lg md:text-xl text-slate-500 max-w-2xl mb-10 leading-relaxed">
          Step into every interview with clarity, confidence, and a competitive edge. Experienced AI-guided practiced tailored to your role and experience designed to simulate real-world scenarios and help you to perform.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={() => navigate("/signup")}
            className="group flex items-center justify-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-2xl hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-900/20 transition-all duration-300 w-full sm:w-auto font-semibold text-lg"
          >
            Begin Your Journey
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button
            onClick={() => navigate("/login")}
            className="flex items-center justify-center gap-2 bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-2xl hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 w-full sm:w-auto font-semibold text-lg"
          >
            Login to Account
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default LandingPage;
