import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  FiHome, FiUser, FiCode, FiMail, FiBarChart2, FiLogOut, FiShield
} from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import DayNightSky from './DayNightSky';

const navItems = [
  { to: '/dashboard', icon: <FiHome size={18} />, label: 'Dashboard' },
  { to: '/about-editor', icon: <FiUser size={18} />, label: 'About & Bio' },
  { to: '/skills-editor', icon: <FiBarChart2 size={18} />, label: 'Skills' },
  { to: '/projects-manager', icon: <FiCode size={18} />, label: 'Projects' },
  { to: '/messages', icon: <FiMail size={18} />, label: 'Messages' },
];

const AdminLayout = ({ children, pageTitle, pageSubtitle }) => {
  const { logout, user } = useAuth();
  const [skyMode, setSkyMode] = useState('night');

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex relative overflow-hidden">
      {/* Background Glowing Blobs */}
      <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-pink-900/20 rounded-full blur-[140px] pointer-events-none" />

      {/* Sidebar */}
      <aside className="w-64 glass-sidebar fixed top-0 left-0 h-screen z-40 flex flex-col justify-between p-6 hidden md:flex">
        <div>
          {/* Brand */}
          <div className="flex items-center gap-3 pb-6 mb-6 border-b border-white/10">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-600 flex items-center justify-center text-white shadow-[0_0_15px_rgba(168,85,247,0.4)] animate-pulse">
              <FiShield size={20} />
            </div>
            <div>
              <h2 className="font-bold text-sm text-white">Admin Control</h2>
              <p className="text-[11px] font-mono text-purple-400">ayush.portfolio</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-1.5" aria-label="Admin Navigation">
            {navItems.map(({ to, icon, label }) => (
              <NavLink
                key={to}
                to={to}
                id={`admin-nav-${label.toLowerCase().replace(/\s/g, '-')}`}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-3 rounded-xl font-medium text-xs transition-all duration-200 ${
                    isActive
                      ? 'bg-purple-600/20 text-white border border-purple-500/40 shadow-[0_0_15px_rgba(168,85,247,0.2)]'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                {icon}
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Logout */}
        <div className="pt-4 border-t border-white/10 space-y-3">
          <div className="text-[11px] font-mono text-slate-500 truncate px-1">
            {user?.email}
          </div>
          <button
            onClick={logout}
            id="admin-logout-btn"
            className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 font-semibold text-xs hover:bg-red-500/20 transition-all duration-200 cursor-pointer"
          >
            <FiLogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="md:ml-64 flex-1 flex flex-col min-h-screen relative z-10 w-full">
        {/* Header */}
        <header className="glass-header sticky top-0 z-30 px-6 md:px-8 py-3">
          <div className="max-w-5xl mx-auto flex flex-col gap-2">
            {/* Automatic Celestial Day / Sunset / Night Sky Header */}
            <DayNightSky onModeChange={setSkyMode} />

            <div className="flex items-center justify-between pt-2">
              <div>
                <h1 className="text-base md:text-lg font-bold text-white">{pageTitle}</h1>
                {pageSubtitle && <p className="text-xs font-mono text-purple-400">{pageSubtitle}</p>}
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
                <span className="hidden sm:inline">Admin Active</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Container */}
        <div className="p-4 md:p-8 max-w-5xl w-full mx-auto flex-1">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
