import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";

import QAItem from "../components/QAItems";
import EmptyState from "../components/EmptyState";
import ErrorBanner from "../components/ErrorBanner";
import GenerateButton from "../components/GenerateButton";
import SkeletonCard from "../components/SkeletonCard";
import { API_PATHS } from "../utils/apiPaths";

import axios from "../utils/axiosInstance";

const parseError = (err) => {
  console.log(err);
  if (err.response)
    return (
      err.response.data?.message ||
      err.response.data?.error ||
      `Server error: ${err.response.status}`
    );
  if (err.request) return "Cannot reach server. Check your connection.";
  return err.message || "Something went wrong.";
};

const InterviewPrep = () => {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  const fetchQuestions = useCallback(async () => {
    setLoading(true);
    setFetchError(null);
    try {
      const res = await axios.get(`${API_PATHS.SESSION.GET_ONE}/${id}`);
      setQuestions(res.data.session.questions || []);
    } catch (err) {
      console.log(err.response);
      setFetchError(parseError(err));
    } finally {
      setLoading(false);
    }
  }, [id]);

  const generateQuestions = async () => {
    setGenerating(true);
    try {
      await axios.post(API_PATHS.AI.GENERATE_QUESTIONS, { sessionId: id });
      await fetchQuestions();
      toast.success("Questions generated!");
    } catch (err) {
      toast.error(parseError(err));
    } finally {
      setGenerating(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  return (
    <div className="w-full animate-in fade-in duration-500">
      <Toaster
        position="top-right"
        toastOptions={{ className: "!text-sm !font-medium" }}
      />

      <div className="max-w-4xl mx-auto space-y-8">
        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <p className="text-xs text-indigo-500 font-bold tracking-wide uppercase mb-1 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
              Session #{id?.slice(0, 8)}
            </p>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">
              Interview Questions
            </h1>
            {!loading && !fetchError && (
              <p className="text-sm font-medium text-slate-500 mt-2">
                {questions.length > 0
                  ? `${questions.length} questions prepared for you`
                  : "Start by generating technical questions"}
              </p>
            )}
          </div>

          <div className="shrink-0 mt-4 sm:mt-0">
            <GenerateButton
              onClick={generateQuestions}
              generating={generating}
              loading={loading}
              hasQuestions={questions.length > 0}
            />
          </div>
        </div>

        {/* ── Content ── */}
        <div className="pt-2">
          {loading ? (
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : fetchError ? (
            <ErrorBanner message={fetchError} onRetry={fetchQuestions} />
          ) : questions.length === 0 ? (
            <EmptyState onGenerate={generateQuestions} generating={generating} />
          ) : (
            <AnimatePresence>
              <div className="space-y-6">
                {questions.map((q, i) => (
                  <motion.div
                    key={q._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                  >
                    <QAItem 
                      item={q} 
                      index={i} 
                      total={questions.length} 
                    />
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
};

export default InterviewPrep;
