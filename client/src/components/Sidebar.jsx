import { NavLink } from 'react-router-dom';
import { FiHome, FiUser, FiCode, FiMail } from 'react-icons/fi';

const navItems = [
  { to: '/', icon: <FiHome size={20} />, label: 'Home', badge: null },
  { to: '/about', icon: <FiUser size={20} />, label: 'About', badge: null },
  { to: '/projects', icon: <FiCode size={20} />, label: 'Projects', badge: '7' },
  { to: '/contact', icon: <FiMail size={20} />, label: 'Contact', badge: null },
];

const Sidebar = () => {
  return (
    <aside
      className="fixed top-0 left-0 h-screen w-64 glass-sidebar z-50 hidden lg:flex flex-col justify-between p-6 transition-all duration-300"
      aria-label="Sidebar navigation"
    >
        <div>
          {/* User Profile Header */}
          <div className="flex items-center gap-3.5 pb-6 mb-6 border-b border-white/10">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
              <img
                src="/ayush.jpg"
                alt="Ayush Srivastava"
                className="relative w-12 h-12 rounded-full object-cover border-2 border-slate-900"
              />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white tracking-wide">Ayush Srivastava</h3>
              <p className="text-xs font-mono text-purple-400 mt-0.5">ECE & Developer</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5" aria-label="Main navigation">
            <div className="text-[10px] font-mono font-bold tracking-widest text-slate-500 uppercase px-3 mb-2">
              // Navigation
            </div>
            {navItems.map(({ to, icon, label, badge }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                id={`nav-${label.toLowerCase()}`}
                className={({ isActive }) =>
                  `flex items-center gap-3.5 px-3.5 py-3 rounded-xl font-medium text-sm transition-all duration-200 group relative ${
                    isActive
                      ? 'bg-purple-600/20 text-white border border-purple-500/40 shadow-[0_0_20px_rgba(168,85,247,0.2)]'
                      : 'text-slate-400 hover:text-white hover:bg-white/5 hover:border hover:border-white/10'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className={`transition-transform duration-200 group-hover:scale-110 ${isActive ? 'text-purple-400' : 'text-slate-400 group-hover:text-purple-400'}`}>
                      {icon}
                    </span>
                    <span className="flex-1">{label}</span>
                    {badge && (
                      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                        {badge}
                      </span>
                    )}
                    {isActive && (
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-l-full shadow-[0_0_8px_#a855f7]" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Footer Status */}
        <div className="pt-4 border-t border-white/10">
          <div className="flex items-center gap-2.5 text-xs font-mono text-slate-400 bg-white/5 border border-white/5 rounded-xl p-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span>Available for projects</span>
          </div>
        </div>
      </aside>
    );
  };

export default Sidebar;
