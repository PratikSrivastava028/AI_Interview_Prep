import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown, FiBookmark } from "react-icons/fi";

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
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200/60 overflow-hidden hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300 relative group">
      
      {/* Question Header */}
      <div 
        className="px-6 py-5 cursor-pointer flex gap-4 items-start select-none"
        onClick={() => setOpen(!open)}
      >
        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 font-bold flex items-center justify-center shadow-inner mt-0.5">
          Q{index + 1}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-slate-400 tracking-wider uppercase">
              Question {index + 1} of {total}
            </span>
            <button 
              onClick={(e) => { e.stopPropagation(); onPin?.(item._id); }}
              className={`p-2 rounded-lg transition-colors ${item.pinned ? 'text-orange-500 bg-orange-50' : 'text-slate-400 hover:bg-slate-100'}`}
              title="Bookmark Question"
            >
              <FiBookmark className={item.pinned ? "fill-current" : ""} />
            </button>
          </div>
          <h3 className="text-lg font-bold text-slate-800 leading-snug group-hover:text-indigo-600 transition-colors">
            {item.question}
          </h3>
        </div>

        <div className={`mt-2 p-2 rounded-full transition-transform duration-300 bg-slate-50 text-slate-400 ${open ? "rotate-180 bg-indigo-50 text-indigo-600" : ""}`}>
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
            <div className="px-6 pb-6 pt-4 text-slate-600">
              <div className="flex items-center gap-2 mb-4 text-sm font-semibold text-indigo-600 bg-indigo-50 w-fit px-3 py-1 rounded-full">
                <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
                AI Suggested Answer
              </div>
              <div className="prose prose-slate prose-sm sm:prose-base max-w-none 
                  prose-headings:text-slate-800 prose-headings:font-bold 
                  prose-a:text-indigo-600 prose-a:font-semibold hover:prose-a:text-indigo-500
                  prose-code:text-indigo-600 prose-code:bg-indigo-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none
                  prose-pre:bg-slate-900 prose-pre:text-slate-50 prose-pre:rounded-xl">
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
