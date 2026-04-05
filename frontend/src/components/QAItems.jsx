import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";

const QAItem = ({ item, index, total, onPin }) => {
  const [open, setOpen] = useState(false);
  const [displayedText, setDisplayedText] = useState("");

  // AI Typing effect for the answer
  useEffect(() => {
    if (open) {
      if (displayedText.length < item.answer.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(item.answer.slice(0, displayedText.length + 5));
        }, 10);
        return () => clearTimeout(timeout);
      }
    } else {
      // Small delay then clear to reset typing effect if closed
      setTimeout(() => setDisplayedText(""), 200);
    }
  }, [open, displayedText, item.answer]);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200/60 dark:border-slate-800 overflow-hidden hover:border-indigo-300 dark:hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-500/5 dark:hover:shadow-indigo-500/10 transition-all duration-300 relative group">
      
      {/* Question Header */}
      <div 
        className="px-6 py-5 cursor-pointer flex gap-4 items-start select-none"
        onClick={() => setOpen(!open)}
      >
        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 font-bold flex items-center justify-center shadow-inner mt-0.5 transition-colors">
          Q{index + 1}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 tracking-wider uppercase transition-colors">
              Question {index + 1} of {total}
            </span>
          </div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {item.question}
          </h3>
        </div>

        <div className={`mt-2 p-2 rounded-full transition-all duration-300 bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 ${open ? "rotate-180 bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400" : ""}`}>
          <FiChevronDown />
        </div>
      </div>

      {/* Answer Body with Animation */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="border-t border-slate-100"
          >
            <div className="px-6 pb-6 pt-4 text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-2 mb-4 text-sm font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 w-fit px-3 py-1 rounded-full transition-colors">
                <span className="flex h-2 w-2 rounded-full bg-indigo-500 dark:bg-indigo-400 animate-pulse"></span>
                AI Suggested Answer
              </div>
              <div className="prose prose-slate dark:prose-invert prose-sm sm:prose-base max-w-none transition-colors
                  prose-headings:text-slate-800 dark:prose-headings:text-slate-100 prose-headings:font-bold 
                  prose-a:text-indigo-600 dark:prose-a:text-indigo-400 prose-a:font-semibold hover:prose-a:text-indigo-500 dark:hover:prose-a:text-indigo-300
                  prose-code:text-indigo-600 dark:prose-code:text-indigo-400 prose-code:bg-indigo-50 dark:prose-code:bg-indigo-900/20 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none
                  prose-pre:bg-slate-900 dark:prose-pre:bg-black prose-pre:text-slate-50 prose-pre:rounded-xl">
                <ReactMarkdown>{displayedText}</ReactMarkdown>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QAItem;
