import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_PATHS } from "../utils/apiPaths";
import axiosInstance from "../utils/axiosInstance";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiBriefcase, FiClock, FiChevronRight, FiFolder, FiTrash2 } from "react-icons/fi";

const ROLES = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Data Scientist",
  "DevOps Engineer",
  "Product Manager",
  "UI/UX Designer",
  "Android Developer",
  "iOS Developer",
  "Accountant",
  "HR Executive",
  "Marketing Manager",
  "Sales Executive",
  "Project Manager",
  "Business Analyst",
  "Data Analyst",
  "Software Engineer",
  "Network Engineer",
  "Cloud Engineer",
  "DevOps Engineer",
  "QA Engineer",
  "Operations Manager",
  "Finance Manager",
  "HR Manager",
  "Marketing Manager",
  "Sales Manager",

]

const Dashboard = () => {
  const [sessions, setSessions] = useState([]);
  const [role, setRole] = useState(ROLES[0]);
  const [experience, setExperience] = useState(2);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const navigate = useNavigate();

  const fetchSessions = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
      setSessions(res.data.sessions);
    } catch (error) {
      console.log(error.response);
    } finally {
      setLoading(false);
    }
  };

  const createSession = async () => {
    if (!role) return;

    setCreating(true);
    try {
      await axiosInstance.post(API_PATHS.SESSION.CREATE, {
        role,
        experience: experience.toString() + " years",
        questions: [],
      });
      setRole(ROLES[0]);
      setExperience(2);
      await fetchSessions();
    } catch (error) {
      console.log(error.response);
    } finally {
      setCreating(false);
    }
  };

  const deleteSessionItem = async (e, id) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this session?")) return;
    
    try {
      await axiosInstance.delete(`${API_PATHS.SESSION.GET_ONE}/${id}`);
      setSessions(sessions.filter(s => s._id !== id));
    } catch (error) {
      console.log(error.response);
      alert("Failed to delete session");
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-200 dark:border-slate-800 pb-6 gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight transition-colors">Dashboard</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">Manage your personalized interview sessions.</p>
        </div>
      </div>

      {/* Creation Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200/60 dark:border-slate-800 transition-colors"
      >
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">New Interview Session</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
          
          <div className="md:col-span-4 space-y-2">
            <div className="flex justify-between items-center h-[28px]">
              <label className="text-sm font-semibold text-slate-600 dark:text-slate-400">Target Role</label>
            </div>
            <div className="relative">
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full appearance-none bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 rounded-xl px-4 py-3.5 pr-10 focus:outline-none focus:ring-2 focus:ring-slate-500/50 focus:border-slate-500 dark:focus:border-slate-600 transition-all font-medium cursor-pointer"
              >
                {ROLES.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <FiBriefcase className="text-slate-400" />
              </div>
            </div>
          </div>

          <div className="md:col-span-5 space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-slate-600 dark:text-slate-400">Experience Level</label>
              <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 px-2 py-0.5 rounded-md">
                {experience} {experience === 1 ? 'year' : 'years'}
              </span>
            </div>
            <div className="relative pt-2 pb-3 px-2 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center h-[54px]">
              <input
                type="range"
                min="0"
                max="15"
                value={experience}
                onChange={(e) => setExperience(Number(e.target.value))}
                className="w-full accent-indigo-600 dark:accent-indigo-500 cursor-grab active:cursor-grabbing"
              />
            </div>
          </div>

          <div className="md:col-span-3">
            <button
              onClick={createSession}
              disabled={creating}
              className="w-full flex items-center justify-center gap-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-semibold px-6 py-3.5 rounded-xl hover:bg-slate-800 dark:hover:bg-white hover:shadow-lg hover:shadow-slate-900/20 active:scale-[0.98] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {creating ? "Creating..." : "Start Session"}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Sessions Display */}
      <div className="pt-4">
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2 transition-colors">
          <FiFolder className="text-slate-400 dark:text-slate-500" /> Your Sessions
        </h3>

        {loading ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm animate-pulse h-[160px]">
                <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-md w-2/3 mb-4"></div>
                <div className="h-4 bg-slate-100 dark:bg-slate-800/50 rounded-md w-1/3 mb-8"></div>
                <div className="h-4 bg-slate-50 dark:bg-slate-800/30 rounded-md w-1/4 mt-auto"></div>
              </div>
            ))}
          </div>
        ) : sessions.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white dark:bg-slate-900 border border-dashed border-slate-200 dark:border-slate-800 rounded-3xl transition-colors"
          >
            <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-4 text-slate-400 dark:text-slate-500">
              <FiFolder size={28} />
            </div>
            <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200 mb-1">No sessions yet</h3>
            <p className="text-slate-500 dark:text-slate-400 max-w-sm">Create your first interview session above to start practicing with AI.</p>
          </motion.div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            <AnimatePresence>
              {sessions.map((s, idx) => (
                <motion.div
                  key={s._id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => navigate(`/interview/${s._id}`)}
                  className="group bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-500 hover:shadow-xl hover:shadow-indigo-500/10 dark:hover:shadow-indigo-500/5 cursor-pointer transition-all duration-300 flex flex-col h-full"
                >
                  <div className="flex-1 relative">
                    <button 
                      onClick={(e) => deleteSessionItem(e, s._id)}
                      className="absolute top-0 right-0 p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-colors z-10"
                      title="Delete Session"
                    >
                      <FiTrash2 />
                    </button>
                    <h2 className="font-bold text-lg text-slate-800 dark:text-slate-100 mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2 pr-8">
                      {s.role}
                    </h2>
                    <div className="flex items-center text-sm font-medium text-slate-500 dark:text-slate-400 gap-1.5 transition-colors">
                      <FiClock /> {s.experience}
                    </div>
                  </div>
                  
                  <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors">
                      Resume standard
                    </span>
                    <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/30 group-hover:translate-x-1 transition-all">
                      <FiChevronRight className="text-slate-400 dark:text-slate-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
