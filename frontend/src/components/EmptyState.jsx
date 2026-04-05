import { ImSpinner8 } from "react-icons/im";
import { TbBulb } from "react-icons/tb";
import { FiPlay } from "react-icons/fi";
import { motion } from "framer-motion";

const EmptyState = ({ onGenerate, generating }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
    className="flex flex-col items-center justify-center py-20 px-6 text-center bg-white dark:bg-slate-900/50 border border-dashed border-slate-200 dark:border-slate-800 rounded-3xl mt-4 backdrop-blur-sm transition-colors duration-300"
  >
    <div className="w-20 h-20 rounded-3xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/30 flex items-center justify-center mb-8 shadow-inner relative transition-colors">
      <TbBulb className="w-10 h-10 text-indigo-400 dark:text-indigo-300" />
      {generating && (
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-orange-500"></span>
        </span>
      )}
    </div>
    
    <div className="max-w-md">
      <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-3 tracking-tight transition-colors">Ready to start?</h3>
      <p className="text-slate-500 dark:text-slate-400 text-base mb-10 leading-relaxed transition-colors">
        We'll use AI to analyze your role and generating tailored, high-quality interview questions specifically for you.
      </p>
    </div>

    <button
      onClick={onGenerate}
      disabled={generating}
      className="group flex items-center gap-3 px-10 py-4 rounded-xl bg-slate-950 dark:bg-white text-white dark:text-slate-950 border border-slate-800 dark:border-white hover:bg-slate-800 dark:hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed text-base font-bold hover:shadow-2xl hover:shadow-indigo-500/10 active:scale-[0.98] transition-all duration-300 cursor-pointer"
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
