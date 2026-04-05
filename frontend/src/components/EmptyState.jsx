import { ImSpinner8 } from "react-icons/im";
import { TbBulb } from "react-icons/tb";
import { FiPlay } from "react-icons/fi";
import { motion } from "framer-motion";

const EmptyState = ({ onGenerate, generating }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
    className="flex flex-col items-center justify-center py-24 px-4 text-center bg-white border border-dashed border-slate-200 rounded-3xl mt-4"
  >
    <div className="w-20 h-20 rounded-3xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mb-6 shadow-inner relative">
      <TbBulb className="w-10 h-10 text-indigo-400" />
      {generating && (
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-orange-500"></span>
        </span>
      )}
    </div>
    
    <div className="max-w-md">
      <h3 className="text-2xl font-bold text-slate-800 mb-2 tracking-tight">Ready to start?</h3>
      <p className="text-slate-500 text-base mb-8 leading-relaxed">
        We'll use AI to analyze your role and generating tailored, high-quality interview questions specifically for you.
      </p>
    </div>

    <button
      onClick={onGenerate}
      disabled={generating}
      className="group flex items-center gap-3 px-8 py-4 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed text-white text-base font-semibold hover:shadow-xl hover:shadow-slate-900/20 active:scale-[0.98] transition-all duration-300"
    >
      {generating ? (
        <>
          <ImSpinner8 className="animate-spin w-5 h-5 text-orange-400" /> 
          <span>Analyzing role...</span>
        </>
      ) : (
        <>
          <FiPlay className="w-5 h-5 group-hover:scale-110 transition-transform" /> 
          <span>Start Generation</span>
        </>
      )}
    </button>
  </motion.div>
);

export default EmptyState;
