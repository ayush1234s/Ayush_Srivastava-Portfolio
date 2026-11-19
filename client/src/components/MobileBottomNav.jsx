import { NavLink, useLocation } from 'react-router-dom';
import { FiHome, FiUser, FiCode, FiMail, FiZap } from 'react-icons/fi';
import { motion } from 'framer-motion';

const navItems = [
  { to: '/', icon: FiHome, label: 'Home', color: 'from-purple-500 to-indigo-500' },
  { to: '/about', icon: FiUser, label: 'About', color: 'from-pink-500 to-rose-500' },
  { to: '/projects', icon: FiCode, label: 'Projects', badge: '7', color: 'from-cyan-400 to-blue-500' },
  { to: '/contact', icon: FiMail, label: 'Contact', color: 'from-emerald-400 to-teal-500' },
];

const MobileBottomNav = () => {
  const location = useLocation();

  return (
      <div
        className="fixed left-3 right-3 z-50 lg:hidden max-w-md mx-auto"
        style={{ bottom: 'calc(env(safe-area-inset-bottom, 0px) + 0.75rem)' }}
      >
      {/* Outer Neon Gradient Glow Aura */}
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/40 via-pink-600/40 to-cyan-500/40 rounded-3xl blur-lg opacity-85 animate-pulse-glow pointer-events-none" />

      {/* Floating Cyber Glass Dock Container */}
      <nav
        className="relative rounded-3xl bg-[#090d1c]/90 backdrop-blur-2xl border border-white/15 p-2 shadow-[0_15px_35px_rgba(0,0,0,0.8),0_0_25px_rgba(168,85,247,0.3)] overflow-hidden"
        aria-label="Mobile navigation bar"
      >
        {/* Hologram Breeze Sheen Line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-400/80 to-transparent animate-breeze-pass" />

        <div className="grid grid-cols-4 items-center justify-items-center relative z-10">
          {navItems.map(({ to, icon: Icon, label, badge, color }) => {
            const isActive = to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);

            return (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                id={`mobile-nav-${label.toLowerCase()}`}
                className="relative w-full flex flex-col items-center justify-center py-2 px-1 rounded-2xl select-none group focus:outline-none"
              >
                {/* Liquid Spring Active Pill Background */}
                {isActive && (
                  <motion.div
                    layoutId="mobileNavActivePill"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    className="absolute inset-0 bg-gradient-to-r from-purple-600/35 via-pink-600/35 to-indigo-600/35 rounded-2xl border border-purple-400/40 shadow-[0_0_20px_rgba(168,85,247,0.35)]"
                  />
                )}

                {/* Animated Top Glow Bar for Active Item */}
                {isActive && (
                  <motion.div
                    layoutId="mobileNavTopGlow"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    className={`absolute -top-1 w-7 h-1 bg-gradient-to-r ${color} rounded-full shadow-[0_0_12px_#a855f7]`}
                  />
                )}

                {/* Icon Container with Interactive Animations */}
                <motion.div
                  whileTap={{ scale: 0.85, rotate: -8 }}
                  whileHover={{ scale: 1.15 }}
                  className="relative z-10 flex items-center justify-center pt-0.5"
                >
                  <Icon
                    size={21}
                    className={`transition-all duration-300 transform ${
                      isActive
                        ? 'text-white scale-115 -translate-y-0.5 drop-shadow-[0_0_12px_rgba(236,72,153,0.9)]'
                        : 'text-slate-400 group-hover:text-purple-300'
                    }`}
                  />

                  {/* Badge with Pulse Effect */}
                  {badge && (
                    <span className="absolute -top-2 -right-3.5 flex h-4 min-w-[16px] items-center justify-center px-1 text-[9px] font-mono font-extrabold rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-[0_0_10px_rgba(236,72,153,0.8)]">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                      <span className="relative z-10">{badge}</span>
                    </span>
                  )}
                </motion.div>

                {/* Animated Label */}
                <span
                  className={`relative z-10 text-[10px] font-medium tracking-wider mt-1 transition-all duration-300 ${
                    isActive
                      ? 'gradient-text font-bold scale-105 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]'
                      : 'text-slate-400 group-hover:text-slate-200'
                  }`}
                >
                  {label}
                </span>

                {/* Active Indicator Glow Dot */}
                {isActive && (
                  <span className="absolute bottom-0.5 w-1 h-1 rounded-full bg-purple-400 shadow-[0_0_6px_#a855f7]" />
                )}
              </NavLink>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default MobileBottomNav;
