import { Link, useNavigate } from "react-router-dom";
import { FiLogOut, FiUser } from "react-icons/fi";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/70 backdrop-blur-xl border-b border-slate-200">
      <div className="w-full px-6 md:px-10 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/dashboard" className="flex items-center gap-2 group">
          <span className="font-extrabold text-2xl tracking-tight text-slate-800">
            Hire<span className="text-indigo-600">Mind</span>
          </span>
        </Link>

        {/* Right Nav */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 bg-slate-100/80 px-3 py-1.5 rounded-full border border-slate-200">
            <FiUser className="text-slate-500" />
            <span className="text-sm font-medium text-slate-700">Participant</span>
          </div>
          
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm font-semibold text-slate-600 bg-white border border-slate-200 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 px-4 py-2 rounded-xl transition-all duration-200"
          >
            <FiLogOut />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
