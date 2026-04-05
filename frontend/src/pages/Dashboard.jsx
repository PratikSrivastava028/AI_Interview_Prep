import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_PATHS } from "../utils/apiPaths";
import axiosInstance from "../utils/axiosInstance";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiBriefcase, FiClock, FiChevronRight, FiFolder } from "react-icons/fi";

const ROLES = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Data Scientist",
  "DevOps Engineer",
  "Product Manager",
  "UI/UX Designer",
  "Android Developer",
  "iOS Developer"
];

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

  useEffect(() => {
    fetchSessions();
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-200 pb-6 gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">Dashboard</h1>
          <p className="text-slate-500 mt-2 text-lg">Manage your personalized interview sessions.</p>
        </div>
      </div>

      {/* Creation Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200/60"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
            <FiPlus className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-800">New Interview Session</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
          
          <div className="md:col-span-4 space-y-2">
            <label className="text-sm font-semibold text-slate-600">Target Role</label>
            <div className="relative">
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-4 py-3.5 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-medium cursor-pointer"
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
              <label className="text-sm font-semibold text-slate-600">Experience Level</label>
              <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                {experience} {experience === 1 ? 'year' : 'years'}
              </span>
            </div>
            <div className="relative pt-2 pb-3 px-2 bg-slate-50 border border-slate-200 rounded-xl flex items-center h-[54px]">
              <input
                type="range"
                min="0"
                max="15"
                value={experience}
                onChange={(e) => setExperience(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-grab active:cursor-grabbing"
              />
            </div>
          </div>

          <div className="md:col-span-3">
            <button
              onClick={createSession}
              disabled={creating}
              className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-900/20 active:scale-[0.98] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {creating ? "Creating..." : "Start Session"}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Sessions Display */}
      <div className="pt-4">
        <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <FiFolder className="text-slate-400" /> Past Sessions
        </h3>

        {loading ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm animate-pulse h-[160px]">
                <div className="h-6 bg-slate-200 rounded-md w-2/3 mb-4"></div>
                <div className="h-4 bg-slate-100 rounded-md w-1/3 mb-8"></div>
                <div className="h-4 bg-slate-50 rounded-md w-1/4 mt-auto"></div>
              </div>
            ))}
          </div>
        ) : sessions.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white border border-dashed border-slate-200 rounded-3xl"
          >
            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 text-slate-400">
              <FiFolder size={28} />
            </div>
            <h3 className="text-lg font-bold text-slate-700 mb-1">No sessions yet</h3>
            <p className="text-slate-500 max-w-sm">Create your first interview session above to start practicing with AI.</p>
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
                  className="group bg-white p-6 rounded-3xl shadow-sm border border-slate-200 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-500/10 cursor-pointer transition-all duration-300 flex flex-col h-full"
                >
                  <div className="flex-1">
                    <h2 className="font-bold text-lg text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors line-clamp-2">
                      {s.role}
                    </h2>
                    <div className="flex items-center text-sm font-medium text-slate-500 gap-1.5">
                      <FiClock /> {s.experience}
                    </div>
                  </div>
                  
                  <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 group-hover:text-indigo-500 transition-colors">
                      Resume standard
                    </span>
                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-indigo-50 group-hover:translate-x-1 transition-all">
                      <FiChevronRight className="text-slate-400 group-hover:text-indigo-600" />
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
