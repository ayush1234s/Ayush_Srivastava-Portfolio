import { FiLinkedin, FiGithub, FiMail } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { LINKS } from '../config/links';

const Navbar = () => {
  const letters = 'AYUSH'.split('');

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-64 h-16 glass-nav z-40 px-4 md:px-8 flex items-center justify-between transition-all duration-300">
      <div className="flex items-center gap-3">
        {/* Animated Brand Logo */}
        <div className="flex items-center gap-1 font-extrabold text-xl md:text-2xl tracking-wider select-none group">
          {letters.map((l, i) => (
            <motion.span
              key={i}
              whileHover={{ scale: 1.35, y: -2, rotate: (i % 2 === 0 ? 5 : -5) }}
              transition={{ type: 'spring', stiffness: 400 }}
              className="inline-block gradient-text cursor-pointer drop-shadow-[0_0_10px_rgba(168,85,247,0.4)]"
            >
              {l}
            </motion.span>
          ))}
          <span className="text-purple-400 font-mono text-xs md:text-sm ml-1 px-1.5 py-0.5 rounded-md bg-purple-500/10 border border-purple-500/30 animate-pulse drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]">
            .dev
          </span>
        </div>
      </div>

      {/* Social Icons with Micro-Interactions */}
      <nav className="flex items-center gap-2 md:gap-3" aria-label="Social links">
        {[
          { href: LINKS.linkedin, icon: FiLinkedin, label: 'LinkedIn', id: 'nav-linkedin', glow: 'hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] hover:border-purple-400/60' },
          { href: LINKS.github, icon: FiGithub, label: 'GitHub', id: 'nav-github', glow: 'hover:shadow-[0_0_20px_rgba(236,72,153,0.5)] hover:border-pink-400/60' },
          { href: LINKS.email, icon: FiMail, label: 'Email', id: 'nav-email', glow: 'hover:shadow-[0_0_20px_rgba(99,102,241,0.5)] hover:border-indigo-400/60' },
        ].map(({ href, icon: Icon, label, id, glow }) => (
          <motion.a
            key={id}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.12, y: -2 }}
            whileTap={{ scale: 0.9 }}
            className={`p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-200 ${glow}`}
            aria-label={label}
            id={id}
            title={`${label} Profile`}
          >
            <Icon size={18} />
          </motion.a>
        ))}
      </nav>
    </header>
  );
};

export default Navbar;
